const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of all available commands and their descriptions'),

  async execute(interaction) {
    // Fetch latest application commands from cache
    const commands = await interaction.client.application.commands.fetch();

    const embed = new EmbedBuilder()
      .setColor('#00b0f4')
      .setTitle('🛠️ Headshot Interactive Bot Commands')
      .setDescription('Here’s a list of all available commands you can use:')
      .setFooter({ text: 'More features coming soon. Stay vigilant out there...' });

    commands.forEach(cmd => {
      embed.addFields({ name: `/${cmd.name}`, value: cmd.description || 'No description provided.' });
    });

    await interaction.reply({ embeds: [embed], flags: 64 });
  },
};