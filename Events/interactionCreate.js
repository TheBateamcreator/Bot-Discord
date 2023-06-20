const Discord = require('discord.js')

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === 'Aucune') {

            let choices = ['Activer', 'Désactiver']
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
            
        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }
}