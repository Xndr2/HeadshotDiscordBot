const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the bot\'s current latency'),
  
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const pingLatency = sent.createdTimestamp - interaction.createdTimestamp;
    
    // Get websocket heartbeat
    const heartbeatPing = interaction.client.ws.ping;
    
    await interaction.editReply({
      content: null,
      embeds: [{
        title: "🏓 Pong!",
        color: 0x00ff00, // Green color
        fields: [
          { name: "Bot Latency", value: `${pingLatency}ms`, inline: true },
          { name: "API Latency", value: `${heartbeatPing}ms`, inline: true }
        ],
        footer: { text: "Lower is better!" }
      }]
    });
  },
};