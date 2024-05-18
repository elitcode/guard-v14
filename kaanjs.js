const {AuditLogEvent, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const kaanjs_config = require("./elitcode_config.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdir("./src/kaanjs_komut/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/kaanjs_komut/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let kaanjs_prop = require(`./src/kaanjs_komut/${f}/` + file);
console.log(`🔵 "KAANJS - KOMUT" ${kaanjs_prop.name} Yüklendi!`);
commands.set(kaanjs_prop.name, kaanjs_prop);
kaanjs_prop.aliases.forEach(alias => {aliases.set(alias, kaanjs_prop.name);});});}
    );
  });
});

readdir("./src/kaanjs_events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let kaanjs_prop = require(`./src/kaanjs_events/${file}`);
if (!kaanjs_prop.conf) return;
client.on(kaanjs_prop.conf.name, kaanjs_prop);
console.log(`🟡 "KAANJS - EVENTS" ${kaanjs_prop.conf.name} Yüklendi!`);});});

client.true = function (message) {
  if (message) { message.react( "✅") }
};

client.false = function (message) {
  if (message) { message.react("❌") }
};

Promise.prototype.sil = function (time) {
  if (this) this.then(s => {
        if (s.deletable) {
          setTimeout(async () => {
            s.delete().catch(e => { });
          }, time * 1000)
        }
      });
    };

client.login(kaanjs_config.token)
.then(() => console.log(`🟩 ${client.user.tag} Başarıyla Giriş Yaptı!`))
.catch((kaanjs_err) => console.log(`🟥 Bot Giriş Yapamadı Sebep: ${kaanjs_err}`));

