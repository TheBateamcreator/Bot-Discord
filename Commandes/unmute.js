const Discord  = require('discord.js')

module.exports = {

    name: 'unmute',
    description: 'Unmute un utilisateur',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à unmute',
            required: true,
            autocomplete: false
        },{
            type: 'string',
            name: 'raison',
            description: 'Raison du mute',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Lancement de la commande Unmute

        try {
         
            const user = args.getUser('utilisateur')
            if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

            const member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply({ ephemeral: true, content: 'Pas de membre à bannir !'})

            let reason = args.getString('raison')
            if(!reason) reason = 'Pas de raison fournie.'

            if(!member.moderatable) return message.reply({ephemeral: true, content:'Je ne peux pas mute ce membre !'})
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'Tu ne peux pas mute ce membre !'})
            if(!member.isCommunicationDisabled()) return message.reply({ephemeral: true, content:'Ce membre est pas mute !'})

            try {await user.send(`Tu as été unmute du serveur **${message.guild.name}** par **${message.user.tag}** pour la **raison** : \`${reason}\``)} catch(err) {}

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Unmute")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/unmute\` :
            **Utilisateur démute** : **${user.tag}**
            **Raison du démute** : \`${reason}\``)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Démute par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

            await member.timeout(null, reason)

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }

    }
}