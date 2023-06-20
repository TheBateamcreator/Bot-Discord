const Discord = require('discord.js')

module.exports = {

    name: 'ping',
    description: 'Affcihe le ping du bot',
    permission: Discord.PermissionFlagsBits.ViewChannel,
    dm: false,
    category: 'Aucune',
    options: [],

    async run(bot, message) {

        // Lancement de la commande Ping

        try {

            const ping = bot.ws.ping
            
            let Embed = new Discord.EmbedBuilder()
            .setDescription(`Le ping du bot est de : \`${ping}\``)
            
            await message.reply({embeds: [Embed]})

        } catch(err) {

            console.error(err)

            message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
        }
    }
}