# 🎬 Demo Script

> A presentation-ready script for demonstrating Playwright MCP to QA managers and stakeholders

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Before the Demo](#-before-the-demo)
- [Introduction (2-3 minutes)](#-introduction-2-3-minutes)
- [Live Demo (10-15 minutes)](#-live-demo-10-15-minutes)
- [Benefits Summary (3-5 minutes)](#-benefits-summary-3-5-minutes)
- [Q&A Preparation](#-qa-preparation)
- [Talking Points](#-talking-points)
- [Next Steps](#-next-steps)

---

## 🎯 Overview

**Demo Duration:** 20-25 minutes total
**Target Audience:** QA Managers, Team Leads, Stakeholders
**Goal:** Demonstrate the value of Playwright MCP for manual testing workflows

### What You'll Demonstrate

1. ✅ AI-assisted website exploration
2. ✅ Natural language test execution
3. ✅ Automatic screenshot and documentation
4. ✅ Filter and validation testing
5. ✅ Finding and documenting issues

---

## 📝 Before the Demo

### Checklist

- [ ] VS Code is installed and updated
- [ ] GitHub Copilot is signed in and working
- [ ] Playwright MCP is configured correctly
- [ ] This repository is cloned and open
- [ ] Internet connection is stable
- [ ] Close unnecessary applications (to avoid notifications)
- [ ] Increase font size in VS Code for visibility
- [ ] Test the setup with a quick navigation

### Recommended Settings

```
VS Code Font Size: 16-18px
Terminal Font Size: 14-16px
Zoom Level: 120-150%
```

### Pre-Demo Test

Run this quick test to ensure everything works:

```
@playwright-tester Navigate to Google Flights and take a snapshot
```

---

## 🎤 Introduction (2-3 minutes)

### Opening Statement

> "Today I'm going to show you Playwright MCP - a tool that transforms how manual testers can interact with web applications. Instead of clicking through repetitive tasks, testers can use natural language to explore, test, and document their findings."

### Key Points to Cover

1. **What is Playwright MCP?**
   > "Playwright MCP is a Model Context Protocol server that allows AI assistants like GitHub Copilot to control web browsers. This means testers can describe what they want to test in plain English."

2. **Why does this matter?**
   > "Manual testing often involves repetitive navigation, screenshot capture, and documentation. Playwright MCP automates these tasks while keeping the tester in control of the testing strategy."

3. **What you'll see today**
   > "I'll demonstrate how a manual tester can explore Google Flights, execute test scenarios, capture evidence, and document findings - all through natural language commands."

---

## 🖥️ Live Demo (10-15 minutes)

### Part 1: Activating the Agent (1-2 min)

**Action:** Open GitHub Copilot Chat

**Say:**
> "First, let me show you how to access the Playwright testing agent. I simply open the Copilot Chat panel and type @playwright-tester to activate our custom testing agent."

**Demo:**
1. Click the Chat icon in VS Code
2. Show the `@playwright-tester` mention
3. Explain: "This custom agent is configured specifically for testing workflows"

---

### Part 2: Exploring Google Flights (2-3 min)

**Prompt:**
```
Navigate to Google Flights at https://www.google.com/travel/flights?gl=SA&hl=en and explore the main features. Take a snapshot and describe the key user interface elements.
```

**Say:**
> "Watch how the agent navigates to Google Flights and automatically analyzes the page structure. It will identify interactive elements, forms, and navigation options."

**Points to Highlight:**
- Browser opens automatically
- Page is analyzed structurally (not just visually)
- Agent identifies form fields, buttons, filters
- Documentation is generated automatically

**Transition:**
> "Now that we understand the interface, let's run an actual test."

---

### Part 3: Basic Flight Search Test (3-4 min)

**Prompt:**
```
Test a round-trip flight search from JFK (New York) to LAX (Los Angeles). 
Select dates for next month. Document each step and capture screenshots of the results.
```

**Say:**
> "Notice how I can describe the test in plain English. The agent will handle the mechanics - clicking the right fields, typing the text, selecting dates - while I focus on what to test."

**Points to Highlight:**
- Agent handles autocomplete selections
- Dates are selected through the calendar
- Search is executed
- Results are displayed
- Screenshots are captured automatically

**Pause Points:**
- When autocomplete appears: "See how it handles the autocomplete suggestions"
- When calendar opens: "The agent navigates the date picker naturally"
- When results load: "Results are now displayed - let's validate them"

---

### Part 4: Filter Validation (2-3 min)

**Prompt:**
```
Apply the "Nonstop only" filter and verify that all results shown are nonstop flights. Take a screenshot before and after applying the filter.
```

**Say:**
> "A common testing task is validating that filters work correctly. Let's test the stops filter and verify the results actually change."

**Points to Highlight:**
- Agent locates the filter controls
- Before/after screenshots are captured
- Results are validated against the filter
- Discrepancies would be reported

**Say after completion:**
> "The agent not only applied the filter but verified that the results match. This kind of validation would take a manual tester several minutes to document properly."

---

### Part 5: Screenshot and Snapshot Capabilities (1-2 min)

**Prompt:**
```
Take a full-page screenshot of the current results, then take a page snapshot to show the data structure.
```

**Say:**
> "Let me show the difference between screenshots and snapshots. Screenshots capture what users see. Snapshots capture the underlying structure - useful for understanding interactive elements."

**Points to Highlight:**
- Visual screenshot vs structural snapshot
- Snapshots help identify elements for future tests
- Both are valuable for documentation

---

### Part 6: Finding an Issue (2-3 min)

**Prompt:**
```
Test what happens if I try to set the return date before the departure date. Document the error handling behavior.
```

**Say:**
> "Good testing includes checking error handling. Let's see how Google Flights handles an invalid date selection."

**Points to Highlight:**
- Edge case testing is natural to describe
- Agent documents the behavior observed
- Findings are captured with evidence
- Could be a bug or expected behavior

**Discuss:**
> "This is where manual testing expertise is still valuable - the tester decides what to test and interprets the results. The AI handles the mechanics."

---

## 📊 Benefits Summary (3-5 minutes)

### Time Savings

| Task | Traditional | With Playwright MCP |
|------|-------------|---------------------|
| Navigate and document | 5-10 min | 1-2 min |
| Capture screenshots | Manual each time | Automatic |
| Write test steps | 10-15 min | Generated |
| Execute filter tests | 15-20 min | 3-5 min |

**Say:**
> "Our estimates show testers can save 40-60% of time on documentation and repetitive navigation tasks."

### Improved Test Coverage

> "Because the agent handles the mechanics, testers can focus on thinking about edge cases. In our demo, we tested dates, filters, autocomplete - and we could have explored mobile views, accessibility, error handling, and more in the same time."

### Better Documentation

> "Every action is documented. Screenshots are captured automatically. Test reports can be generated from the session. This creates consistent, comprehensive documentation across the team."

### Reduced Repetitive Work

> "The prompts we used today can be saved and reused. New testers can start with proven prompts. Common scenarios become templates."

### Key ROI Points

| Metric | Expected Impact |
|--------|-----------------|
| Test execution time | 30-50% reduction |
| Documentation time | 60-70% reduction |
| Test coverage | 20-40% increase |
| Onboarding time | 50% faster |

---

## ❓ Q&A Preparation

### Common Questions and Answers

<details>
<summary><strong>Q: Does this replace manual testers?</strong></summary>

**A:** No, it augments them. The tool handles repetitive mechanics (clicking, typing, documenting), but testers still provide:
- Testing strategy and priorities
- Edge case identification
- Result interpretation
- Bug analysis and reproduction
- Exploratory testing creativity

The tester becomes more productive, not replaced.
</details>

<details>
<summary><strong>Q: How much does it cost?</strong></summary>

**A:** The main cost is GitHub Copilot subscription (currently ~$19/month per user). Playwright MCP itself is free and open source. ROI typically shows positive within 1-2 months based on time savings.
</details>

<details>
<summary><strong>Q: How long to train the team?</strong></summary>

**A:** Basic proficiency: 2-4 hours
Effective usage: 1-2 days
Advanced patterns: 1-2 weeks

The learning curve is gentle because testers describe tests in natural language.
</details>

<details>
<summary><strong>Q: Does it work with our internal applications?</strong></summary>

**A:** Yes, Playwright MCP works with any web application. It uses standard browser automation. Internal applications may need VPN or authentication setup, but the core functionality is the same.
</details>

<details>
<summary><strong>Q: What about test automation?</strong></summary>

**A:** Playwright MCP is for manual/exploratory testing. It complements automated test suites by:
- Helping testers explore before writing automation
- Covering scenarios that are hard to automate
- Providing quick ad-hoc testing
- Generating ideas for new automated tests
</details>

<details>
<summary><strong>Q: Is it secure? Does data leave our network?</strong></summary>

**A:** The browser runs locally on the tester's machine. Test interactions stay local. Copilot queries go to GitHub (same as any Copilot usage). Sensitive data handling follows your existing Copilot policies.
</details>

<details>
<summary><strong>Q: What browsers does it support?</strong></summary>

**A:** Playwright supports Chromium, Firefox, and WebKit (Safari engine). You can test cross-browser compatibility using the same prompts.
</details>

---

## 💬 Talking Points

### For Budget Conversations

> "Each tester could save 10-15 hours per week on documentation and repetitive tasks. That's 40-60 hours per month of additional testing capacity without additional headcount."

### For Risk Discussions

> "This is additive technology. We're not changing our testing process, just making it more efficient. If it doesn't work for certain scenarios, testers can always fall back to traditional methods."

### For Team Adoption

> "The learning curve is minimal because testers describe tests in natural language. We can start with a small pilot group and expand based on results."

### For Technical Concerns

> "Playwright is used by major companies including Microsoft, Google, and Netflix for their testing needs. The MCP integration is built on this proven foundation."

---

## 🚀 Next Steps

### Pilot Program Proposal

1. **Week 1-2: Setup and Training**
   - Install and configure for 2-3 pilot testers
   - Conduct training session
   - Provide this repository as a reference

2. **Week 3-4: Pilot Testing**
   - Use on real testing tasks
   - Document time savings and challenges
   - Collect feedback

3. **Week 5: Review and Decision**
   - Analyze pilot results
   - Present findings to stakeholders
   - Decide on broader rollout

### Resources to Share

- This repository (clone for the team)
- [Setup Guide](setup-guide.md)
- [Best Practices](best-practices.md)
- [Test Scenarios](../test-scenarios/)

### Follow-Up Actions

- [ ] Schedule pilot program kickoff
- [ ] Identify pilot participants
- [ ] Set success metrics
- [ ] Plan training session
- [ ] Create feedback collection process

---

## 📝 Demo Notes Template

Use this template to record notes during/after the demo:

```markdown
## Demo Notes - [Date]

### Attendees
- 

### Questions Asked
1. 
2. 

### Concerns Raised
- 

### Interest Level (1-5): 

### Next Steps Agreed
- 

### Follow-Up Items
- [ ] 
```

---

<div align="center">

**Good luck with your demo!** 🎉

[📖 Setup Guide](setup-guide.md) | [📚 Best Practices](best-practices.md)

</div>
