const Discord = require("discord.js")

module.exports = {

    name: 'user',
    description: 'Donne des information sur le membre',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Le membre à voir',
            required: false,
            autocomplete: false
        }
    ],

    async run (bot, message, args) {

        // Lancement de la commande User

        try {

            let user;
            if(args.getUser('utilisateur')) {
                user = args.getUser('utilisateur')
                if(!user || !message.guild.members.cache.get(user?.id)) return message.reply('Pas de membre !')

            }else user = message.user;{

            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply({ephemeral: true, content:'Pas de membre !'})

                let presence = member ? member.presence ? member.presence.status : 'Hors ligne' : 'Inconnu';
                if(presence == 'dnd') presence = 'Ne pas déranger';else if(presence == 'idle') presence = 'Inactif'; else if(presence == 'offline') presence = 'Hors ligne'; else if(presence == 'online') presence = 'Online'; else if(presence == 'streaming') presence = 'Streaming'; else if(presence == 'Inconnu') presence = '❓'
                let botstats = user.bot
                if(botstats === false) botstats = 'Non'; else botstats = 'Oui'
                let name = user.username
                if(name === null || undefined) name = 'Auncun'
                let Embed = new Discord.EmbedBuilder()
                .setTitle(`__Information de ${user.username}__`)
                .setColor(bot.color)
                .setDescription(`
                    > **Pseudo** : \`${user.tag}\`
                    > **Tag** : \`${user.discriminator}\`
                    > **ID** : \`${user.id}\`
                    > **Bots :** \`${botstats}\`
                    > **Surnom :** \`${name}\`
                    > **Status** : \`${presence}\`\n
                    **__Informations de compte :__**\n
                    > **Arrivée sur le serveur** : <t:${Math.floor(member.joinedAt / 1000)}:F>
                    > **Création du compte** : <t:${Math.floor(user.createdAt / 1000)}:F>`)
                .setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
                .setTimestamp()
                .setFooter({text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({dynamic: true})})
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
                await message.reply({embeds: [Embed]})
            }
        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}