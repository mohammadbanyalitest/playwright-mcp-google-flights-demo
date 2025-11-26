# 🎭 Playwright MCP Google Flights Demo

> **A comprehensive demonstration repository showcasing how to use Playwright MCP for manual testing of Google Flights**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Playwright MCP](https://img.shields.io/badge/Playwright-MCP-2EAD33.svg)](https://github.com/microsoft/playwright-mcp)
[![VS Code](https://img.shields.io/badge/VS%20Code-GitHub%20Copilot-007ACC.svg)](https://code.visualstudio.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [What is Playwright MCP?](#-what-is-playwright-mcp)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Using the Custom Agent](#-using-the-custom-agent)
- [Demo Walkthrough](#-demo-walkthrough)
- [Benefits for QA Teams](#-benefits-for-qa-teams)
- [Documentation](#-documentation)
- [Prerequisites](#-prerequisites)
- [Support](#-support)

---

## 🎯 Overview

This repository demonstrates the power of **Playwright MCP (Model Context Protocol)** for manual testing workflows. It's designed specifically to help QA managers and manual testers evaluate Playwright MCP as a tool for enhancing testing efficiency and coverage.

**Target Website**: [Google Flights](https://www.google.com/travel/flights?gl=SA&hl=en)

### Who Is This For?

| Audience | Value Proposition |
|----------|-------------------|
| **QA Managers** | Evaluate ROI and team adoption potential |
| **Manual Testers** | Learn AI-assisted testing techniques |
| **Team Leads** | Understand implementation requirements |
| **Stakeholders** | See practical demonstrations of capabilities |

---

## 🤖 What is Playwright MCP?

**Playwright MCP** is a Model Context Protocol server that enables AI assistants (like GitHub Copilot) to interact with web browsers using Playwright. This allows manual testers to:

- 🔍 **Explore websites** using natural language commands
- 📸 **Capture screenshots** and page snapshots automatically
- ✅ **Validate functionality** through AI-assisted testing
- 📝 **Document findings** with detailed observations
- 🎯 **Execute test scenarios** without writing code

### How It Works

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   VS Code +     │────▶│  Playwright     │────▶│   Google        │
│ GitHub Copilot  │     │  MCP Server     │     │   Flights       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │    Natural Language   │   Browser Actions     │
         │    Commands           │   (Click, Type, etc)  │
         └───────────────────────┴───────────────────────┘
```

---

## ✨ Key Features

### 🎭 Custom Playwright Testing Agent
A pre-configured GitHub Copilot custom agent optimized for manual testing workflows with Google Flights.

### 📚 Comprehensive Test Scenarios
Ready-to-use test scenarios covering:
- ✅ Basic flight search (one-way & round-trip)
- ✅ Filtering and sorting options
- ✅ Date selection and calendar interactions
- ✅ Multi-city booking flows
- ✅ Airport autocomplete validation

### 📖 Complete Documentation
- Step-by-step setup guide
- Demo presentation script
- Best practices guide
- Sample agent prompts

### 🎬 Demo-Ready
Perfect for presenting to stakeholders with:
- Presentation scripts
- Talking points
- Q&A preparation

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mohammadbanyalitest/playwright-mcp-google-flights-demo.git
cd playwright-mcp-google-flights-demo
```

### 2. Set Up Playwright MCP

Follow our detailed [Setup Guide](docs/setup-guide.md) to:
- Install VS Code with GitHub Copilot
- Configure Playwright MCP server
- Set up the custom agent

### 3. Start Testing

Open VS Code, activate the Playwright testing agent, and try this prompt:

```
Navigate to Google Flights and explore the main search functionality. 
Take a snapshot and identify the key user interface elements.
```

---

## 🤖 Using the Custom Agent

This repository includes a pre-configured custom agent for GitHub Copilot:

### Activating the Agent

1. Open VS Code with GitHub Copilot Chat
2. In the chat panel, type `@playwright-tester`
3. Give your testing instructions in natural language

### Example Commands

| Task | Prompt |
|------|--------|
| **Explore** | "Navigate to Google Flights and identify the main features" |
| **Search** | "Test a round-trip flight search from JFK to LAX" |
| **Validate** | "Check if the price filter works correctly" |
| **Document** | "Take a screenshot of the current search results" |

### Agent Capabilities

The custom agent can:
- 🌐 Navigate to any webpage
- 🖱️ Click buttons, links, and interactive elements
- ⌨️ Type text into input fields
- 📸 Capture screenshots and snapshots
- 🔍 Analyze page content
- ✅ Validate expected behaviors
- 📝 Generate detailed test reports

See [examples/agent-prompts.md](examples/agent-prompts.md) for more examples.

---

## 🎬 Demo Walkthrough

> 🎥 **Demo Video Coming Soon** - A recorded walkthrough will be added to demonstrate the full capabilities.

### Quick Demo Steps

1. **Open VS Code** with GitHub Copilot enabled
2. **Activate the agent** using `@playwright-tester`
3. **Explore Google Flights**: Ask the agent to navigate and explore
4. **Run a test**: Request a flight search test
5. **Validate results**: Have the agent verify filters and sorting
6. **Capture evidence**: Request screenshots of findings

For a complete demo script, see [docs/demo-script.md](docs/demo-script.md).

---

## 💼 Benefits for QA Teams

### ⏱️ Time Savings

| Manual Task | With Playwright MCP |
|-------------|---------------------|
| Navigate and screenshot | Automated |
| Document test steps | AI-generated |
| Explore edge cases | AI-suggested |
| Create test reports | Streamlined |

### 📈 Improved Coverage

- **AI-assisted exploration** discovers edge cases humans might miss
- **Consistent documentation** across all test sessions
- **Rapid iteration** allows more scenarios to be tested

### 🎯 Reduced Repetitive Work

- No more manual screenshot management
- Automated step documentation
- Reusable test prompts and scenarios

### 📊 Better Documentation

- Detailed page snapshots with element analysis
- Timestamped screenshots
- Clear, actionable test reports

### 💡 ROI Highlights

| Metric | Impact |
|--------|--------|
| Test execution time | 30-50% reduction |
| Documentation time | 60-70% reduction |
| Test coverage | 20-40% increase |
| Onboarding time | 50% faster |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Setup Guide](docs/setup-guide.md) | Complete installation and configuration |
| [Demo Script](docs/demo-script.md) | Presentation-ready demo walkthrough |
| [Best Practices](docs/best-practices.md) | Tips for effective usage |
| [Agent Prompts](examples/agent-prompts.md) | Ready-to-use prompt examples |
| [Sample Session](examples/sample-test-session.md) | Example of a complete test session |

### Test Scenarios

| Scenario | Description |
|----------|-------------|
| [Basic Flight Search](test-scenarios/01-basic-flight-search.md) | One-way and round-trip searches |
| [Filtering & Sorting](test-scenarios/02-filtering-and-sorting.md) | Results filtering options |
| [Date Selection](test-scenarios/03-date-selection.md) | Calendar and date picker tests |
| [Multi-City Booking](test-scenarios/04-multi-city-booking.md) | Complex routing scenarios |
| [Autocomplete](test-scenarios/05-autocomplete-validation.md) | Airport search validation |

---

## 📋 Prerequisites

Before getting started, ensure you have:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **VS Code** | Latest | IDE with GitHub Copilot |
| **GitHub Copilot** | Active subscription | AI assistance |
| **Node.js** | 18+ | Playwright MCP runtime |
| **Playwright MCP** | Latest | Browser automation server |

See the [Setup Guide](docs/setup-guide.md) for detailed installation instructions.

---

## 🆘 Support

### Getting Help

- 📖 Check the [documentation](docs/)
- 🐛 [Report issues](https://github.com/mohammadbanyalitest/playwright-mcp-google-flights-demo/issues)
- 💡 [Suggest improvements](CONTRIBUTING.md)

### Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Ready to transform your manual testing workflow?**

[📘 Start with the Setup Guide](docs/setup-guide.md) | [🎬 View Demo Script](docs/demo-script.md)

</div>
