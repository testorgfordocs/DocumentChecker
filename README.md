# DocumentChecker

DocumentChecker is a Slack app designed to streamline the process of internal documentation review. It automates reminders for documentation updates, facilitates the creation of pull requests (PRs), and tracks review statuses. The app ensures that documentation is consistently up-to-date and meets style and technical requirements.

## Features

- **Automated Reminders**: Sends DMs to users to prompt them to create PRs for internal documentation updates.
- **Review Tracking**: Updates the "checked on date" in the internal document.
- **PR Logging**: Logs details of completed tasks in a Google Sheet.
- **Modal Interface**: Provides an interactive Slack modal for users to input PR links and select review requirements.
- **Approval Workflow**: Integrates with GitHub to add style and technical approvers for PRs, ensuring comprehensive reviews.
- **Auto-Merge**: Automatically merges PRs that only update the review date when no changes are needed.

## Installation

1. **Clone the repository**:
   `` git clone https://github.com/drewhinksonn/DocumentChecker.git
   cd DocumentChecker ``

2. **Install dependencies:**
``npm install``

3. **Set up environment variables:** 
- SLACK_BOT_TOKEN=your-slack-bot-token
- GITHUB_TOKEN=your-github-token``

## Usage

1. **Set up Slack**:
    - Create a Slack app in your workspace.
    - Add the necessary permissions (e.g., `chat:write`, `commands`, `users:read`, `users:read.email`).
    - Set the Request URL for the app's interactivity and shortcuts to point to your server's URL (e.g., `https://your-server-url/slack/events`).

2. **Configure GitHub**:
    - Ensure your GitHub repository includes the necessary workflows (`.github/workflows/document_review.yml` and `update_and_create_pr.yml`).

   ## Interacting with DocumentChecker

- Users will receive a DM from DocumentChecker when it's time to review documentation.
- The modal interface allows users to submit PR links and specify if style or technical reviews are required.
- The app will handle the PR creation and logging automatically.

