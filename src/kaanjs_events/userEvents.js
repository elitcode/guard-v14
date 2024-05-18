const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('guildBanAdd', async (member) => {
  try {
    if (member.guild) {
      const auditLog = await member.guild.fetchAuditLogs({
        type: Discord.AuditLogEvent.MEMBER_BAN_ADD,
      });
      const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member1 = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member1.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member1,`${lang.msg47}`)
          var ceza = `${member1.user.username} ${lang.msg6}`
          member.guild.members.unban(member.user.id)
        }else {
          var ceza = `${member1.user.username} ${lang.msg5}`
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg45}`,
          `- **${lang.msg46}** = \`${member1.user.username}(${entry.executor.id})\` \n` +
          `- **${lang.msg44}** = \`${member.user.name}(${member.user.id})\` \n` +
          `- **${lang.msg7}** = \`${ceza}\``,
          `${entry.executor.id}`,
          logChannel);
      }
  }
  } catch (error) {
  }
  });

  client.on('guildMemberRemove', async (member) => {
    try {
      if (member.guild) {
        const auditLog = await member.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.MEMBER_KİCK,
        });
        const entry = auditLog.entries.first();
          if (entry) {
            if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
            const member1 = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
            const hasRole = member1.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
    
            if(!hasRole){
            ban(member1,`${lang.msg51}`)
            var ceza = `${member1.user.username} ${lang.msg6}`
          }else {
            var ceza = `${member1.user.username} ${lang.msg5}`
          }
    
            const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
            logEmbed(`${lang.msg49}`,
            `- **${lang.msg50}** = \`${member1.user.username}(${entry.executor.id})\` \n` +
            `- **${lang.msg48}** = \`${member.user.name}(${member.user.id})\` \n` +
            `- **${lang.msg7}** = \`${ceza}\``,
            `${entry.executor.id}`,
            logChannel);
        }
    }
      
    } catch (error) {
      
    }
  });



  async function ban(user,reason){
    try {
      await user.ban({ reason });
    } catch (error) {}
  }
