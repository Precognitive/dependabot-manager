const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  const { number } = github.context.payload;

  const token = core.getInput('token');
  const assignees = core.getInput('assignees');
  const octokit = new github.GitHub(token);

  try {
    await octokit.pulls.createReviewRequest({
      owner,
      repo,
      pull_number: number,
      team_reviewers: ['software-engineers']
    });

    await octokit.issues.addAssignees({
      owner,
      repo,
      issue_number: number,
      assignees: assignees
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
