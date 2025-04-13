const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll dice for tabletop games')
    .addStringOption(option => 
      option.setName('dice')
        .setDescription('Dice notation (e.g., 2d6, 1d20, 3d8+5)')
        .setRequired(true)),
  
  async execute(interaction) {
    const diceNotation = interaction.options.getString('dice');
    
    // Parse dice notation (e.g., "2d6+3")
    const diceRegex = /^(\d+)d(\d+)(?:([+-])(\d+))?$/i;
    const match = diceNotation.match(diceRegex);
    
    if (!match) {
      return interaction.reply({
        content: 'Invalid dice notation. Use format like `2d6`, `1d20`, or `3d8+5`.',
        flags: 64
      });
    }
    
    const numDice = parseInt(match[1]);
    const numSides = parseInt(match[2]);
    const modifier = match[3] ? match[3] : null;
    const modValue = match[4] ? parseInt(match[4]) : 0;
    
    // Validate the input
    if (numDice <= 0 || numDice > 100 || numSides <= 0 || numSides > 1000) {
      return interaction.reply({
        content: 'Please use reasonable dice values (max 100 dice with up to 1000 sides each).',
        flags: 64
      });
    }
    
    // Roll the dice
    const rolls = [];
    let total = 0;
    
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      rolls.push(roll);
      total += roll;
    }
    
    // Apply modifier
    let modifierText = '';
    if (modifier) {
      if (modifier === '+') {
        total += modValue;
        modifierText = ` + ${modValue}`;
      } else {
        total -= modValue;
        modifierText = ` - ${modValue}`;
      }
    }
    
    // Construct the result message
    const rollsText = rolls.join(', ');
    
    await interaction.reply({
      embeds: [{
        title: `🎲 Dice Roll: ${diceNotation}`,
        color: 0xf1c40f, // Gold color
        fields: [
          { name: "Individual Rolls", value: rollsText },
          { name: "Total", value: `${rolls.join(' + ')}${modifierText} = **${total}**` }
        ],
        footer: { text: "May the odds be ever in your favor!" }
      }]
    });
  },
};