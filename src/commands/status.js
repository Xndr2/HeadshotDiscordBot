const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Object to store cooldowns for each command
const cooldowns = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check the current status from Ash or the research station'),

  async execute(interaction) {
    const commandName = 'status';
    const now = Date.now();
    const cooldownTime = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Check if the command is in cooldown
    if (cooldowns[commandName] && now - cooldowns[commandName] < cooldownTime) {
        // Calculate the target time for the cooldown (in Unix timestamp format, in seconds)
      const timeRemaining = (cooldowns[commandName] + cooldownTime);
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('⚠️ Status Update Unavailable')
        .setDescription(`ASH: "It seems you’ve already checked the station status recently. Please give it some time...or wait for an emergency to arise. You'll know when it happens."`)     
        .addFields({
          name: "Try Again:",
          value: `<t:${Math.floor(timeRemaining / 1000)}:R>` // Show relative time remaining
        });
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    // Update the cooldown time for the command
    cooldowns[commandName] = now;

    const statuses = [
        "ASH: All systems nominal. Ambient station air quality: questionable.",
        "STATION: Minor hull fractures detected on Deck C. No immediate threat.",
        "ASH: Lifeform readings fluctuating. Could be a sensor glitch… or not.",
        "STATION: Power grid unstable. Rerouting through secondary relays.",
        "ASH: Diagnostic complete. Conclusion: this place still sucks.",
        "STATION: Emergency lighting active. Core access restricted.",
        "ASH: Radiation levels within acceptable parameters. Mostly.",
        "STATION: Cryo chamber pressure stable. For now.",
        "ASH: Sensors detected minor seismic activity. Or it’s indigestion.",
        "STATION: Deck F water filtration offline. Recommend bottled options.",
        "ASH: Hull integrity at 92%. That’s fine, right?",
        "STATION: Warning — unidentified energy fluctuations detected near Engineering.",
        "ASH: Power surge logged. Nothing exploded… yet.",
        "STATION: Atmosphere mix 70/25/5. Trace elements unknown.",
        "ASH: One camera feed went dark. Probably nothing.",
        "STATION: Routine system check complete. All anomalies ignored.",
        "ASH: Audio feed detected unknown whispers. Good luck with that.",
        "STATION: External comms offline. Local network stable.",
        "ASH: No hostile bio-signatures nearby. Probably.",
        "STATION: Door control systems experiencing intermittent failures.",
        "ASH: One maintenance drone missing. If found, please return.",
        "STATION: Internal temperature optimal. Slightly chilly by human standards.",
        "ASH: Reactor output nominal. And delightfully ominous.",
        "STATION: Environmental contamination within normal limits.",
        "ASH: Power grid restoration in progress. Expect some fluctuations in lighting.",
        "STATION: Atmospheric pressure in Deck D is below optimal levels. Minor risk of decompression.",
        "ASH: System reboot complete. Warning: Organic matter detected near Sector 7. Proceed with caution.",
        "STATION: Security lockdown initiated. Unauthorized access detected on Level 5.",
        "ASH: All functions operational. However, there's a peculiar smell coming from the lower levels…",
        "STATION: Air filtration systems operating at 78%. Recommend wearing respirators.",
        "ASH: Minor technical glitch detected. No signs of major malfunction, though you might hear some strange noises.",
        "STATION: Maintenance drone has gone silent. Likely deactivated, no signs of movement.",
        "ASH: Temperature stabilization in process. It’s freezing in some areas—wear a jacket!",
        "STATION: Internal communication lines disrupted. Unable to establish full contact with command center.",
        "ASH: External sensors show nothing abnormal. Still, I wouldn’t trust the quiet…"
      ];
      

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('🔧 Current Status')
      .setDescription(randomStatus);

    await interaction.reply({ embeds: [embed] });
  },
};
