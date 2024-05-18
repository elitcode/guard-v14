const { EmbedBuilder } = require("discord.js");

function logEmbed(title,desc,footer,channel){
    let embed = new EmbedBuilder()
    .setColor("DarkRed")
    .setTitle(title)
    .setDescription(desc)
    .setTimestamp()
	.setFooter({ text: footer });

    channel.send({embeds:[embed]})
}
module.exports = {
    logEmbed
}