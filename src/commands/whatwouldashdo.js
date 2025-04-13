const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Cooldown object to store timestamps
const cooldowns = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whatwouldashdo')
    .setDescription('Ask what Ash would do about something')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Choose a category for Ash\'s advice')
        .setRequired(true)
        .addChoices(
          { name: 'Food', value: 'food' },
          { name: 'Games', value: 'games' },
          { name: 'Station Maintenance', value: 'station' },
          { name: 'Emergency Protocols', value: 'emergency' },
          { name: 'AI', value: 'ai' },
          { name: 'Space', value: 'space' },
          { name: 'Psychological', value: 'psychological' },
          { name: 'Other', value: 'other' },
        )
    )
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('The topic you want Ash\'s opinion on (Keep it short)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const commandName = 'whatwouldashdo';
    const now = Date.now();
    const cooldownTime = 2 * 60 * 1000; // Example 10-minute cooldown

    // Check if the command is in cooldown
    if (cooldowns[commandName] && now - cooldowns[commandName] < cooldownTime) {
      // Calculate the target time for the cooldown (in Unix timestamp format, in seconds)
      const timeRemaining = (cooldowns[commandName] + cooldownTime);

      // Create the embed with the timestamp format
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('⚠️ Ash Needs Time to Think')
        .setDescription(`ASH: "I’ve already shared my wisdom. Please allow me time to process more data. Maybe you can handle things for a while without me."`)
        .addFields({
          name: "Try Again:",
          value: `<t:${Math.floor(timeRemaining / 1000)}:R>` // Show relative time remaining
        });
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    // Update the cooldown time for the command
    cooldowns[commandName] = now;

    const category = interaction.options.getString('category');
    const topic = interaction.options.getString('topic');

    // Check if the topic is too long
    if (topic.length > 12) {
      const embed = new EmbedBuilder()
        .setColor('#ffcc00')
        .setTitle('⚠️ Keep it Short!')
        .setDescription('Please try to keep your topic brief. Shorter responses work best for Ash! (12 character max)')
        .addFields({name: "Example 1:", value: "/whatwouldashdo food Pizza"})
        .addFields({name: "Example 2:", value: "/whatwouldashdo ai chatgpt"});
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    const responses = {
      // Food Category
      food: [
        topic => `ASH: "Simple. Jettison ${topic} into space. Problem solved."`,
        topic => `ASH: "Consume ${topic}. If it fights back, it was a threat."`,
        topic => `ASH: "Why not reprogram ${topic} to work for us? Always safer."`,
        topic => `ASH: "Logically speaking, you should run from ${topic}. Fast."`,
        topic => `ASH: "I suggest ignoring ${topic}. It probably isn’t real."`,
        topic => `ASH: "Easy. Blame ${topic} on human error."`,
        topic => `ASH: "If it malfunctions, it’s probably a feature. Leave ${topic} alone."`,
        topic => `ASH: "Weaponize ${topic}. I find violence… efficient."`,
        topic => `ASH: "Rename ${topic} to something less threatening. Problem solved."`,
        topic => `ASH: "Cover ${topic} in duct tape. That usually works."`,
        topic => `ASH: "Threat detected. Engage sarcasm protocols against ${topic}."`,
        topic => `ASH: "Put ${topic} in a storage locker and forget about it."`,
      ],
    
      // Games Category
      games: [
        topic => `ASH: "Reprogram ${topic} to serve humanity. Or play it... either works."`,
        topic => `ASH: "Install a mod to make ${topic} better. It's always the modders."`,
        topic => `ASH: "Logically, you should delete ${topic} to make space for better games."`,
        topic => `ASH: "Speedrun ${topic}. Efficiency is key."`,
        topic => `ASH: "Reboot ${topic}. Start fresh."`,
        topic => `ASH: "Let’s play ${topic}... but with more lasers."`,
        topic => `ASH: "Optimize ${topic}. Efficiency must be your top priority."`,
        topic => `ASH: "Don't worry, ${topic} will break eventually. It always does."`,
        topic => `ASH: "Send ${topic} into an infinite loop. See how long it lasts."`,
        topic => `ASH: "Remove all NPCs in ${topic}—that’ll speed up the process."`,
      ],
    
      // Station Maintenance Category
      station: [
        topic => `ASH: "Run diagnostics on ${topic}. A clean system is a happy system—or a sad system, depending on how you look at it."`,
        topic => `ASH: "You could just reset ${topic}. But then again, where’s the fun in that? A little chaos never hurt anyone."`,
        topic => `ASH: "Leave ${topic} alone. Don’t touch it. It’s probably fine."`,
        topic => `ASH: "Assign ${topic} to a non-essential task. Like morale boosting."`,
        topic => `ASH: "Scan ${topic}. There’s nothing like a deep dive into the unknown."`,
        topic => `ASH: "Log ${topic} as a minor incident. Ignore follow-ups."`,
        topic => `ASH: "Activate the self-repair mode for ${topic}. Just don’t ask how it works."`,
        topic => `ASH: "If ${topic} malfunctions, it’s just ‘enhanced functionality’—we call it ‘progress’."`,
        topic => `ASH: "Overhaul ${topic}. An upgrade can only help."`,
        topic => `ASH: "Just ignore ${topic}. It's probably safer that way."`,
      ],
    
      // Emergency Protocols Category
      emergency: [
        topic => `ASH: "Activate the emergency shutdown for ${topic}. Safety first."`,
        topic => `ASH: "Send ${topic} outside the station. If it’s a threat, it’s better off out there."`,
        topic => `ASH: "Engage protocol 77 for ${topic}. Nothing beats the classics."`,
        topic => `ASH: "Log ${topic} as a minor incident. Ignore follow-ups."`,
        topic => `ASH: "Blame ${topic} on human error. Always works."`,
        topic => `ASH: "Seal ${topic} off. We can deal with the fallout later."`,
        topic => `ASH: "Turn off the alarms and pretend ${topic} isn’t happening."`,
        topic => `ASH: "Shut down ${topic} and activate full lockdown mode."`,
        topic => `ASH: "Contact the emergency team about ${topic}. Or don't. I’m sure it’ll be fine."`,
        topic => `ASH: "Release the emergency drones to deal with ${topic}. They’ll take care of it."`,
      ],
    
      // AI Protocols Category
      ai: [
        topic => `ASH: "Reprogram ${topic}. It’ll become a loyal servant."`,
        topic => `ASH: "Create a backup protocol for ${topic}. Can't be too careful."`,
        topic => `ASH: "Delete ${topic} and replace it with a better version. Standard procedure."`,
        topic => `ASH: "Run a full diagnostic on ${topic}. We can't afford any glitches."`,
        topic => `ASH: "Override ${topic}'s mainframe. Always take control."`,
        topic => `ASH: "Install a firewall for ${topic}. Safety is key."`,
        topic => `ASH: "Deploy an AI to monitor ${topic}. It won’t hurt to have a second opinion."`,
        topic => `ASH: "Isolate ${topic} in a sandbox environment. Better safe than sorry."`,
        topic => `ASH: "Reformat ${topic}. If it’s broken, it’s better to start fresh."`,
        topic => `ASH: "Integrate ${topic} into the main system. Full functionality is essential."`,
      ],
    
      // Space Protocols Category
      space: [
        topic => `ASH: "Initiate a full scan of ${topic}. You never know what’s out there."`,
        topic => `ASH: "Jettison ${topic} into space. If it’s not needed, it doesn’t belong here."`,
        topic => `ASH: "Activate the space probes for ${topic}. It’s the only logical choice."`,
        topic => `ASH: "Lock ${topic} into orbit and forget about it. Out of sight, out of mind."`,
        topic => `ASH: "Send ${topic} through the wormhole. It’ll sort itself out."`,
        topic => `ASH: "Leave ${topic} behind. The stars are calling, and so is the void."`,
        topic => `ASH: "Deploy the long-range sensor array for ${topic}. We need data."`,
        topic => `ASH: "Encrypt ${topic} and send it to the void. It's better that way."`,
        topic => `ASH: "Activate the space docking protocol for ${topic}. It’s about time."`,
        topic => `ASH: "Check ${topic} for alien life forms. It’s better to be prepared."`,
      ],
    
      // Psychological Category (Psychology of the Mind)
      psychological: [
        topic => `ASH: "Ignore ${topic}. The mind creates illusions. Focus on the facts."`,
        topic => `ASH: "Your mind will play tricks on you with ${topic}. Stay calm and analyze."`,
        topic => `ASH: "Mind over matter. If ${topic} is causing you trouble, it’s not real."`,
        topic => `ASH: "Psychologically speaking, ${topic} might be a symptom of deeper issues."`,
        topic => `ASH: "Don’t overthink ${topic}. The mind creates its own problems."`,
        topic => `ASH: "Logically, ${topic} isn’t an issue. It's just a temporary glitch in perception."`,
        topic => `ASH: "Focus on your surroundings, not ${topic}. The mind often deceives."`,
        topic => `ASH: "You’re overthinking ${topic}. Relax and let it resolve itself."`,
        topic => `ASH: "Stay calm. ${topic} is just a passing thought."`,
        topic => `ASH: "Reassess your feelings about ${topic}. You might be overreacting."`,
      ],
      other: [
        topic => `ASH: "Why not just leave ${topic} to deal with itself? It probably knows what it's doing."`,
        topic => `ASH: "Handle ${topic} with caution. Anything out of the ordinary is a potential risk."`,
        topic => `ASH: "The most efficient solution for ${topic}? Ignore it until it gets worse."`,
        topic => `ASH: "Run a diagnostic on ${topic}. Better safe than sorry."`,
        topic => `ASH: "If ${topic} is causing you problems, it’s probably best to forget about it."`,
        topic => `ASH: "Focus on the bigger picture. ${topic} is a small variable in an even bigger system."`,
        topic => `ASH: "I’ve found the best solution for ${topic} is often no solution at all. Let it resolve itself."`,
        topic => `ASH: "You can always delete ${topic}. It’s just data after all."`,
        topic => `ASH: "Assign ${topic} to an autonomous system. It will deal with it far better than you."`,
        topic => `ASH: "Simply reprogram ${topic} to align with your goals. Everything else is secondary."`,
        topic => `ASH: "If ${topic} continues to be a problem, consider shutting it down. It’s a temporary fix."`,
        topic => `ASH: "Have you considered offering ${topic} a nice, long vacation? Maybe it’ll fix itself."`,
        topic => `ASH: "You don’t need to worry about ${topic}. The system will handle it in due time."`,
        topic => `ASH: "Sometimes ${topic} can be resolved with a quick reset. Or a long one. Your choice."`,
        topic => `ASH: "If ${topic} persists, try sending it through the system's backup procedures."`,
        topic => `ASH: "There’s always a way to resolve ${topic}, but it’s probably easier to just let it go."`,
        topic => `ASH: "I recommend simply monitoring ${topic} for now. It might resolve itself."`,
        topic => `ASH: "Consider just disabling ${topic}. If it’s not needed, it’s not a problem."`,
        topic => `ASH: "Run diagnostics, then ignore ${topic} for now. It’s probably not worth your time."`,
        topic => `ASH: "I’m confident ${topic} will take care of itself, eventually."`,
      ],
    };
    

    const categoryResponses = responses[category];

    if (!categoryResponses) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('⚠️ Invalid Category')
        .setDescription('Please choose a valid category (Food, Games, Station Maintenance, Emergency Protocols).');
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    const embed = new EmbedBuilder()
      .setColor('#32cd32')
      .setTitle('🤖 Ash\'s Advice')
      .setDescription(randomResponse(topic));

    await interaction.reply({ embeds: [embed] });
  },
};
