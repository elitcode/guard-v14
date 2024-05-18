const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('roleCreate', async (role) => {
  try {
    if (role.guild) {
        const auditLog = await role.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.ROLE_CREATE,
        });
        const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member,`${lang.msg16}`)
          var ceza = `${member.user.username} ${lang.msg6}`
          await deleteRole(role)
        }else {
          var ceza = `${member.user.username} ${lang.msg5}`
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg19}`,
          `- **${lang.msg17}** = \`${member.user.username}(${entry.executor.id})\` \n` +
          `- **${lang.msg18}** = \`${role.name}(${role.id})\` \n` +
          `- **${lang.msg7}** = \`${ceza}\``,
          `${entry.executor.id}`,
          logChannel);
      }
  }
  } catch (error) {
    
  }
  });

  client.on('roleDelete', async (role) => {
    try {
      
      if (role.guild) {
          const auditLog = await role.guild.fetchAuditLogs({
            type: Discord.AuditLogEvent.ROLE_DELETE,
          });
          const entry = auditLog.entries.first();
          if (entry) {
            if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
            const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
            const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
    
            if(!hasRole){
            ban(member,`${lang.msg15}`)
            var ceza = `${member.user.username} ${lang.msg6}`
            await createRole(role)
          }else {
            var ceza = `${member.user.username} ${lang.msg5}`
  
          }
    
            const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
            logEmbed(`${lang.msg12}`,
            `- **${lang.msg13}** = \`${member.user.username}(${entry.executor.id})\` \n` +
            `- **${lang.msg14}** = \`${role.name}(${role.id})\` \n` +
            `- **${lang.msg7}** = \`${ceza}\``,
            `${entry.executor.id}`,
            logChannel);
        }
    }
    } catch (error) {
      
    }
  });

  client.on('roleUpdate', async (role,newRole) => {
    try {
      if (role.guild) {
          const auditLog = await role.guild.fetchAuditLogs({
            type: Discord.AuditLogEvent.ROLE_UPDATE,
          });
          const entry = auditLog.entries.first();
          if (entry) {
            if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
            const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id);
            const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); 
    
            if(!hasRole){
            ban(member,`${lang.msg20}`)
            var ceza = `${member.user.username} ${lang.msg6}`
            await updateRole(role,newRole)
          }else {
            var ceza = `${member.user.username} ${lang.msg5}`
          }
    
            const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
            logEmbed(`${lang.msg20}`,
            `- **${lang.msg21}** = \`${member.user.username}(${entry.executor.id})\` \n` +
            `- **${lang.msg22}** = \`${role.name}(${role.id})\` \n` +
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
  
  async function deleteRole(role){
    await role.delete({  reason: `Guard ~ Elit Code Guard!`  });
  }
  
  async function createRole(role){
    await role.guild.roles.create({
      name: role.name,
      color: role.color,
      hoist: role.hoist,
      permissions: role.permissions,
      position: role.position,
      mentionable: role.mentionable,
      reason: "Guard ~ Elit Code Guard!"
  });
  }

  async function updateRole(oldrole,newrole){
    newrole.edit({
      name: oldrole.name,
      color: oldrole.color,
      hoist: oldrole.hoist,
      permissions: oldrole.permissions,
      position: oldrole.position,
      mentionable: oldrole.mentionable,
      reason: `Guard ~ Elit Code Guard!!`
  })
  }