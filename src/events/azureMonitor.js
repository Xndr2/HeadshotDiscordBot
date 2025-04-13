const { Events } = require('discord.js');
const azureClient = require('../utils/azureUtils');
require('dotenv').config();

// Store the last seen commit ID
let lastSeenCommitId = null;

module.exports = {
  name: Events.ClientReady,
  once: false,
  async execute(client) {
    // Initial check to get the most recent commit
    const initialCommits = await azureClient.getLatestCommits(1);
    if (initialCommits && initialCommits.length > 0) {
      lastSeenCommitId = initialCommits[0].commitId;
      console.log(`Monitoring commits starting from: ${lastSeenCommitId}`);
    }

    // Set up the interval to check for new commits (every 30 seconds)
    setInterval(async () => {
      try {
        // Get the latest commits
        const latestCommits = await azureClient.getLatestCommits(10);
        
        if (!latestCommits || latestCommits.length === 0) {
          return;
        }

        // Filter out the new commits
        const newCommits = [];
        for (const commit of latestCommits) {
          if (commit.commitId === lastSeenCommitId) {
            break;
          }
          newCommits.push(commit);
        }

        // Update the last seen commit ID
        if (newCommits.length > 0) {
          lastSeenCommitId = newCommits[0].commitId;
          
          // Send notifications for new commits (in reverse order to maintain chronology)
          const notificationChannel = client.channels.cache.get(process.env.DISCORD_NOTIFICATION_CHANNEL_ID);
          
          if (notificationChannel) {
            for (let i = newCommits.length - 1; i >= 0; i--) {
              const commit = newCommits[i];
              // Get the change counts using the utility function
              const changeCounts = await azureClient.getChangeCounts(commit.commitId);
              const formattedMessage = azureClient.formatCommitForDiscord(commit, changeCounts);
              await notificationChannel.send(formattedMessage);
            }
            console.log(`Sent notifications for ${newCommits.length} new commits`);
          } else {
            console.error('Notification channel not found. Check your DISCORD_NOTIFICATION_CHANNEL_ID.');
          }
        }
      } catch (error) {
        console.error('Error in Azure monitor interval:', error.message);
      }
    }, 30000); // Check every 30 seconds
  },
};