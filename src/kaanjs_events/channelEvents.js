const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('channelDelete', async (channel) => {
  try {
    if (channel.guild) {
      const auditLog = await channel.guild.fetchAuditLogs({
        type: Discord.AuditLogEvent.CHANNEL_DELETE,
      });
      const entry = auditLog.entries.first();
      if (entry) {
        if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
        const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
        const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et

        if(!hasRole){
        ban(member,`${lang.msg4}`)
        var ceza = `${member.user.username} ${lang.msg6}`
        channel.clone({ parent: channel.parentId })
      }else {
        var ceza = `${member.user.username} ${lang.msg5}`
      }

        const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
        logEmbed(`${lang.msg1}`,
        `- **${lang.msg2}** = \`${member.user.username}(${entry.executor.id})\` \n` +
        `- **${lang.msg3}** = \`${channel.name}(${channel.id})\` \n` +
        `- **${lang.msg7}** = \`${ceza}\``,
        `${entry.executor.id}`,
        logChannel);
    }
}
  } catch (error) {
    
  }
})

client.on('channelCreate', async (channel) => {
  if (channel.guild) {
    const auditLog = await channel.guild.fetchAuditLogs({
      type: Discord.AuditLogEvent.CHANNEL_CREATE,
    });
    const entry = auditLog.entries.first();
    if (entry) {
      if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
      const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
      const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et

      if(!hasRole){
      ban(member,`${lang.msg8}`)
      var ceza = `${member.user.username} ${lang.msg6}`
      await deleteChannel(channel)
    }else {
      var ceza = `${member.user.username} ${lang.msg5}`
    }

      const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
      logEmbed(`${lang.msg11}`,
      `- **${lang.msg9}** = \`${member.user.username}(${entry.executor.id})\` \n` +
      `- **${lang.msg10}** = \`${channel.name}(${channel.id})\` \n` +
      `- **${lang.msg7}** = \`${ceza}\``,
      `${entry.executor.id}`,
      logChannel);
  }
}
});

client.on('channelUpdate', async (channel,newChannel) => {
  if (channel.guild) {
    const auditLog = await channel.guild.fetchAuditLogs({
      type: Discord.AuditLogEvent.CHANNEL_CREATE,
    });
    const entry = auditLog.entries.first();
    if (entry) {
      if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
      const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
      const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et

      if(!hasRole){
      ban(member,`${lang.msg23}`)
      var ceza = `${member.user.username} ${lang.msg6}`
      await updateChannel(channel,newChannel)
    }else {
      await updateChannel(channel,newChannel)
      var ceza = `${member.user.username} ${lang.msg5}`
    }

      const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
      logEmbed(`${lang.msg23}`,
      `- **${lang.msg24}** = \`${member.user.username}(${entry.executor.id})\` \n` +
      `- **${lang.msg25}** = \`${channel.name}(${channel.id})\` \n` +
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

async function deleteChannel(channel){
  await channel.delete({reason: `Guard ~ Elit Code Guard!` });
}
async function updateChannel(oldChannel,newChannel){
  oldChannel.guild.channels.edit(newChannel.id,{
    name:oldChannel.name,
    position:oldChannel.position,
    topic:oldChannel.topic,
    nsfw:oldChannel.nsfw,
    parent:oldChannel.parent,
    userLimit:oldChannel.userLimit,
    bitrate:oldChannel.bitrate,
    reason: `Guard ~ Elit Code Guard!`
})
}
