const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Cooldown object to store timestamps
const cooldowns = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stationlog')
    .setDescription('Retrieve a random log entry from the abandoned station'),

  async execute(interaction) {
    const commandName = 'stationlog';
    const now = Date.now();
    const cooldownTime = 20 * 60 * 1000; // 20 minutes in milliseconds

    // Check if the command is in cooldown
    if (cooldowns[commandName] && now - cooldowns[commandName] < cooldownTime) {
        // Calculate the target time for the cooldown (in Unix timestamp format, in seconds)
        const timeRemaining = (cooldowns[commandName] + cooldownTime);
        const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('⚠️ Station Log Retrieval on Hold')
          .setDescription(`ASH: "You've already browsed through the logs. If you're looking for something new, you'll have to wait... or you could always create your own logs."`)
          .addFields({
            name: "Try Again:",
            value: `<t:${Math.floor(timeRemaining / 1000)}:R>` // Show relative time remaining
          });
        return interaction.reply({ embeds: [embed], flags: 64 });
    }

    // Update the cooldown time for the command
    cooldowns[commandName] = now;

    const logs = [
        "*[LOG 2381-03-14]* — 'Something's moving in the ventilation shafts. If I don't make it, tell Rhea I’m sorry.'",
        "*[LOG 2381-03-16]* — 'We lost comms with the core sector. Doors sealed. I don't know who's still alive.'",
        "*[LOG 2381-03-18]* — 'I caught a glimpse of it… it wasn’t human anymore.'",
        "*[LOG 2381-03-20]* — 'ASH is getting weird. Keeps locking doors by mistake.'",
        "*[LOG 2381-03-21]* — 'Power fluctuations getting worse. Oxygen reserves are dropping.'",
        "*[LOG 2381-03-23]* — 'I hear whispers on the comms. They call my name.'",
        "*[LOG 2381-03-24]* — 'Stay out of Deck E. It’s not safe anymore.'",
        "*[LOG 2381-03-25]* — 'I tried to reach the escape pods. They’re offline. I’m trapped.'",
        "*[LOG 2381-03-26]* — 'Ration packs expired a week ago. Tastes fine.'",
        "*[LOG 2381-03-27]* — 'Somebody left an EVA suit moving on its own.'",
        "*[LOG 2381-03-28]* — 'Vents are making noise again. Or maybe it's the walls.'",
        "*[LOG 2381-03-29]* — 'Time feels wrong. Like it's slower near Engineering.'",
        "*[LOG 2381-03-30]* — 'Lights flickered. Saw something behind me in the reflection.'",
        "*[LOG 2381-03-31]* — 'Maintenance drone missing for 3 days. Found it melted.'",
        "*[LOG 2381-04-01]* — 'Ash started talking to himself. I swear it wasn’t me.'",
        "*[LOG 2381-04-02]* — 'Found old logs nobody remembers recording.'",
        "*[LOG 2381-04-03]* — 'Sickbay is locked from inside. No one’s answering.'",
        "*[LOG 2381-04-04]* — 'I saw someone down in the cargo bay. No one should be there.'",
        "*[LOG 2381-04-05]* — 'Doors opened on their own. Closed just as fast.'",
        "*[LOG 2381-04-06]* — 'Heard my name in the static again.'",
        "*[LOG 2381-04-07]* — 'Oxygen generator offline for 2 minutes. No explanation.'",
        "*[LOG 2381-04-08]* — 'Woke up with fresh bruises. Don’t remember how.'",
        "*[LOG 2381-04-09]* — 'Saw footprints where no one’s walked.'",
        "*[LOG 2381-04-22]* — 'Everything is quiet. Too quiet. If I don’t hear back from Command by the end of the shift, I’ll make my own way out.'",
        "*[LOG 2381-04-23]* — 'The experiment's gone wrong. We’ve sealed off the infected sectors. No one is coming to help.'",
        "*[LOG 2381-04-25]* — 'I don’t think we’re alone here anymore. I keep hearing footsteps outside my office.'",
        "*[LOG 2381-04-28]* — 'The last transmission was garbled. What I caught: “The containment failure…” and then static. That’s all we got.'",
        "*[LOG 2381-05-01]* — 'There’s something in the walls. I heard it scraping. God help us if it gets out.'",
        "*[LOG 2381-05-03]* — 'I’m moving out. The doors are locked, but I’m getting off this damn station one way or another.'",
        "*[LOG 2381-05-05]* — 'I can’t trust anyone anymore. Everyone looks the same. We’re just... waiting.'",
        "*[LOG 2381-05-07]* — 'Our last shot at escaping is gone. We were supposed to be safe here. They promised us.'",
        "*[LOG 2381-05-09]* — 'A strange new scent in the air. It’s making everyone feel disoriented.'",
        "*[LOG 2381-05-11]* — 'They’ve turned off the lights. It’s getting harder to see, and I’m starting to lose my mind. I can’t stay here much longer.'"
      ];
      

    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    const embed = new EmbedBuilder()
      .setColor('#1e90ff')
      .setTitle('📜 Station Log Entry')
      .setDescription(randomLog);

    await interaction.reply({ embeds: [embed] });
  },
};
