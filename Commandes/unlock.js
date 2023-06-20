const Discord = require('discord.js')

module.exports = {

    name: 'unlock',
    description: 'Unlock un salon',
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: 'Aucune',
    options: [
        {
            type: 'channel',
            name: 'salon',
            description: 'Salon à unlock',
            required: true,
            autocomplete: false
        }, {
            type: 'role',
            name: 'role',
            description: 'Rôle à unlock',
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        // Lancement de la commande Unlock
        
        try {

            const channel = args.getChannel('salon')
            if(!message.guild.channels.cache.get(channel.id)) return message.reply({ ephemeral: true, content: 'Pas de salon !'})
            if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.PublicThread && channel.type !== Discord.ChannelType.PrivateThread)return message.reply({ ephemeral: true, content: "Envoyer un salon textuel !"})

            let role = args.getRole('role')
            if(role && !message.guild.roles.cache.get(role.id)) return message.reply({ ephemeral: true, content: 'Pas de rôle !'})
            if(!role) role = message.guild.roles.everyone;

            if(channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes('SendMessages')) return message.reply(`Le role \`${role.name}\` est déjà unlock dans le salon ${channel}`)

            if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: true})
            else await channel.permissionOverwrites.create(role.id, {SendMessages: true})

            const Embed = new Discord.EmbedBuilder()
            .setTitle("Unlock")
            .setDescription(`
            **${message.user.tag}** a utilisé la commande \`/unlock\` :
            **Salon délock** : ${channel}
            **Rôle délock** : ${role}`)
            .setTimestamp()
            .setColor(bot.color)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setFooter({text: `Délock par : ${message.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            await message.reply({embeds: [Embed]})

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}