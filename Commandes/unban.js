const Discord  = require('discord.js')

module.exports = {

    name: 'unban',
    description: 'Unban un utilisateur',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'Utilisateur à débannir',
            required: true,
            autocomplete: false
        },{
            type: 'string',
            name: 'raison',
            description: 'Raison du débannissement',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Lancement de la commande Unban

        try {
         
            const user = args.getUser('utilisateur')
            if(!user)return message.reply({content: 'Veuliez saisir un utilisateur valide !', ephemeral: true})

            let reason = args.getString('raison')
            if(!reason) reason = 'Pas de raison fournie.'

            if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply({ephemeral: true, content:'Cette utilisateur n\'est pas banni !'})

            try {await user.send(`Tu as été débanni du serveur **${message.guild.name}** par **${message.user.tag}** pour la **raison** : \`${reason}\``)} catch(err) {}

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Unban")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/unban\` :
            **Utilisateur débanni** : **${user.tag}**
            **Raison du déban** : \`${reason}\``)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Débanni par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

            await message.guild.members.unban(user, reason)

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }

    }
}