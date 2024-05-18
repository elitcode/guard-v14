const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('webhooksUpdate', async (webhook) => {
  try {
    if (webhook.guild) {
        const auditLog = await webhook.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.WebhookCreate,
        });
        const entry = auditLog.entries.first();
        if (entry) {
          if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
          const member = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
          const hasRole = member.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
  
          if(!hasRole){
          ban(member,`${lang.msg39}`)
          var ceza = `${member.user.username} ${lang.msg6}`
          await webhookDelete(webhook)
        }else {
          var ceza = `${member.user.username} ${lang.msg5}`
        }
  
          const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
          logEmbed(`${lang.msg39}`,
          `- **${lang.msg37}** = \`${member.user.username}(${entry.executor.id})\` \n` +
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
  async function webhookDelete(kaanjs){
    const webhooks = await kaanjs.fetchWebhooks();
    webhooks.forEach(elitcode => elitcode.delete().catch(error => { }))
  }

