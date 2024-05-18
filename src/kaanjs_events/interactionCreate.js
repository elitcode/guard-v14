const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const elitcode_config = require("../../elitcode_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

}
}

module.exports.conf = {
name: "interactionCreate"
}
