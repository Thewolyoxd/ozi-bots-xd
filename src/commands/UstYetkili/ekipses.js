const Discord = require("discord.js")
module.exports = {
    conf: {
      aliases: ["ekip"],
      name: "ekip",
      help: "ekip"
    },
  
    run: async (client, message, args, embed) => {

        if (!message.member.hasPermission("MANAGE_ROLES")) return;
        let ShewTeam = message.guild.roles.cache.get("901557772905242707")
        let THETeam = message.guild.roles.cache.get("899273632558231587")

        let teamRoles = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === args.join(' ')) || message.guild.roles.cache.get(args[0]);
        if (args[0]) { //
            let mentionRole = message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id)).size
            const Embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true, size: 2048}))
            .setThumbnail(message.guild.iconURL({dynamic: true, size: 2048}))
            .setDescription(`<a:yildizkirmizi:899680497427431424> ${teamRoles} adlı rol için detaylı bilgilendirme:\n\n<:miniicon:899339236724068372> Toplam bu role sahip üye: **${mentionRole}**\n<:miniicon:899339236724068372> Sunucuda ki aktif üye: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.presence.status !== "offline").size}**\n<:miniicon:899339236724068372> Sesteki üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size}**\n<:miniicon:899339236724068372> Sunucu sembolüne sahip kullanıcı sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.username.includes('✬')).size}**\n<:miniicon:899339236724068372> Seste olmayan aktif kullanıcı sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && !x.voice.channel && x.user.presence.status !== "offline").size}**\n<:miniicon:899339236724068372> Erkek üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.roles.cache.has("899273632541470750")).size}**\n<:miniicon:899339236724068372> Kadın üye sayısı: **${message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.roles.cache.has("899273632541470751")).size}**\n───────────────\n<a:kirmiziok:901441275381817426> Ekip üyelerinin seste bulunma oranı: **%${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(teamRoles.id)).size * 100)}**`)
            .setColor(message.member.displayHexColor)
            message.channel.send(Embed).then(m => message.react(this.client.ok))
        } else if (!args[0]) {
            const TeamEmbed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true, size: 2048}))
            .setColor(message.member.displayHexColor)
            .addField(`**Shew#1404** Adlı ekibin bilgilendirmesi`, `<:miniicon:899339236724068372> Toplam kullanıcı miktarı: **${ShewTeam.members.size}**\n<:miniicon:899339236724068372> Aktif kullanıcı miktarı: **${message.guild.members.cache.filter(x => x.roles.cache.has(ShewTeam.id) && x.user.presence.status !== "offline").size}**\n<:miniicon:899339236724068372> Seste bulunan aktif kullanıcı miktarı: **${message.guild.members.cache.filter(x => x.roles.cache.has(ShewTeam.id) && x.voice.channel).size}**\n<:miniicon:899339236724068372> Kullanıcıların sağladığı ses oranı: %**${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(ShewTeam.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(ShewTeam.id)).size * 100)}**`)
            .addField(`**THE#0017** Adlı ekibin bilgilendirmesi`, `<:miniicon:899339236724068372> Toplam kullanıcı miktarı: **${THETeam.members.size}**\n<:miniicon:899339236724068372> Aktif kullanıcı miktarı: **${message.guild.members.cache.filter(x => x.roles.cache.has(THETeam.id) && x.user.presence.status !== "offline").size}**\n<:miniicon:899339236724068372> Seste bulunan aktif kullanıcı miktarı: **${message.guild.members.cache.filter(x => x.roles.cache.has(THETeam.id) && x.voice.channel).size}**\n<:miniicon:899339236724068372> Kullanıcıların sağladığı ses oranı: %**${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has(THETeam.id) && x.voice.channel).size / message.guild.members.cache.filter(r => r.roles.cache.has(THETeam.id)).size * 100)}**`)

            .setFooter(`Seste bulunan yetkili kullanıcı oranı: %${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has("899273632637919234") && x.voice.channel).size / message.guild.members.cache.filter(x => x.roles.cache.has("899273632637919234")).size * 100)}`)
            message.channel.send(TeamEmbed).then(m => message.react(this.client.ok))
        }
    } //
}
// .setFooter(`Sesteki üye oranı: %${parseInt(message.guild.members.cache.filter(x => !x.roles.cache.has("817782383590768671") && !x.roles.cache.has("811564401877975041") && !x.roles.cache.has("812402604990267483") && !x.roles.cache.has("830124107785699351") && !x.roles.cache.has("831266898389630976") && x.voice.channel).size / message.guild.members.cache.filter(x=>x.voice.channel).size * 100)} | Sesteki yetkili oranı: %${parseInt(message.guild.members.cache.filter(x => x.roles.cache.has("809041964611534867") && x.voice.channel).size / message.guild.members.cache.filter(x=>x.roles.cache.has("809041964611534867")).size * 100)}`)
