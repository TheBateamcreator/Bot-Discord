const Discord = require('discord.js')

module.exports  = {

    name: 'role',
    description: 'Permet d\'avoir des informations sur un rôle',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'role',
            name: 'role',
            description: 'Le rôle à découvrir',
            required: true,
            autocomplete: false
        }
    ],

    async run (bot, message, args) {

        // Lancement de la commande Role

        try {

            const role = args.getRole('role')
            if(!role)return message.reply({content: 'Veuliez donner un rôle valide !', ephemeral: true})

            let mention = role.mentionable
            if(mention === 'false') mention = 'Non';else mention = 'Oui'

            let perms = role.permissions.toArray().map(e => `${e},`)
            if(!perms) perms = 'Aucune permissions'

            const embed = new Discord.EmbedBuilder()
            .setTitle(`__Information du Rôle__`)
            .setDescription(`
            > **Nom** : \`${role.name}\` ${role}
            > **ID** : \`${role.id}\`
            > **Couleur :** \`#${role.color}\`
            > **Positions** : \`${role.position}\`
            > **Mentionnable** : \`${mention}\`\n
            **__Paramètre du Rôle :__**\n
            > **Création du rôle** : <t:${Math.floor(role.createdAt / 1000)}:F>
            `)
            .addFields({ name: `> Permissions`, value: `\`${perms}\``, inline: true})
            .setColor(bot.color)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [embed]});

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}