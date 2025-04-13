const { SlashCommandBuilder } = require('discord.js');
const azureClient = require('../utils/azureUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commit-details')
    .setDescription('Get details about a specific commit')
    .addStringOption(option =>
      option.setName('commit-id')
        .setDescription('The ID of the commit')
        .setRequired(true)),

  async execute(interaction) {
    await interaction.deferReply();
    const commitId = interaction.options.getString('commit-id');

    try {
      const commit = await azureClient.getCommitDetails(commitId);
      if (!commit) return interaction.editReply(`No commit found with ID: ${commitId}`);

      // Get the change counts using the utility function
      const changeCounts = await azureClient.getChangeCounts(commitId);

      // Format the commit details for Discord
      const embedMessage = azureClient.formatCommitForDiscord(commit, changeCounts);
      await interaction.editReply(embedMessage);

    } catch (error) {
      console.error('Error fetching commit details:', error);
      await interaction.editReply(`There was an error fetching details for commit: ${commitId}`);
    }
  },
};
