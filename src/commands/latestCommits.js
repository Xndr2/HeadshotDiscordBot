const { SlashCommandBuilder } = require('discord.js');
const azureClient = require('../utils/azureUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('latest-commits')
    .setDescription('Shows the latest commits from the Azure repository')
    .addIntegerOption(option => 
      option.setName('count')
        .setDescription('Number of commits to show (max 10)')
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false)),
  
  async execute(interaction) {
    await interaction.deferReply();
    const count = interaction.options.getInteger('count') || 5;
    
    try {
      // Make sure we're actually limiting the commits to the requested count
      const commits = await azureClient.getLatestCommits(count);
      
      if (!commits || commits.length === 0) {
        return interaction.editReply('No commits found in the repository.');
      }
      
      // Ensure we're only processing the requested number of commits
      const commitsToShow = commits.slice(0, count);
      
      if (commitsToShow.length === 1) {
        // If only one commit, send it directly
        const formattedMessage = azureClient.formatCommitForDiscord(commitsToShow[0]);
        await interaction.editReply({ content: `Here is the latest commit:`, embeds: formattedMessage.embeds });
      } else {
        // For multiple commits, send them one by one
        await interaction.editReply(`Here are the latest ${commitsToShow.length} commits:`);
        
        for (const commit of commitsToShow) {
          const formattedMessage = azureClient.formatCommitForDiscord(commit);
          await interaction.followUp({ embeds: formattedMessage.embeds });
        }
      }
    } catch (error) {
      console.error('Error fetching commits:', error);
      await interaction.editReply('There was an error fetching commits from Azure DevOps.');
    }
  },
};