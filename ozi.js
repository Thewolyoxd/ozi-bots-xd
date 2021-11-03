const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//
client.ranks = [
  { role: "899273632650510351", coin: 2000 },
  { role: "899273632650510352", coin: 3000 },
  { role: "899273632650510353", coin: 4000 },
  { role: "899273632650510354", coin: 5000 },
  { role: "899273632650510355", coin: 6000 },
  { role: "899273632663105586", coin: 7000 },
  { role: "899273632663105587", coin: 8000 },
  { role: "899273632663105589", coin: 9000 },
  { role: "899273632663105590", coin: 15000 },
  { role: "899273632663105591", coin: 11000 },
  { role: "899273632663105592", coin: 17000 },
  { role: "899273632663105593", coin: 20000 },
  { role: "899273632679866395", coin: 22000 },
  { role: "899273632679866396", coin: 25000 },
  { role: "899273632696631358", coin: 28000 },
  { role: "899273632696631359", coin: 40000 },
  ]
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Ozi] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[Ozi KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(process.env.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

setInterval(() => {
  let GuildID = "899273632436592701"
  let OneMonth = "901908110619340820"
  let ThreeMonth = "901907879999701012"
  let SixMonth = "901907876631699507"
  let NineMonth = "901907873662119986"
  let OneYear = "901907864040382504"
  const server = client.guilds.cache.get(GuildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
  await member.roles.add(NineMonth)}

  if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
    await member.roles.add(OneYear)}

        })
  }, 1000 * 60 * 60 * 24 * 7)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
       let InviteGuardReg = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
         if (InviteGuardReg.test(msg.content)) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                   msg.delete();
                   msg.delete();
                     return msg.reply('Reklam yapman yasak!').then(ozixd => ozixd.delete({ timeout: 3000 }));
    
             }              
           } catch(err) {
             console.log(err);
           }
         }
     });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(conf.chatMute)) return;
      if (map.has(message.author.id)) {
        const userData = map.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, TIME);
            map.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === lımıt) {
          let messages = await message.channel.messages.fetch({ limit: 100 });
          let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 7);
          message.channel.bulkDelete(filtered);
                message.member.roles.add(conf.chatMute);
                message.channel.send('<:tik:899339342986739802> Sohbet kanallarını kirletme sebebiyle \`3 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. <@'+message.author.id+'>').then(ozixd => ozixd.delete({ timeout: 5000 }))

                setTimeout(() => {
                    message.member.roles.remove(conf.chatMute);
                    message.channel.send('<:tik:899339351283105812> Sohbet kanallarını kirletme sebebiyle 3 dakika süresince susturmanız bitti. Lütfen tekrarlamayınız. <@'+message.author.id+'>').then(ozixd => ozixd.delete({ timeout: 5000 }))
                }, 180000);//9000000
            } else {
                userData.msgCount = msgCount;
                map.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            map.delete(message.author.id)
        }, TIME);
        map.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});
  
const mentionRegex = /<@!?&?\d+>/g;
   
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission('ADMINISTRATOR')) return;

 if (mentionRegex.test(message.content) && message.content.match(mentionRegex).length >= 4) {
        message.member.roles.add(conf.chatMute);
        message.channel.send('<:tik:899339342986739802> Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. <@'+message.author.id+'>');
        setTimeout(() => {
            message.member.roles.remove(conf.chatMute);
       message.channel.send('<:tik:899339351283105812> Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. <@'+message.author.id+'>')
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
