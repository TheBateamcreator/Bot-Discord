const Discord = require('discord.js')

module.exports  = {

    name: 'bot',
    description: 'Montre les informations du bot',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    category: 'Aucune',
    options:[],

    async run (bot, message, args) {

        // Lancement de la commande Bot

        try {

            const days = Math.floor(bot.uptime / 86400000);
            const hours = Math.floor(bot.uptime / 3600000) % 24;
            const minutes = Math.floor(bot.uptime / 60000) % 60;
            const seconds = Math.floor(bot.uptime / 1000) % 60;

            const Embed = new Discord.EmbedBuilder()
            .setTitle('Information du bot')
            .setColor(bot.color)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setDescription(`
            **__Informations sur le robot__**
            
            > **Développeur** : \`Aroft#7527\`
            > **Nom** : \`${bot.user.username}\`
            > **Tag** : \`${bot.user.discriminator}\`
            > **Identifiant** : \`${bot.user.id}\`
            > **Version de discord.js** : \`${Discord.version}\`
            > **Version de node.js** : \`${process.version}\`
            > **Temps de connexion** : \`${days} jour(s), ${hours} heure(s), ${minutes} minute(s), ${seconds} seconde(s)\`

            **__Information sur les statistique__**

            > **Serveurs** : \`${bot.guilds.cache.size}\`
            > **Utilisateurs ** : \`${bot.users.cache.size}\`
            > **Commandes** : \`${bot.commands.size}\`
            > **Salons** : \`${bot.channels.cache.size}\`
            > **Emojis** : \`${bot.emojis.cache.size}\``)

            await message.reply({embeds: [Embed]})
            
        } catch (err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}