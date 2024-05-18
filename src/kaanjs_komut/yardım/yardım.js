const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const canvafy = require('canvafy');
const kaanjs_config = require("../../../elitcode_config.json")
let lang = require(`../../../lang/${kaanjs_config.lang}.js`);
module.exports = {
name: "yardım",
usage: "yardım",
category:"genel",
desc:"Bot komutlarını gösterir.",
aliases: ["help", "h"],
execute: async (client, message, args, kaanjs_embed) => {   

    let eglence = commandShow('eglence')
    let eglence_message = `${eglence.map(kaanjs => `- ${kaanjs_config.prefix}${kaanjs.usage}`).join("\n")}`
    let genel = commandShow('genel')
    let genel_message = `${genel.map(kaanjs => `- ${kaanjs_config.prefix}${kaanjs.desc}`).join("\n")}`

    message.reply({embeds:[kaanjs_embed.setDescription(`# ${lang.msg19}\n${genel_message}\n# ${lang.msg20}\n${eglence_message}`)]})

}}

function commandShow(name){
    let cmd = client.commands.filter(kaanjs => kaanjs.category && kaanjs.category == name.toLowerCase())
    return cmd ? cmd : null;
}