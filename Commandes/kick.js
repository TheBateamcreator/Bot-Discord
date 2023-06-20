const Discord  = require('discord.js')

module.exports = {

    name: 'kick',
    description: 'Kick un utilisateur',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à kick',
            required: true,
            autocomplete: false
        },{
            type: 'string',
            name: 'raison',
            description: 'Raison du kick',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Lancement de la commande Kick

        try {
         
            const user = args.getUser('utilisateur')
            if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

            const member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply({ ephemeral: true, content: "Pas de membre à kick !"})

            let reason = args.getString('raison')
            if(!reason) reason = 'Pas de raison fournie.'

            if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: "Ne kick pas le propriétaire du serveur !"})
            if(member && !member?.kickable) return message.reply({ ephemeral: true, content: "Je ne peux pas kick ce membre !"})
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: "Tu ne peux pas kick ce membre !"})

            try {await user.send(`Tu as été kick du serveur **${message.guild.name}** par **${message.user.tag}** pour la **raison** : \`${reason}\``)} catch(err) {}

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Kick")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/kick\` :
            **Utilisateur kick** : **${user.tag}**
            **Raison du kick** : \`${reason}\``)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Kick par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

            await member.kick(reason)

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }

    }
}