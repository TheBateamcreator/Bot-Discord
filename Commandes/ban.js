const Discord  = require('discord.js')

module.exports = {

    name: 'ban',
    description: 'Ban un utilisateur',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à bannir',
            required: true,
            autocomplete: false
        },{
            type: 'string',
            name: 'raison',
            description: 'Raison du bannissement',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Lancement de la commande Ban

        try {
         
            const user = args.getUser('utilisateur')
            if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

            const member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply({ ephemeral: true, content: "Pas de membre à bannir !"})

            let reason = args.getString('raison')
            if(!reason) reason = 'Pas de raison fournie.'

            if(message.user.id === user.id)return message.reply({ ephemeral: true, content: "Essaie pas de te ban pas"})
            if((await message.guild.fetchOwner()).id === user.id) return message.reply({ ephemeral: true, content: "Ne ban pas le propriétaire du serveur !"})
            if(member && !member?.bannable) return message.reply({ ephemeral: true, content: "Je ne peux pas bannir ce membre !"})
            if(member && !member.bannable) return message.reply("Vous ne pouvez pas bannir cet utilisateur.")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ ephemeral: true, content: "Tu ne peux pas bannir ce membre !"})
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà ban !")

            try {await user.send(`Tu as été banni du serveur **${message.guild.name}** par **${message.user.tag}** pour la **raison** : \`${reason}\``)} catch(err) {}

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Ban")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/ban\` :
            **Utilisateur banni** : **${user.tag}**
            **Raison du ban** : \`${reason}\``)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Banni par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

            await message.guild.bans.create(user.id, {reason: reason})

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }

    }
}