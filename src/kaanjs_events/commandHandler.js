const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const elitcode_config = require("../../elitcode_config.json");
const ms = require('ms');
module.exports = async (message) => {
if (elitcode_config.prefix && !message.content.startsWith(elitcode_config.prefix)) return;
const args = message.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const kaanjs_embed = new EmbedBuilder().setColor("DarkGold").setAuthor({name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: elitcode_config.clientPresence ? elitcode_config.clientPresence : `kaanjs & ElitCode` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {
cmd.execute(client, message, args, kaanjs_embed)} }
module.exports.conf = {name: "messageCreate"}
