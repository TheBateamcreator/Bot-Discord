const Discord = require('discord.js')

module.exports  = {

    name: 'channel',
    description: 'Permet d\'avoir des informations sur un rôle',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'channel',
            name: 'salon',
            description: 'Le rôle à découvrir',
            required: true,
            autocomplete: false
        }
    ],

    async run (bot, message, args) {

        // Lancement de la commande Channel

        try {

            let channel = args.getChannel('salon')
            if(!channel)return message.reply({content: 'Veuliez donner un channel valide !', ephemeral: true})

            let nsfw = channel.nsfw
            if(nsfw === 'false') nsfw = 'Non';else nsfw = 'Oui'

            let embed = new Discord.EmbedBuilder()
            .setTitle(`__Information du Channel__`)
            .setDescription(`
            > **Nom** : \`${channel.name}\` ${channel}
            > **ID** : \`${channel.id}\`
            > **NSFW** : \`${nsfw}\`
            > **Positions** : \`${channel.position}\`
            > **Url** : ${channel.url}
            > **Création du salon** : <t:${Math.floor(channel.createdAt / 1000)}:F>`)
            .setColor('#fc0000')
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [embed]})

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}