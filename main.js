const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require('./Handlers/loadCommands')
const loadEvents = require('./Handlers/loadEvents')
const config = require('./config')

bot.commands = new Discord.Collection()
bot.color = '#ffffff'

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)

// AntiCrash du Bot

process.on("unhandledRejection", err => {
    console.log("Uncaught Promise Error: ", err);
    return;
  });
  process.on("rejectionHandled", err => {
    console.log("RejectionHandled: ", err);
    return;
  });
  process.on("uncaughtException", err => {
    console.log("UncaughtException: ", err);
    return;
  });
  process.on("uncaughtExceptionMonitor", err => {
    console.log("UncaughtExceptionMonitor: ", err);
    return;
  });