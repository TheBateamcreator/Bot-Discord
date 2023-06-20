const Discord  = require('discord.js')
const ms = require('ms')

module.exports = {

    name: 'mute',
    description: 'Mute un utilisateur',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à mute',
            required: true,
            autocomplete: false
        },{
            type: 'string',
            name: 'temps',
            description: 'Temps du mute (ex: 1h, 2h30m, 10s)',
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

        // Lancement de la commande Mute

        try {
         
            const user = args.getUser('utilisateur')
            if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

            const member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply({ ephemeral: true, content: 'Pas de membre à bannir !'})

            const time = args.getString('temps')
            if (!time) return message.reply({ ephemeral: true, content: 'Pas de temps !'})
            if(isNaN(ms(time))) return message.reply({ ephemeral: true, content: 'Pas le bon format !'})
            if(ms(time) > 2592000000) return message.reply({ ephemeral: true, content: 'Le mute ne peut pas durer plus de 30 jours !'})

            let reason = args.getString('raison')
            if(!reason) reason = 'Pas de raison fournie.'

            if (message.user.id === user.id) return message.reply({ ephemeral: true, content: 'Ne te mute pas tout seul !'})
            if((await message.guild.fetchOwner()).id === user.id) return message.reply({ephemeral: true, content:'Ne mute pas le propriétaire du serveur !'})
            if(!member.moderatable) return message.reply({ephemeral: true, content:'Je ne peux pas mute ce membre !'})
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ephemeral: true, content:'Tu ne peux pas mute ce membre !'})
            if(member.isCommunicationDisabled()) return message.reply({ephemeral: true, content: "Ce membre est déjà mute !"})

            try {await user.send(`Tu as été mute du serveur **${message.guild.name}** pendant \`${time}\` par **${message.user.tag}** pour la **raison** : \`${reason}\``)} catch(err) {}

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Mute")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/mute\` :
            **Utilisateur mute** : **${user.tag}**
            **Temps du mute** : \`${time}\`
            **Raison du mute** : \`${reason}\``)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Mute par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

            await member.timeout(ms(time), reason)

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }

    }
}