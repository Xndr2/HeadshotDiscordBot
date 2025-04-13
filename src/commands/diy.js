const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('diy')
    .setDescription('Encourage others to join the development team')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to encourage to become a developer')
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('target');

    const messages = [
      "We’re always looking for people to help out! Check out what we need below and hop into <#998558850036797492> if you're interested.",
      "Instead of waiting for someone else to fix it, why not give it a shot yourself? See what we’re looking for down there.",
      "Got some skills? Or just curious to try? Look through the list and let us know in <#998558850036797492>.",
      "Best way to improve things is to be part of it. Have a look at what spots we’re trying to fill.",
      "Think you can help out? Check the roles below and drop by <#998558850036797492>."
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle('📢 We’re Looking for Team Members!')
      .setDescription(`${target ? `Hey ${target}! ` : ''}${randomMessage}`)
      .addFields(
        { name: '🖥️ Game System Programmer', value: 'Work on the core systems and mechanics.', inline: false },
        { name: '✍️ Story & Gameplay Writer', value: 'Help shape the world, characters, and gameplay ideas.', inline: false },
        { name: '🎛️ UI Designer', value: 'Design and improve the menus, HUDs, and other in-game UI.', inline: false },
        { name: '🦾 Rigging / Animator', value: 'Animate characters, creatures, and objects.', inline: false },
        { name: '🎨 3D Modeler (Blender)', value: 'Create models for environments, props, and characters.', inline: false },
        { name: '🧪 Testers', value: '[Click here for more info.](https://discord.com/channels/972478717232304138/1210668956654768179/1345874833682206783)', inline: false }
      )
      .setFooter({ text: 'Interested? Head over to #applications' });

    await interaction.reply({ embeds: [embed], allowedMentions: { users: target ? [target.id] : [] } });
  },
};
