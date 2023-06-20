const Discord = require("discord.js")

module.exports = {

  name: 'server',
  description: 'Obtenir plusieurs informations sur le serveur',
  permission: Discord.PermissionFlagsBits.ViewChannel,
  category: "Aucune",
  dm: false, 
  required: true,

  async run(bot, interaction) {

    // Lancement de la commande Server

    try {

      let description = interaction.guild.description
      if(description === null) description = 'Aucune'

      let afk = interaction.guild.afkChannel
      if(afk === null) afk = 'Aucun'

      let rules = interaction.guild.rulesChannel
      if(rules === null) rules = 'Aucun'

      let sys = interaction.guild.systemChannel
      if(sys === null) sys = 'Aucun'

      let upd = interaction.guild.publicUpdatesChannel
      if(upd === null) upd = 'Aucun'

      let EmbedServeurInfo = new Discord.EmbedBuilder()

      .setTitle(`__Informations sur le serveur :__`)
      .setColor(bot.color)
      .setDescription(`
      > **Nom :** \`${interaction.guild.name}\`
      > **Propriétaire :** <@${interaction.guild.ownerId}>
      > **Création du Serveur : ** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
      > **Description :** \`${description}\`
      > **Membres :** \`${interaction.guild.memberCount}\`
      > **Bots :** \`${interaction.guild.members.cache.filter(b => b.user.bot).size}\`
      > **Roles:** \`${interaction.guild.roles.cache.size}\`
      > **Emojis:** \`${interaction.guild.emojis.cache.size}\`
      > **Stickers:** \`${interaction.guild.stickers.cache.size}\`
      > **Emojis Animés :** \`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\`
      > **Catégories :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).size}\`
      > **Salons Textuels :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size}\`
      > **Salons Vocaux :** \`${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice).size}\`\n
      **__Informations sur les salons :__**\n
      > **Salon AFK :** ${afk}
      > **Salon Règles :** ${rules}
      > **Salon Update :** ${upd}
      > **Salon Système :** ${sys}\n
      **__Informations sur le boost du serveur :__**\n
      > **Nombre total de Boost :** \`${interaction.guild.premiumSubscriptionCount}\`
      > **Niveau de Boost :** \`${interaction.guild.premiumTier}\``)
      .setImage(await (await bot.guilds.fetch(interaction.guild.id, {force: true})).bannerURL({dynamic: true, size: 2048}))
      .setThumbnail(interaction.guild.iconURL({dynamic: true}))
      .setTimestamp()
      .setFooter({text: `${bot.user.username} © 2023`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

      interaction.reply({embeds: [EmbedServeurInfo]});

    } catch (err) {

      console.error(err)

      interaction.reply({content: "Une erreur inattendu c'est produite . Veulliez réssayer !", ephemeral: true})
    }
  }
}