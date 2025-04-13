const axios = require('axios');
require('dotenv').config();

const organization = process.env.AZURE_ORGANIZATION;
const project = process.env.AZURE_PROJECT;
const repository = process.env.AZURE_REPO;
const pat = process.env.AZURE_PAT;
const baseUrl = `https://dev.azure.com/${organization}/${project}/_apis/git/repositories/${repository}`;
const apiVersion = '7.0';

const axiosInstance = axios.create({
  headers: {
    'Authorization': `Basic ${Buffer.from(`:${pat}`).toString('base64')}`,
    'Content-Type': 'application/json'
  }
});

// Fetch latest commits
async function getLatestCommits(count = 10) {
  try {
    const limitedCount = Math.min(Math.max(1, Number(count) || 10), 10);
    const response = await axiosInstance.get(`${baseUrl}/commits?searchCriteria.top=${limitedCount}&api-version=${apiVersion}`);
    const commits = response.data.value.slice(0, limitedCount);

    // Include changes for each commit
    for (let commit of commits) {
      commit.changeCounts = await getChangeCounts(commit.commitId); // Get the change counts for each commit
    }

    return commits;
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    return [];
  }
}

// Fetch commit details
async function getCommitDetails(commitId) {
  try {
    const response = await axiosInstance.get(`${baseUrl}/commits/${commitId}?api-version=${apiVersion}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commit details for ${commitId}:`, error.message);
    return null;
  }
}

// Fetch changes in a commit
async function getCommitChanges(commitId) {
  try {
    const response = await axiosInstance.get(`${baseUrl}/commits/${commitId}/changes?api-version=${apiVersion}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commit changes for ${commitId}:`, error.message);
    return null;
  }
}

// Helper function to count changes in a commit (added, edited, deleted)
async function getChangeCounts(commitId) {
  try {
    const changes = await getCommitChanges(commitId);
    const changeCounts = { add: 0, edit: 0, delete: 0 };

    if (changes && changes.changes) {
      for (const c of changes.changes) {
        if (c.changeType === 'add') changeCounts.add++;
        else if (c.changeType === 'edit') changeCounts.edit++;
        else if (c.changeType === 'delete') changeCounts.delete++;
      }
    }
    return changeCounts;
  } catch (error) {
    console.error(`Error counting changes for ${commitId}:`, error.message);
    return { add: 0, edit: 0, delete: 0 }; // Default to 0 if there's an error
  }
}

function formatCommitForDiscord(commit, changeCounts = null) {
  const authorName = commit.author?.name || 'Unknown Author';
  const commitDate = new Date(commit.author?.date).toLocaleString();
  const message = commit.comment || 'No commit message';

  const titleText = message.split('\n')[0];
  const maxTitleLength = 30;
  const shortTitle = titleText.length > maxTitleLength
    ? titleText.substring(0, maxTitleLength - 3) + '...'
    : titleText;

  const fields = [
    { name: 'Author', value: authorName, inline: true },
    { name: 'Date', value: commitDate, inline: true },
    { name: 'Commit ID', value: `\`${commit.commitId}\``, inline: false }
  ];

  if (changeCounts) {
    fields.push({
      name: 'Changes',
      value: `🟢 Added: ${changeCounts.add}\n📝 Edited: ${changeCounts.edit / 5}\n❌ Deleted: ${changeCounts.delete}`,
      inline: false
    });
  }

  return {
    embeds: [{
      title: `📝 Commit: ${shortTitle}`,
      color: 0x0078d7,
      description: `**Full Message:**\n${message}`,
      fields: fields,
      timestamp: new Date(commit.author?.date)
    }]
  };
}

module.exports = {
  getLatestCommits,
  getCommitDetails,
  getCommitChanges,
  getChangeCounts, // Export the getChangeCounts function
  formatCommitForDiscord
};
