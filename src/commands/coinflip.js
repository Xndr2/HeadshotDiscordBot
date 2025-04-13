const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin to make a decision'),
  
  async execute(interaction) {
    // 50% chance for each outcome
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '🪙' : '💿';
    
    await interaction.reply({
      embeds: [{
        title: `${emoji} Coin Flip`,
        description: `The coin landed on **${result}**!`,
        color: 0xffd700, // Gold color
      }]
    });
  },
};