const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('emojiCreate', async (emoji) => {
    if (emoji.guild) {
        const auditLog = await emoji.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.EMOJİ_CREATE,
        });
        const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member,`${lang.msg26}`)
          var ceza = `${member.user.username} ${lang.msg6}`
          await emojiDelete(emoji)
        }else {
          var ceza = `${member.user.username} ${lang.msg5}`
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg29}`,
          `- **${lang.msg27}** = \`${member.user.username}(${entry.executor.id})\` \n` +
          `- **${lang.msg28}** = \`${emoji.name}\` \n` +
          `- **${lang.msg7}** = \`${ceza}\``,
          `${entry.executor.id}`,
          logChannel);
      }
  }
  });

  client.on('emojiDelete', async (emoji) => {
    if (emoji.guild) {
        const auditLog = await emoji.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.EMOJİ_DELETE,
        });
        const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member,`${lang.msg30}`)
          var ceza = `${member.user.username} ${lang.msg6}`
          await emojisCreate(emoji)
        }else {
          var ceza = `${member.user.username} ${lang.msg5}`
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg33}`,
          `- **${lang.msg31}** = \`${member.user.username}(${entry.executor.id})\` \n` +
          `- **${lang.msg32}** = \`${emoji.name}\` \n` +
          `- **${lang.msg7}** = \`${ceza}\``,
          `${entry.executor.id}`,
          logChannel);
      }
  }
  });

  client.on('emojiUpdate', async (emoji,newEmoji) => {
    if (emoji.guild) {
        const auditLog = await emoji.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.EMOJİ_UPDATE,
        });
        const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member,`${lang.msg34}`)
          var ceza = `${member.user.username} ${lang.msg6}`
          await emojiUpdate(emoji,newEmoji)
        }else {
          var ceza = `${member.user.username} ${lang.msg5}`
          await emojiUpdate(emoji,newEmoji)
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg34}`,
          `- **${lang.msg35}** = \`${member.user.username}(${entry.executor.id})\` \n` +
          `- **${lang.msg36}** = \`${emoji.name}\` \n` +
          `- **${lang.msg7}** = \`${ceza}\``,
          `${entry.executor.id}`,
          logChannel);
      }
  }
  });


  async function ban(user,reason){
    try {
      await user.ban({ reason });
    } catch (error) {}
  }
  async function emojiDelete(emoji){
    emoji.delete({reason: `Guard ~ Elit Code Guard!` });
  }
  async function emojisCreate(emoji){
    emoji.guild.emojis.create({ attachment: emoji.url, name: emoji.name, reason: `Guard ~ Elit Code Guard!`})
}
  async function emojiUpdate(emoji,newEmoji){
    newEmoji.edit({ name: emoji.name })
}

