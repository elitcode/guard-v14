const Discord = require('discord.js');
const { logEmbed } = require('../../utils/logger');
const kaanjs_config = require("../../elitcode_config.json")
const lang = require(`../../lang/${kaanjs_config.lang}.js`);

client.on('guildMemberAdd', async (member) => {
  try {
    if(!member.user.bot)return;
    if (member.guild) {
        const auditLog = await member.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.BOT_ADD,
        });
        const entry = auditLog.entries.first();
          if (entry) {
            if(entry.executor.id === kaanjs_config.clientID || entry.executor.id === kaanjs_config.ownerID) return;
            const member1 = client.guilds.cache.get(kaanjs_config.guildID)?.members.cache.get(entry.executor.id); // Üyeyi sunucudan ve ID'den getir
            const hasRole = member1.roles.cache.has(kaanjs_config.whiteRole); // Kullanıcının rolü var mı kontrol et
    
  
            if(!hasRole){
            ban(member1,`${lang.msg41}`)
            var ceza = `${member1.user.username} ${lang.msg6}`
            await kick(member,`${lang.msg41}`)
          }else {
            var ceza = `${member1.user.username} ${lang.msg5}`
          }
    
            const logChannel = client.channels.cache.get(kaanjs_config.logChannelID);
            logEmbed(`${lang.msg40}`,
            `- **${lang.msg43}** = \`${member1.user.username}(${entry.executor.id})\` \n` +
            `- **${lang.msg42}** = \`${member.user.name}(${member.user.id})\` \n` +
            `- **${lang.msg7}** = \`${ceza}\``,
            `${entry.executor.id}`,
            logChannel);
        }}
      } catch (error) {}
    });



    async function ban(user,reason){
      try {
        await user.ban({ reason });
      } catch (error) {}
    }
  async function kick(user,reason){
    await user.kick({ reason });
  }

