const Discord = require("discord.js")

module.exports = {

    name: 'help',
    description: 'Obtenir de l\'aide',
    dm: false,
    permission: Discord.PermissionFlagsBits.ViewChannel,
    category: 'Aucune',
    options: [],

    async run(bot, message, args) {

        // Lancement de la commande Help

        try {

            let info = new Discord.EmbedBuilder()
            .setTitle(`Information`)
            .setColor(bot.color)
            .setDescription(`
            > \`/bot\` ➔ Montre les informations du bot.
            > \`/help\` ➔ Obtenez de l'aide.
            > \`/ping\` ➔ Montre la latence du bot.
            > \`/user\` ➔ Donne des informations sur le membre.
            > \`/role\` ➔ Donne des informations sur le rôle.
            > \`/server\` ➔ Obtenir plusieurs informations sur le serveur.
            > \`/channel\` ➔ Donne des informations sur le salon.`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            let modo = new Discord.EmbedBuilder()
            .setTitle(`Modération`)
            .setColor(bot.color)
            .setDescription(`
            > \`/ban\` ➔ Ban un membre.
            > \`/kick\` ➔ Kick un membre.
            > \`/lock\` ➔ Lock un salon.
            > \`/mute\` ➔ Mute un membre.
            > \`/unban\` ➔ Unban un utilisateur.
            > \`/unlock\` ➔ Unlock un salon.
            > \`/unmute\` ➔ Unmute un membre.`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            let menu = new Discord.SelectMenuBuilder()
            .setCustomId("help")
            .addOptions([
                {
                    label: "Accueil",
                    value: "accueil",
                    emoji: "\<:tohome:1108647521762414614>",
                    description: "Revenir à l'accueil"
                },{
                    label: "Information",
                    value: "info",
                    emoji: "\<:toinf:1108647514103619584>",
                    description: "Commande d'Information"
                },{
                    label: "Modération",
                    value: "modo",
                    emoji: "\<:tomod:1108647524576809051>",
                    description: "Commande de Modération"
                }
                ])

            let menuRow = new Discord.ActionRowBuilder().addComponents(menu)

            let EmbedHelp = new Discord.EmbedBuilder()
            .setTitle(`Menu help`)
            .setDescription(`
            Voici le menu help ! Vous n'avez cas cliquer sur la catégorie de commande correspondante et je serai ravi de vous aider !

            **Catégories** : \`3\`
            **Commandes** : \`14\`

            __**Catégorie des commandes :**__

            - **Information**
            - **Modération**`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(bot.color)
            .setFooter({ text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            message.reply({ embeds: [EmbedHelp], components: [menuRow] }).then( msg => {

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async interaction => {

                    if(interaction.isSelectMenu()) {

                        if(interaction.user.id !== message.user.id) return interaction.reply({content: `Vous ne pouvez pas utiliser ce select menu !`, ephemeral: true})

                        if(interaction.values[0] === "accueil"){
                            interaction.update({ embeds: [EmbedHelp], components: [menuRow] })
                        }
                        if(interaction.values[0] === "info"){
                            interaction.update({ embeds: [info], components: [menuRow] })
                        }
                        if(interaction.values[0] === "modo"){
                            interaction.update({ embeds: [modo], components: [menuRow] })
                        }
                    }
                })
            })
            
        } catch (err) {
        console.error(err)

        message.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
    }
    }
}