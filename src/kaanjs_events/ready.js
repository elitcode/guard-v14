const elitcode_config = require("../../elitcode_config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client;
module.exports = () => {

client.user.setPresence({activities:[{name:`ElitCode & kaanjs`,type: ActivityType.Streaming,url:"https://www.twitch.tv/elitcode"}], status: "dnd" });

}
module.exports.conf = {
name: "ready"
}
