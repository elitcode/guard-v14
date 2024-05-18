const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const elitcode_config = require("../../elitcode_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

if(value == "ticket"){
   const itiraf = new TextInputBuilder()
  .setCustomId("sebeb")
  .setLabel(`Destek açma sebibiniz.`)
  .setStyle(TextInputStyle.Paragraph)
  .setMaxLength(300)
  .setPlaceholder("Buraya yazınız.")
  .setRequired(true)
  const textrow = new ActionRowBuilder()
  .addComponents(itiraf)
  const modal = new ModalBuilder()
  .setCustomId("ticketon")
  .setTitle("Ticket")
  modal.addComponents(textrow)
  await interaction.showModal(modal)
}
}
}

module.exports.conf = {
name: "interactionCreate"
}
