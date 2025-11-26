# 🤝 Contributing to Playwright MCP Google Flights Demo

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Adding New Test Scenarios](#-adding-new-test-scenarios)
- [Improving Documentation](#-improving-documentation)
- [Sharing Findings](#-sharing-findings)
- [Submitting Changes](#-submitting-changes)
- [Style Guidelines](#-style-guidelines)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow:

- **Be respectful**: Treat everyone with respect and consideration
- **Be inclusive**: Welcome newcomers and help them learn
- **Be constructive**: Provide helpful feedback and suggestions
- **Be collaborative**: Work together to improve the project

---

## 🎯 How Can I Contribute?

### 🐛 Reporting Issues

If you find a bug or have a suggestion:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with a clear title and description
3. **Include details** such as:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (VS Code version, Node.js version)

### 💡 Suggesting Enhancements

Have an idea to improve the demo?

1. **Open an issue** labeled as "enhancement"
2. **Describe the improvement** and its benefits
3. **Provide examples** if possible

### 📝 Documentation Improvements

Documentation can always be improved:

- Fix typos or grammatical errors
- Clarify confusing sections
- Add missing information
- Improve formatting

---

## 🧪 Adding New Test Scenarios

We welcome new test scenarios! Here's how to add one:

### 1. Create a New File

Create a new file in `test-scenarios/` following the naming convention:

```
test-scenarios/XX-descriptive-name.md
```

Where `XX` is the next sequential number.

### 2. Use the Template

Follow this structure for consistency:

```markdown
# [Scenario Name]

## 🎯 Test Objective

[Clear description of what this scenario tests]

## 📋 Preconditions

- [Required state before testing]
- [Any setup needed]

## 📊 Test Data

| Data Point | Value |
|------------|-------|
| [Field]    | [Value] |

## 📝 Test Steps

### Step 1: [Description]

**Agent Prompt:**
```
[Example prompt for the agent]
```

**Expected Result:**
[What should happen]

## ✅ Validation Points

- [ ] [Check item 1]
- [ ] [Check item 2]

## ⚠️ Edge Cases

- [Edge case 1]
- [Edge case 2]

## 🐛 Known Issues

[Any known issues to be aware of]
```

### 3. Update the README

Add your new scenario to the test scenarios table in the main README.

---

## 📚 Improving Documentation

### Setup Guide Improvements

When updating `docs/setup-guide.md`:

- Ensure steps are accurate and complete
- Include screenshots for complex steps
- Test all commands before submitting
- Note any version-specific requirements

### Demo Script Updates

When updating `docs/demo-script.md`:

- Time new sections appropriately
- Include practical examples
- Ensure prompts work as described
- Add Q&A items for common questions

### Best Practices

When updating `docs/best-practices.md`:

- Base recommendations on actual experience
- Provide concrete examples
- Explain the "why" behind each practice
- Include anti-patterns to avoid

---

## 🔍 Sharing Findings

### Discoveries During Testing

If you discover something interesting while testing:

1. **Document the finding** clearly
2. **Include reproduction steps**
3. **Add to relevant test scenario** or create a new one
4. **Share insights** that could help others

### Sample Format

```markdown
## Finding: [Brief Description]

**Date:** [Date discovered]
**Scenario:** [Which test scenario]

### Description
[What you discovered]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]

### Impact
[Why this matters]

### Recommendations
[What to do about it]
```

---

## 📤 Submitting Changes

### 1. Fork the Repository

```bash
git clone https://github.com/your-username/playwright-mcp-google-flights-demo.git
cd playwright-mcp-google-flights-demo
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-accessibility-scenario`
- `docs/improve-setup-guide`
- `fix/correct-prompt-example`

### 3. Make Your Changes

- Follow the style guidelines below
- Test your changes if applicable
- Update related documentation

### 4. Commit Your Changes

```bash
git add .
git commit -m "Brief description of changes"
```

Use clear commit messages:
- ✅ "Add mobile responsive testing scenario"
- ✅ "Fix typo in setup guide"
- ❌ "Updated stuff"

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what and why
- Link to related issues if any

---

## 📝 Style Guidelines

### Markdown Formatting

- Use proper heading hierarchy (H1 → H2 → H3)
- Include a table of contents for long documents
- Use code blocks with language specification
- Use tables for structured data
- Use emojis sparingly for visual interest

### Writing Style

- Use clear, concise language
- Write in second person for instructions ("You will...")
- Use active voice
- Include practical examples
- Define acronyms on first use

### File Organization

- Keep related content together
- Use consistent naming conventions
- Follow the existing directory structure
- Link to related documents

### Code and Prompt Examples

Always use code blocks:

````markdown
```
Your agent prompt here
```
````

Include expected outputs when helpful.

---

## 🙏 Thank You!

Your contributions help make this project better for everyone. Whether it's fixing a typo or adding a comprehensive test scenario, every contribution is valuable.

If you have questions about contributing, feel free to open an issue for discussion.

---

<div align="center">

**Happy Contributing!** 🎉

</div>
