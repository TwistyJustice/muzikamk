const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(`kaizen🖤kain`);
    if (!message.member.roles.cache.has(ayar.kayitSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yaş = Number (args[2]);
    let yaziIsım = `${ayar.tag || ""} ${isim} | ${yaş}`

    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription(`Kayıt etmeye çalıştığın kişi seninle aynı yetkide veya senden daha üstte olduğu için işlemi gerçekleştiremedim.`)).then(x => x.delete({timeout: 10000}));
    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın. \`Örnek: ${ayar.prefix || '.'}e @üye isim yaş\``).setFooter("kaizen🖤kain")).then(x => x.delete({timeout: 10000}));
    member.setNickname(`${ayar.tag || ""} ${isim} | ${yaş}`).catch();
    message.channel.send(embed.setDescription(`${member} adlı üyenin ismi ${yaziIsım} olarak değiştirildi.`));
    
let komut;
 if (member.roles.cache.has(ayar.erkekRol1) && !member.roles.cache.has(ayar.kadinRol1)) komut = "Erkek"
 if (member.roles.cache.has(ayar.kadinRol1) && !member.roles.cache.has(ayar.erkekRol1)) komut = "Kadın"
 if (!member.roles.cache.has(ayar.erkekRol1) && !member.roles.cache.has(ayar.kadinRol1)) komut = "Bulunamadı"  

    kdb.push(`isimler.${member.id}`, {
        guildName: `${ayar.tag || ""} ${isim} | ${yaş}`,
        Name: isim,
        Age: yaş,
        Zaman: Date.now(),
        Yetkili: message.author.id,
        Komut: komut
    });
};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick", "i"],
    usage: "isim @üye [isim] [yaş]",
    description: "Belirtilen üyenin sunucudaki ismini değiştirir."
};
