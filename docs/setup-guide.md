# 📘 Setup Guide

> Complete instructions for setting up Playwright MCP for manual testing with Google Flights

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Step 1: Install VS Code](#-step-1-install-vs-code)
- [Step 2: Set Up GitHub Copilot](#-step-2-set-up-github-copilot)
- [Step 3: Install Node.js](#-step-3-install-nodejs)
- [Step 4: Install Playwright MCP Server](#-step-4-install-playwright-mcp-server)
- [Step 5: Configure VS Code](#-step-5-configure-vs-code)
- [Step 6: Set Up the Custom Agent](#-step-6-set-up-the-custom-agent)
- [Verification](#-verification)
- [Troubleshooting](#-troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have:

| Requirement | Details |
|-------------|---------|
| **Operating System** | Windows 10+, macOS 10.15+, or Linux |
| **Internet Connection** | Required for installation and testing |
| **GitHub Account** | With GitHub Copilot subscription |
| **Admin Access** | To install software on your machine |

---

## 📥 Step 1: Install VS Code

### Download

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Download the version for your operating system
3. Run the installer and follow the prompts

### Verify Installation

Open a terminal and run:

```bash
code --version
```

You should see the version number displayed.

### Recommended Settings

After installation, configure these settings for the best experience:

1. Open VS Code
2. Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac) for Settings
3. Search for and enable:
   - `Editor: Word Wrap` → On
   - `Files: Auto Save` → afterDelay

---

## 🤖 Step 2: Set Up GitHub Copilot

### Install Extensions

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for and install:
   - **GitHub Copilot** (required)
   - **GitHub Copilot Chat** (required)

### Sign In

1. Click the Accounts icon in the bottom-left of VS Code
2. Select "Sign in with GitHub to use GitHub Copilot"
3. Follow the browser prompts to authenticate
4. Return to VS Code

### Verify Copilot is Working

1. Open a new file
2. Start typing a comment like `// function to add two numbers`
3. Copilot should suggest code completion

### Open Copilot Chat

1. Click the Chat icon in the Activity Bar (left side)
2. Or press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)
3. You should see the GitHub Copilot Chat panel

---

## 📦 Step 3: Install Node.js

### Download

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer

### Verify Installation

Open a terminal and run:

```bash
node --version
npm --version
```

You should see version numbers for both. Ensure Node.js is **version 18 or higher**.

### Expected Output

```bash
$ node --version
v20.10.0

$ npm --version
10.2.3
```

---

## 🎭 Step 4: Install Playwright MCP Server

### Option A: Global Installation (Recommended)

Install Playwright MCP globally for easy access:

```bash
npm install -g @anthropic-ai/claude-code-mcp-server-playwright
```

### Option B: Using npx (No Installation)

You can also run it directly with npx:

```bash
npx @anthropic-ai/claude-code-mcp-server-playwright
```

### Verify Installation

Run the following to check if Playwright MCP is installed:

```bash
npx @anthropic-ai/claude-code-mcp-server-playwright --version
```

### Install Browsers

Playwright needs browsers to run tests. Install them with:

```bash
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers.

---

## ⚙️ Step 5: Configure VS Code

### Configure MCP Server

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "MCP"
3. Configure the Playwright MCP server settings

Alternatively, add to your `settings.json`:

```json
{
  "github.copilot.chat.mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/claude-code-mcp-server-playwright"]
    }
  }
}
```

### Access settings.json

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Preferences: Open User Settings (JSON)"
3. Add the configuration above

---

## 🎯 Step 6: Set Up the Custom Agent

### Clone This Repository

```bash
git clone https://github.com/mohammadbanyalitest/playwright-mcp-google-flights-demo.git
cd playwright-mcp-google-flights-demo
```

### Open in VS Code

```bash
code .
```

### Verify Custom Agent

The custom agent is located at:
```
.github/copilot/custom-agents/playwright-tester.md
```

VS Code should automatically detect this custom agent when you open the repository.

### Using the Custom Agent

1. Open GitHub Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`)
2. Type `@playwright-tester` followed by your request
3. The agent will use Playwright MCP to interact with browsers

---

## ✅ Verification

### Test 1: Basic Connection

1. Open Copilot Chat
2. Type: `@playwright-tester Navigate to https://www.google.com and take a screenshot`
3. The agent should:
   - Open a browser
   - Navigate to Google
   - Capture a screenshot

### Test 2: Google Flights

1. In Copilot Chat, type:
   ```
   @playwright-tester Navigate to Google Flights and take a snapshot of the homepage
   ```
2. Verify:
   - Browser opens to Google Flights
   - Page snapshot is captured
   - Agent describes the page elements

### Test 3: Interaction

1. Type:
   ```
   @playwright-tester On Google Flights, click on the origin field and type "JFK"
   ```
2. Verify:
   - Agent clicks the correct field
   - Text is typed
   - Autocomplete suggestions appear

---

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>❌ "MCP server not found" error</strong></summary>

**Solution:**
1. Ensure Node.js is installed: `node --version`
2. Reinstall the MCP server: `npm install -g @anthropic-ai/claude-code-mcp-server-playwright`
3. Restart VS Code

</details>

<details>
<summary><strong>❌ "Browser not installed" error</strong></summary>

**Solution:**
Run the browser installation command:
```bash
npx playwright install
```

</details>

<details>
<summary><strong>❌ GitHub Copilot not responding</strong></summary>

**Solution:**
1. Check your GitHub Copilot subscription is active
2. Sign out and sign back in via the Accounts menu
3. Restart VS Code
4. Check for VS Code and extension updates

</details>

<details>
<summary><strong>❌ Custom agent not appearing</strong></summary>

**Solution:**
1. Ensure you have the repository open in VS Code
2. Check that `.github/copilot/custom-agents/playwright-tester.md` exists
3. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"

</details>

<details>
<summary><strong>❌ Browser opens but doesn't navigate correctly</strong></summary>

**Solution:**
1. Check your internet connection
2. Try navigating to a simpler page first
3. Ensure no firewall is blocking the connection
4. Check for any browser extension conflicts

</details>

### Getting Help

If you're still having issues:

1. Check the [GitHub Issues](https://github.com/mohammadbanyalitest/playwright-mcp-google-flights-demo/issues)
2. Create a new issue with:
   - Your operating system
   - VS Code version
   - Node.js version
   - Error messages (screenshots help!)
   - Steps you've tried

---

## 🎉 Next Steps

Now that you're set up, try these:

1. 📖 Read the [Best Practices Guide](best-practices.md)
2. 🧪 Try the [Basic Flight Search](../test-scenarios/01-basic-flight-search.md) scenario
3. 📝 Review [Sample Agent Prompts](../examples/agent-prompts.md)
4. 🎬 Follow the [Demo Script](demo-script.md) for a guided walkthrough

---

<div align="center">

**Setup Complete! Ready to test?**

[📖 Best Practices](best-practices.md) | [🧪 Test Scenarios](../test-scenarios/)

</div>
