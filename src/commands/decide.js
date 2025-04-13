const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('decide')
    .setDescription('Let the bot make a decision for you')
    .addStringOption(option => 
      option.setName('question')
        .setDescription('What do you need help deciding?')
        .setRequired(true)),
  
  async execute(interaction) {
    const question = interaction.options.getString('question');
    
    // Array of possible responses
    const responses = [
        "Absolutely yes!",
        "No way!",
        "I'm leaning towards yes.",
        "Probably not a good idea...",
        "Without a doubt!",
        "My sources say no.",
        "Most definitely!",
        "Very doubtful.",
        "Signs point to yes.",
        "Better not tell you now.",
        "Ask again later...",
        "Cannot predict now.",
        "Don't count on it.",
        "It is certain!",
        "Outlook good!",
        "Reply hazy, try again.",
        "50/50 chance.",
        "Concentrate and ask again.",
        "As I see it, yes.",
        "My reply is no.",
        "For sure",
        "No",
        "No question, Yes",
        "I am not authorized to tell you.",
        "No one knows",
        "Better ask yourself",
        "Maybe",
        "No question, No",
        "Don't count on it",
        "Perhaps",
        "Only Joe Biden can answer that",
        ":moyai:",
        "I wont answer",
        "ERoR.;!! QuEstIoN iS ToO hARd....",
        "Yes, indeed",
        "100% yea",
        "Water",
        "Think. What are your real priorities?",
        "Ask tomorrow",
        "Never",
        "Slow Down",
        "Yes.",
        "Maybe.",
        "It is unclear at this time.",
        "Signs point to yes.",
        "Signs point to no.",
        "You should try again later.",
        "Absolutely.",
        "Absolutely not.",
        "Ask again later.",
        "Cannot predict now.",
        "Don't count on it.",
        "My sources say no.",
        "My sources say yes.",
        "Outlook not so good.",
        "Outlook good.",
        "Very doubtful.",
        "Without a doubt.",
        "Most likely.",
        "Better not tell you now.",
        "Concentrate and ask again.",
        "Reply hazy, try again.",
        "It is certain.",
        "It is decidedly so.",
        "As I see it, yes.",
        "As I see it, no.",
        "Cannot say now.",
        "Signs are pointing towards a positive outcome.",
        "Signs are pointing towards a negative outcome.",
        "You may rely on it.",
        "It is doubtful.",
        "The outlook is promising.",
        "The outlook is not promising.",
        "Very likely.",
        "Very unlikely.",
        "Absolutely positively.",
        "Absolutely not in a million years.",
        "Don't bet on it.",
        "All signs point to a favorable outcome.",
        "All signs point to an unfavorable outcome.",
        "Ask your cat.",
        "Flip a coin.",
        "Do or do not. There is no try.",
        "It depends on the phase of the moon.",
        "Ask your mom.",
        "The answer is 42.",
        "Magic 8-ball says: signs point to yes.",
        "Let's leave it to fate and see what happens.",
        "Why don't you ask the Magic Conch Shell?",
        "Shake the Magic 8-ball again and ask later.",
        "I can't decide, I'm just a bot!",
        "Roll a D20 and find out.",
        "Have you considered flipping a pancake instead?",
        "The stars say maybe.",
        "My crystal ball is cloudy, try again later.",
        "Sorry, I'm allergic to decisions.",
        "You decide! I'm on vacation.",
        "The answer is blowing in the wind.",
        "Let's ask the ghosts.",
        "The universe says no."
    ];
    
    // Choose a random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    await interaction.reply({
      embeds: [{
        title: "🔮 Decision Helper",
        color: 0x9b59b6, // Purple color
        fields: [
          { name: "Your Question", value: question },
          { name: "My Answer", value: randomResponse }
        ]
      }]
    });
  },
};