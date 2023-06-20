const Discord = require('discord.js')
const loadSlashCommands = require('../Handlers/loadSlashCommands')
const loadDatabase = require('../Handlers/loadDatabase')
const config = require('../config')

module.exports = async bot => {

    // Lancement du bot (Ne pas supprimer cette partie)

    const token = config.token

    bot.db = await loadDatabase()
        
    console.log('Base de données connectée !')

    await loadSlashCommands(bot)

    let db = bot.db

    db.query(`SELECT * FROM token WHERE token = '${token}'`, async (err, req) => {

        if(req.length < 1) {

            db.query(`INSERT INTO token (token) VALUES ('${token}')`)
        } else {db.query(`UPDATE token SET token = '${token}'`)}
    })

    bot.user.setPresence({
        status: "online",
        activities: [{name : `/help`,
        type : Discord.ActivityType.Watching}]
    })

    console.log(`${bot.user.username} est en ligne !`)
}