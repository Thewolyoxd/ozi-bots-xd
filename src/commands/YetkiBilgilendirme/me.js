const moment = require("moment");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const cezapuan = require("../../schemas/cezapuan");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const yetkis = require("../../schemas/yetkis");
const ceza = require("../../schemas/ceza");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const gorev = require("../../schemas/invite");
const kayitg = require("../../schemas/kayitgorev");
const mesaj = require("../../schemas/mesajgorev");
const tagli = require("../../schemas/taggorev");
const {  xp, gulucuk, mesaj2, altin, altin2 ,rewards ,star , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim"
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      const gorevData = await gorev.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total2 = gorevData ? gorevData.invite : 0;
    const maxValue1 = "10"
    const coinStatus1 = client.ranks.length > 0 ?
`**??nvite G??rev Durumu :** 
<a:staff:899680505119780895> ${progressBar1(gorevData ? gorevData.invite : 0, 10, 10)} \`${total2} (${total2}/10)\` 
` : "";
          //
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: member.user.id });
    const kayittotal = kayitgData ? kayitgData.kayit : 0;
    const maxValue2 = "10"
    const coinStatus2 = client.ranks.length > 0 ?
`**Kay??t G??rev Durumu :**  
<a:Muhabbet:899339317896429641> ${progressBar1(kayitgData ? kayitgData.kayit : 0, 10, 10)} \`${kayittotal} (${kayittotal}/10)\`
` : "";
          //
    const mesajData = await mesaj.findOne({ guildID: message.guild.id, userID: member.user.id });
    const mesajtotal = mesajData ? mesajData.mesaj : 0;
    const maxValue3 = "10"
    const coinStatus3 = client.ranks.length > 0 ?
`**Mesaj G??rev Durumu :**  
${mesaj2} ${progressBar1(mesajData ? mesajData.mesaj : 0, 500, 5)} \`${mesajtotal} (${mesajtotal}/500)\`
` : "";
          //
    const tagData = await tagli.findOne({ guildID: message.guild.id, userID: member.user.id });
    const tagTotal = tagData ? tagData.tagli : 0;
    const maxValue4 = "5"
    const coinStatus4 = client.ranks.length > 0 ?
`**Tagl?? ??ye Durumu :**  
<a:galp:899680513806184570> ${progressBar1(tagData ? tagData.tagli : 0, 5, 5)} \`${tagTotal} (${tagTotal}/5)\`
` : "";

function progressBar1(value, maxValue, size) {
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  if (progress === maxValue) return "Tamamland??!";

  const progressText = fill.repeat(progress);
  const emptyProgressText = empty.repeat(emptyProgress);
  
  return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
  
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `??u an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rol??ndesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rol??ne ula??mak i??in \`${maxValue.coin-coinData.coin}\` puan daha kazanman??z gerekiyor!` : "??u an son yetkidesiniz! Emekleriniz i??in te??ekk??r ederiz. :)"}` : ` 
      ??uan ${message.member.roles.highest} rol??ndesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rol??ne ula??mak i??in \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanman??z gerekiyor!`}` : ""
      
    var PuanDetaylari = new MessageButton()
    .setLabel("Puan Detaylar??")
    .setID("puan_detaylari")
    .setStyle("green")
    .setEmoji("899680530239455282")

    var GenelPuanDetaylari = new MessageButton()
    .setLabel("Genel Puan Detaylar??")
    .setID("genel_puan_detaylari")
    .setStyle("blurple")
    .setEmoji("899680497427431424")

    var tassk = new MessageButton()
    .setLabel("G??rev")
    .setID("tassk_button")
    .setStyle("gray")
    .setEmoji("899680505119780895")

    var Iptal = new MessageButton()
    .setLabel("??ptal")
    .setID("iptal_button")
    .setStyle("red")
    .setEmoji("899337291582046228")

    const row = new MessageActionRow()
    .addComponents(PuanDetaylari, GenelPuanDetaylari, tassk, Iptal)

