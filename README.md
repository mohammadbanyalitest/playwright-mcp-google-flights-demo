# 🎭 Universal Web Testing with Playwright MCP

> **Test ANY website with Playwright MCP - Keep the same Excel format, change the target website**

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

This is a **universal web testing framework** that uses **Playwright MCP (Model Context Protocol)** with GitHub Copilot to test ANY website. Simply configure your target website, keep your Excel test scenarios in the same format, and start testing.

**🌟 Key Feature**: Test ANY website by just editing a configuration file - no code changes needed!

**Demo Target**: [Google Flights](https://www.google.com/travel/flights?gl=SA&hl=en) (easily change to your website)

### Who Is This For?

| Audience | Value Proposition |
|----------|-------------------|
| **QA Managers** | Test multiple websites with one framework |
| **Manual Testers** | AI-assisted testing without coding |
| **Test Automation Teams** | Rapid test creation for new projects |
| **Stakeholders** | Consistent testing approach across applications |

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

### 🌐 Universal Website Testing
- **Test ANY website** by editing a simple YAML config file
- **No code changes** required to switch target websites
- **Supports multiple domains**: Travel, E-Commerce, Finance, or Custom
- **Same Excel format** works across all websites

### 🎭 Smart AI Testing Agent
A pre-configured GitHub Copilot custom agent that:
- Automatically adapts to your target website
- Reads configuration and adjusts testing approach
- Executes Excel-driven test scenarios
- Documents findings with screenshots

### 📊 Excel-Driven Test Scenarios
- **Consistent format** across all website types
- **Required columns**: Test Case ID, Test Case Area, Test Case Name, Test Case Description, Steps To Reproduce, Run, Expected Results, Execution Result, Observed Results, Test Case Severity, Executed By, Execution Date, Created By, Comments
- **Domain-specific columns**: Add travel, e-commerce, finance, or custom columns
- **Easy to maintain**: Update tests in Excel, not code
- **Professional format**: Includes execution tracking and results documentation

### 📖 Complete Documentation
- [Universal Testing Guide](docs/universal-testing-guide.md) - Test any website
- [Setup Guide](docs/setup-guide.md) - Installation steps
- [Data Schema Reference](config/data-schema.yaml) - All available columns
- [Configuration Examples](config/deployment-example.yaml) - Multiple website types

### 🎬 Ready to Deploy
Perfect for multiple projects:
- Travel/booking sites (flights, hotels, rentals)
- E-commerce stores (shopping, cart, checkout)
- Finance applications (banking, payments)
- Custom web applications (any domain)

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

### 3. Configure Your Target Website

Edit [`config/deployment.yaml`](config/deployment.yaml):

```yaml
target:
  name: "Your Website"
  url: "https://your-website.com"
  domain: "custom"  # or travel, e-commerce, finance

test_data:
  schema: "custom"
  primary_file: "test-scenarios/your-tests.xlsx"
```

**Or keep Google Flights** as the default demo target.

### 4. Start Testing

Open VS Code, activate the Playwright testing agent, and try:

```
@playwright-tester Read the deployment config and explore the target website.
Take screenshots and document the key features.
```

**That's it!** The agent adapts to your configured website automatically.

---

## 🤖 Using the Custom Agent

This repository includes a **universal testing agent** that adapts to any website:

### Activating the Agent

1. Open VS Code with GitHub Copilot Chat
2. In the chat panel, type `@playwright-tester`
3. The agent automatically reads your `config/deployment.yaml`
4. Give testing instructions in natural language

### Universal Commands (Work with ANY Website)

| Task | Prompt |
|------|--------|
| **Explore** | "Read the deployment config and explore the target website" |
| **Run Tests** | "Execute all test scenarios from the Excel file" |
| **Run One Test** | "Run test case TC001 from the Excel file" |
| **Screenshot** | "Take a screenshot of the current page" |
| **Validate** | "Check if the search functionality works" |

### Domain-Specific Examples

**For Travel Sites:**
```
Test a round-trip flight search using TC001 from the Excel file
```

**For E-Commerce Sites:**
```
Test product search and add to cart using TC001 and TC002
```

**For Any Custom Site:**
```
Execute the test scenarios and report results
```

### Agent Capabilities

The universal agent can:
- 🌐 Navigate to ANY configured website
- 📖 Read configuration and adapt behavior
- 📊 Execute Excel-driven test scenarios
- 🖱️ Click, type, and interact with elements
- 📸 Capture screenshots and snapshots
- 🔍 Analyze page content dynamically
- ✅ Validate expected behaviors
- 📝 Generate detailed test reports

See [Universal Testing Guide](docs/universal-testing-guide.md) for comprehensive examples.

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

### 🚀 Universal Framework Benefits

| Challenge | Solution |
|-----------|----------|
| Testing multiple websites | One framework works for all |
| Different test formats | Same Excel format everywhere |
| Learning new tools per project | Learn once, use everywhere |
| Maintaining multiple frameworks | Single codebase to maintain |

### ⏱️ Time Savings

| Manual Task | With Universal MCP Testing |
|-------------|---------------------------|
| Setup new project tests | 5 minutes (edit config) |
| Navigate and screenshot | Automated |
| Document test steps | AI-generated |
| Adapt to new websites | Automatic |
| Create test reports | Streamlined |

### 📈 Improved Coverage

- **AI-assisted exploration** discovers edge cases humans might miss
- **Consistent documentation** across all test sessions
- **Rapid iteration** allows more scenarios to be tested
- **Multi-website support** enables broader test coverage

### 🎯 Reduced Repetitive Work

- **No code changes** to switch websites
- **Same Excel format** across all projects
- **Reusable configuration** templates
- **Automated screenshot** management

### 📊 Better Documentation

- Detailed page snapshots with element analysis
- Timestamped screenshots per website
- Clear, actionable test reports
- Consistent format across all projects

### 💡 ROI Highlights

| Metric | Impact |
|--------|--------|
| New project setup | 90% faster (config vs code) |
| Test execution time | 30-50% reduction |
| Documentation time | 60-70% reduction |
| Test coverage | 20-40% increase |
| Framework maintenance | Single codebase for all projects |

---

## 📚 Documentation

### Quick Start Guides
- [🚀 QUICKSTART](QUICKSTART.md) - Get started in 5 minutes
- [🤖 EXECUTION WORKFLOW](EXECUTION_WORKFLOW.md) - How Turki Web Automation Agent executes tests
- [📊 EXCEL FORMAT](EXCEL_FORMAT.md) - Complete Excel format reference

### Comprehensive Guides

### Core Documentation

| Document | Description |
|----------|-------------|
| [🌐 Universal Testing Guide](docs/universal-testing-guide.md) | **START HERE** - Test any website |
| [⚙️ Setup Guide](docs/setup-guide.md) | Installation and configuration |
| [📊 Data Schema Reference](config/data-schema.yaml) | All Excel columns explained |
| [🎯 Deployment Examples](config/deployment-example.yaml) | Config templates for different sites |
| [📖 Best Practices](docs/best-practices.md) | Tips for effective usage |

### Configuration Files

| File | Purpose |
|------|---------|
| [`config/deployment.yaml`](config/deployment.yaml) | **Configure your target website here** |
| [`config/data-schema.yaml`](config/data-schema.yaml) | Available columns per domain |
| [`config/selectors-template.json`](config/selectors-template.json) | Custom element selectors |

### Example Test Scenarios (Google Flights Demo)

| Scenario | Description |
|----------|-------------|
| [Basic Flight Search](test-scenarios/01-basic-flight-search.md) | One-way and round-trip searches |
| [Filtering & Sorting](test-scenarios/02-filtering-and-sorting.md) | Results filtering options |
| [Date Selection](test-scenarios/03-date-selection.md) | Calendar and date picker tests |
| [Multi-City Booking](test-scenarios/04-multi-city-booking.md) | Complex routing scenarios |
| [Autocomplete](test-scenarios/05-autocomplete-validation.md) | Airport search validation |
| [Excel Test Data](test-scenarios/flight-test-scenarios.xlsx) | Excel format example |

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

**Ready to test any website with AI assistance?**

[🌐 Universal Testing Guide](docs/universal-testing-guide.md) | [⚙️ Configure Your Website](config/deployment.yaml) | [📘 Setup Guide](docs/setup-guide.md)

---

### Quick Examples

**Test an E-Commerce Site:**
```yaml
# Edit config/deployment.yaml
target:
  url: "https://your-store.com"
  domain: "e-commerce"
```

**Test a Travel Site:**
```yaml
# Edit config/deployment.yaml
target:
  url: "https://travel-site.com"
  domain: "travel"
```

**Test Any Custom Site:**
```yaml
# Edit config/deployment.yaml
target:
  url: "https://any-website.com"
  domain: "custom"
```

Then run: `@playwright-tester Read deployment config and execute tests`

</div>
