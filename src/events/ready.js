const { Events, Activity, ActivityType } = require('discord.js');


module.exports = {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Define the status messages
	const statusMessages = [
		{ activity: 'a game of chess', type: ActivityType.Playing },
		{ activity: 'commits fly by', type: ActivityType.Watching },
		{ activity: 'with caffeine', type: ActivityType.Playing },
		{ activity: 'commit details', type: ActivityType.Listening },
		{ activity: 'code... 🧑‍💻', type: ActivityType.Watching },
		{ activity: 'with coffee ☕️', type: ActivityType.Playing },
		{ activity: 'errors', type: ActivityType.Listening },
		{ activity: 'with some code magic ✨', type: ActivityType.Playing },
		{ activity: 'merge conflicts', type: ActivityType.Listening },
		{ activity: 'with the cloud', type: ActivityType.Playing },
		{ activity: 'new languages... coding ones', type: ActivityType.Watching },
		{ activity: 'server logs', type: ActivityType.Listening },
		{ activity: 'with the codebase', type: ActivityType.Playing },
		{ activity: 'some new features', type: ActivityType.Watching },
		{ activity: 'Abandoned', type: ActivityType.Playing },
		{ activity: 'a bug 🐞', type: ActivityType.Listening },
		{ activity: 'a game of pull requests', type: ActivityType.Playing },
		{ activity: 'code for speed', type: ActivityType.Watching },
		{ activity: 'like a pro', type: ActivityType.Playing },
		{ activity: 'logic', type: ActivityType.Watching },
		{ activity: 'git merges', type: ActivityType.Playing },
		{ activity: 'one line at a time', type: ActivityType.Listening },
		{ activity: 'regex', type: ActivityType.Playing },
		{ activity: 'a new project', type: ActivityType.Listening },
		{ activity: 'the art of coding', type: ActivityType.Watching },
		{ activity: 'the boring stuff', type: ActivityType.Playing },
		{ activity: 'before they find you', type: ActivityType.Listening },
		{ activity: 'teams ship code faster', type: ActivityType.Playing },
		{ activity: 'way too much coffee ☕', type: ActivityType.Watching },
		{ activity: 'at 3 AM', type: ActivityType.Playing },
		{ activity: 'the server run smoothly', type: ActivityType.Listening },
		{ activity: 'one commit at a time', type: ActivityType.Playing },
	];
  

    let currentStatusIndex = 0;

    // Function to update the bot's status
    function updateStatus() {
      const status = statusMessages[currentStatusIndex];

      // Set the bot's activity to the current status
      client.user.setPresence({
        activities: [{ name: status.activity, type: status.type }],
        status: 'online', // Can set to 'idle', 'dnd', or 'invisible'
      });

      // Move to the next status message in the list
      currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
    }

    // Change the bot's status every 30 minutes (1800000ms)
    setInterval(updateStatus, 600000);

    // Update the status immediately when the bot starts
    updateStatus();
  },
};