embed.setDescription(`
${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri a??a????da belirtilmi??tir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kay??t**__",  value: `
\`\`\`fix
${toplamData ? `${toplamData.toplams.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Tagl??**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} ki??i` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  embed.addField("<a:yildizkirmizi:899680497427431424> **Sesli Sohbet ??statisti??i**", `
  <:miniicon:899339236724068372> Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  <:miniicon:899339236724068372> Public Odalar: \`${await category(conf.publicParents)}\`
  <:miniicon:899339236724068372> Secret Odalar: \`${await category(conf.privateParents)}\`
  <:miniicon:899339236724068372> Alone Odalar: \`${await category(conf.aloneParents)}\`
  <:miniicon:899339236724068372> Y??netim Yetkili Odalar??: \`${await category(conf.funParents)}\`
  <:miniicon:899339236724068372> Kay??t Odalar??: \`${await category(conf.registerParents)}\`
   `, false);
  
  
  embed.addField("<a:yildizkirmizi:899680497427431424> **Mesaj ??statisti??i**", `
  <:miniicon:899339236724068372> Toplam: \`${messageData ? messageData.topStat : 0}\`
  <:miniicon:899339236724068372> Haftal??k Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  <:miniicon:899339236724068372> G??nl??k Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

   

    let msg = await message.channel.send(embed, { components: [row] });
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      if(button.id === "puan_detaylari") {
        await button.reply.defer()
      const puan = new MessageEmbed()
      .setDescription(`
      ${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu a??a????da belirtilmi??tir.
      `) 
      
      .addField("<a:yildizkirmizi:899680497427431424> **Puan Durumu:**", `
      Puan??n??z: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
      ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
       `, false)
      
      .addField("<a:yildizkirmizi:899680497427431424> **Puan Detaylar??:**", `
      <:miniicon:899339236724068372> Kay??tlar: \`${toplamData ? toplamData.toplams.length : 0} (Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0})\`
      <:miniicon:899339236724068372> Tagl??lar: \`${taggedData ? taggedData.taggeds.length : 0} (Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0})\`
      <:miniicon:899339236724068372> Davetler: \`${total} (Puan Etkisi: +${total*15})\`
      <:miniicon:899339236724068372> Yetkililer: \`${yetkiData ? yetkiData.yetkis.length : 0} ki??i (Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0})\`
      <:miniicon:899339236724068372> Chat Puan: \`${messageData ? messageData.topStat : 0} mesaj (Puan Etkisi: +${messageData ? messageData.topStat*2 : 0})\`
      <:miniicon:899339236724068372> Sesli Puan: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("m")} dakika (Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("m")*4})\`
       `, false)
      
      .addField("**<a:yildizkirmizi:899680497427431424> Yetki Durumu:** ", `
      ${coinStatus}
       `, false);  

msg.edit({
  embed : puan,
  components : row
})
      
      }

  if(button.id === "genel_puan_detaylari") {
    await button.reply.defer()
    const ceza = new MessageEmbed()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu a??a????da belirtilmi??tir.
`) 
.addField("<a:yildizkirmizi:899680497427431424> **Puan Detaylar??:**", `
<:miniicon:899339236724068372> Kay??t: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
<:miniicon:899339236724068372> Tagl??: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
<:miniicon:899339236724068372> Davet: (\`Puan Etkisi: +${total*15}\`)
<:miniicon:899339236724068372> Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
<:miniicon:899339236724068372> Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("m")*4}\`)
<:miniicon:899339236724068372> Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
<:miniicon:899339236724068372> Toplam Ald??????n Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
 `, false)

.addField("<a:yildizkirmizi:899680497427431424> **Net Puanlama Bilgisi**", `
<:miniicon:899339236724068372> Kay??t i??lemi yaparak, \`+5.5\` puan kazan??rs??n.
<:miniicon:899339236724068372> Tagl?? ??ye belirleyerek, \`+25\` puan kazan??rs??n??z.
<:miniicon:899339236724068372> ??nsanlar?? davet ederek, \`+15\` puan kazan??rs??n.
<:miniicon:899339236724068372> ??nsanlar?? yetkili yaparak, \`+30\` puan kazan??rs??n.
<:miniicon:899339236724068372> Seste kalarak, ortalama olarak \`+4\` puan kazan??rs??n??z.
<:miniicon:899339236724068372> Yaz?? yazarak, ortalama olarak, \`+2\` puan kazan??rs??n??z.
 `, false)

.addField("<a:yildizkirmizi:899680497427431424> **Puan Durumu:**", `
Puan??n??z: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
 `, false)

.addField("<a:yildizkirmizi:899680497427431424> **Yetki Durumu:** ", `
${coinStatus}
 `, false)

msg.edit({
  embed: ceza,
  components : row
})  
    }

    if(button.id === "tassk_button") {
      await button.reply.defer()
      const task = new MessageEmbed()
      .setDescription(`
      ${member.toString()}, (${member.roles.highest}) rol??ne ait g??revlerin a??a????da belirtilmi??tir. G??revler tamamland??????nda tamamlad??????n g??revlerin ??d??llerini almak i??in \`.g??revlerim ??d??l\` komutu ile alabilirsiniz.  
      Kalan S??re: \`${moment.duration(moment().endOf('day').valueOf() - Date.now()).format("H [saat], m [dakika] s [saniye]")}\`
      5 g??revi tamamlamak sana toplam \`120 Coin\` verecektir!
                
      ${coinStatus1} **??d??l??n :** ${rewards} \`30\` Coin\n
      ${coinStatus2} **??d??l??n :** ${rewards} \`30\` Coin\n
      ${coinStatus3} **??d??l??n :** ${rewards} \`30\` Coin\n
      ${coinStatus4} **??d??l??n :** ${rewards} \`30\` Coin\n
      `)

      .addField("**<a:yildizkirmizi:899680497427431424> Yetki Durumu:** ", `
      ${coinStatus}
       `, false); 

  msg.edit({
    embed: task,
    components : row
  })
      
      }

      if(button.id === "iptal_button") {
        await button.reply.defer()
        const iptal = new MessageEmbed()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) ??yesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri a??a????da belirtilmi??tir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kay??t**__",  value: `
\`\`\`fix
 ${toplamData ? `${toplamData.toplams.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Tagl??**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} ki??i`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} ki??i` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  iptal.addField("<a:yildizkirmizi:899680497427431424> **Sesli Sohbet ??statisti??i**", `
  <:miniicon:899339236724068372> Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  <:miniicon:899339236724068372> Public Odalar: \`${await category(conf.publicParents)}\`
  <:miniicon:899339236724068372> Secret Odalar: \`${await category(conf.privateParents)}\`
  <:miniicon:899339236724068372> Alone Odalar: \`${await category(conf.aloneParents)}\`
  <:miniicon:899339236724068372> Y??netim Yetkili Odalar??: \`${await category(conf.funParents)}\`
  <:miniicon:899339236724068372> Kay??t Odalar??: \`${await category(conf.registerParents)}\`
   `, false);
  
  
   iptal.addField("<a:yildizkirmizi:899680497427431424> **Mesaj ??statisti??i**", `
  <:miniicon:899339236724068372> Toplam: \`${messageData ? messageData.topStat : 0}\`
  <:miniicon:899339236724068372> Haftal??k Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  <:miniicon:899339236724068372> G??nl??k Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

    msg.edit({
      embed: iptal,
      components : row
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
