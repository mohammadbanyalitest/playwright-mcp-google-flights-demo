# 📚 Best Practices Guide

> Tips and guidelines for effectively using Playwright MCP for manual testing

---

## 📋 Table of Contents

- [Writing Effective Prompts](#-writing-effective-prompts)
- [Structuring Test Explorations](#-structuring-test-explorations)
- [Snapshots vs Screenshots](#-snapshots-vs-screenshots)
- [Organizing Test Findings](#-organizing-test-findings)
- [Common Patterns](#-common-patterns)
- [Dos and Don'ts](#-dos-and-donts)
- [Training Team Members](#-training-team-members)
- [Measuring Effectiveness](#-measuring-effectiveness)

---

## ✍️ Writing Effective Prompts

### The STAR Method for Prompts

Write prompts using the **STAR** method:

| Component | Description | Example |
|-----------|-------------|---------|
| **S**ituation | Current context | "On the Google Flights homepage..." |
| **T**ask | What you want done | "...search for a round-trip flight..." |
| **A**ction | Specific steps if needed | "...from JFK to LAX..." |
| **R**esult | Expected outcome | "...and capture the results page" |

### Good Prompt Examples

✅ **Clear and Specific:**
```
Navigate to Google Flights, enter "New York" as origin, "Los Angeles" as 
destination, select dates for next month (15th departure, 22nd return), 
and click search. Capture a screenshot of the results.
```

✅ **Exploratory with Goals:**
```
Explore the Google Flights filter options. Identify all available filters, 
test the price slider, and document which filters affect the results 
immediately vs requiring a refresh.
```

✅ **Validation Focused:**
```
Test the stops filter by selecting "Nonstop only". Verify that all displayed 
results show 0 stops. Take before and after screenshots.
```

### Poor Prompt Examples

❌ **Too Vague:**
```
Test Google Flights
```
*Problem: No specific task or expected outcome*

❌ **Too Long and Compound:**
```
Test the search, then check filters, then try different dates, then look at 
prices, then try mobile view, then check accessibility, then...
```
*Problem: Too many tasks; break into separate prompts*

❌ **Missing Context:**
```
Click the blue button
```
*Problem: Needs context about which page and which button*

### Prompt Templates

**Basic Navigation:**
```
Navigate to [URL] and take a snapshot of the page. Identify the main 
interactive elements and forms.
```

**Feature Testing:**
```
Test the [feature name] by [specific action]. Document the behavior 
and capture screenshots at each step.
```

**Validation:**
```
Verify that [condition] by [action]. Compare the expected result 
([expected]) with the actual result. Report any discrepancies.
```

**Error Handling:**
```
Test error handling for [scenario] by [action that should cause error]. 
Document the error message and user experience.
```

---

## 🔍 Structuring Test Explorations

### Phase 1: Discovery

Start with broad exploration:

```
Navigate to [URL] and explore the main interface. Identify:
1. Primary user actions (buttons, forms, links)
2. Navigation elements
3. Key content areas
4. Interactive components
```

### Phase 2: Deep Dive

Focus on specific areas:

```
Explore the [specific feature] in detail. Test:
1. Normal usage scenarios
2. Edge cases (empty input, max values)
3. Error conditions
4. State changes
```

### Phase 3: Validation

Verify specific behaviors:

```
Validate that [feature] works correctly by:
1. Setting up [precondition]
2. Performing [action]
3. Verifying [expected result]
4. Documenting any deviations
```

### Test Session Structure

```markdown
## Test Session: [Feature/Area]
**Date:** [Date]
**Tester:** [Name]

### Exploration Phase (15 min)
- Initial page analysis
- Key element identification
- User flow mapping

### Testing Phase (30 min)
- Happy path scenarios
- Edge cases
- Error conditions

### Documentation Phase (15 min)
- Screenshot organization
- Finding documentation
- Report generation
```

---

## 📸 Snapshots vs Screenshots

### When to Use Snapshots

**Page Snapshots** provide structural information:

| Use Case | Reason |
|----------|--------|
| Understanding page structure | Shows all interactive elements |
| Identifying element references | Provides IDs and classes for precise targeting |
| Accessibility review | Shows element roles and labels |
| Form analysis | Lists all input fields and types |

**Example:**
```
Take a page snapshot to identify all clickable elements on the search form
```

### When to Use Screenshots

**Screenshots** provide visual evidence:

| Use Case | Reason |
|----------|--------|
| Visual bug documentation | Shows exactly what user sees |
| Before/after comparisons | Visual proof of changes |
| Stakeholder reports | Easy to understand |
| UI/UX issues | Captures layout and design |

**Example:**
```
Take a screenshot of the search results showing the price filter applied
```

### Combining Both

For comprehensive documentation:

```
First, take a page snapshot to analyze the form structure.
Then, take a screenshot showing the visual state after filling the form.
```

### Quick Reference

| Need | Use |
|------|-----|
| "What elements are on this page?" | Snapshot |
| "What does this look like?" | Screenshot |
| "How should I click this element?" | Snapshot |
| "Show this bug to developers" | Screenshot |
| "List all form fields" | Snapshot |
| "Capture the error message" | Screenshot |

---

## 📁 Organizing Test Findings

### Folder Structure

```
test-results/
├── YYYY-MM-DD/                    # Date-based organization
│   ├── session-notes.md           # Session summary
│   ├── screenshots/               # Visual evidence
│   │   ├── 01-homepage.png
│   │   └── 02-search-results.png
│   └── findings/                  # Detailed findings
│       └── issue-001.md
```

### Finding Documentation Template

```markdown
## Finding: [Brief Title]

**ID:** [YYYY-MM-DD-###]
**Severity:** Critical / High / Medium / Low
**Status:** Open / Investigating / Verified / Closed

### Description
[Clear description of the finding]

### Steps to Reproduce
1. Navigate to [URL]
2. Perform [action]
3. Observe [result]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Evidence
- Screenshot: [link/filename]
- Page snapshot: [if relevant]

### Environment
- Browser: [name and version]
- Date: [when discovered]

### Notes
[Additional observations]
```

### Tagging System

Use consistent tags for easy filtering:

| Tag | Meaning |
|-----|---------|
| `#bug` | Confirmed defect |
| `#ux` | User experience issue |
| `#perf` | Performance concern |
| `#a11y` | Accessibility issue |
| `#edge-case` | Boundary condition |
| `#blocker` | Critical issue |
| `#enhancement` | Improvement suggestion |

---

## 🔄 Common Patterns

### Pattern 1: Form Testing

```
1. Take snapshot of empty form
2. Fill each field one at a time, documenting behavior
3. Test validation by submitting incomplete form
4. Submit complete form and verify result
5. Take screenshot of success/confirmation
```

### Pattern 2: Filter Testing

```
1. Load unfiltered results, capture baseline
2. Apply single filter, verify results change
3. Remove filter, verify results return to baseline
4. Apply multiple filters, verify combination works
5. Clear all filters, verify reset works
```

### Pattern 3: Navigation Testing

```
1. Map all navigation links from homepage
2. Visit each major section
3. Verify breadcrumbs/back navigation
4. Test deep linking (direct URL access)
5. Document any broken or unexpected links
```

### Pattern 4: Error Handling

```
1. Identify input fields
2. Test empty submissions
3. Test invalid data (wrong format, too long)
4. Test special characters
5. Document all error messages
6. Verify error recovery (can user fix and retry?)
```

### Pattern 5: State Management

```
1. Perform action that creates state (fill form, apply filter)
2. Navigate away from page
3. Return to original page
4. Verify state is preserved/cleared as expected
5. Test browser refresh behavior
```

---

## ✅ Dos and Don'ts

### ✅ Do

| Practice | Reason |
|----------|--------|
| Start with exploration | Understand before testing |
| Be specific in prompts | Clear instructions = accurate results |
| Capture evidence early | Don't rely on memory |
| Test one thing at a time | Isolate variables |
| Document as you go | Findings are fresh |
| Save useful prompts | Build a reusable library |
| Verify agent actions | Confirm it did what you asked |

### ❌ Don't

| Anti-Pattern | Problem |
|--------------|---------|
| Skip initial exploration | May miss important elements |
| Write multi-part mega-prompts | Hard to debug failures |
| Assume actions succeeded | Always verify results |
| Forget to screenshot | Evidence is crucial |
| Test without a plan | Unfocused testing misses issues |
| Ignore unexpected behavior | Could be bugs |
| Over-rely on AI interpretation | You're the expert |

---

## 👥 Training Team Members

### Onboarding Curriculum

**Day 1: Basics (2-3 hours)**
1. Introduction to Playwright MCP concepts
2. Setup and configuration
3. First navigation exercise
4. Basic snapshot and screenshot

**Day 2: Practical Skills (2-3 hours)**
1. Writing effective prompts
2. Testing forms and filters
3. Documenting findings
4. Practice session on Google Flights

**Day 3: Advanced Techniques (2-3 hours)**
1. Exploratory testing strategies
2. Edge case identification
3. Combining with existing workflows
4. Creating reusable prompt libraries

### Training Exercises

**Exercise 1: Basic Navigation**
```
Navigate to Google Flights and identify all the main sections of the 
homepage. Take a snapshot and describe what you find.
```

**Exercise 2: Form Interaction**
```
Complete a flight search from any origin to any destination. 
Document each step with screenshots.
```

**Exercise 3: Filter Testing**
```
Test three different filters on the search results. 
Verify each filter actually affects the results.
```

**Exercise 4: Bug Hunting**
```
Try to find unusual or unexpected behavior on Google Flights. 
Document anything that doesn't seem right.
```

### Competency Checklist

- [ ] Can activate the Playwright testing agent
- [ ] Can navigate to a website and take snapshots
- [ ] Can write clear, specific prompts
- [ ] Can execute a basic test scenario
- [ ] Can document findings with evidence
- [ ] Can identify and test edge cases
- [ ] Can organize test results effectively

---

## 📊 Measuring Effectiveness

### Key Metrics

| Metric | How to Measure | Target |
|--------|----------------|--------|
| **Test Execution Time** | Compare time for same test manually vs with agent | 30-50% reduction |
| **Documentation Quality** | Review completeness and clarity | Consistent format, clear steps |
| **Bug Detection Rate** | Bugs found per test session | Maintain or increase |
| **Coverage** | Scenarios tested per session | 20-40% increase |
| **Tester Satisfaction** | Survey feedback | Positive response |

### Tracking Template

```markdown
## Weekly Metrics - Week of [Date]

### Time Tracking
| Test Type | Manual (avg) | With Agent (avg) | Savings |
|-----------|--------------|------------------|---------|
| Basic search | 30 min | 15 min | 50% |
| Filter testing | 45 min | 20 min | 55% |

### Quality Metrics
- Tests executed: [number]
- Bugs found: [number]
- False positives: [number]
- Documentation pages created: [number]

### Feedback
- What worked well:
- What needs improvement:
- New patterns discovered:
```

### Success Indicators

✅ **Positive Signs:**
- Testers voluntarily use the tool
- Documentation quality improves
- More edge cases are discovered
- Test coverage expands
- Onboarding time decreases

⚠️ **Warning Signs:**
- Tool sits unused
- Frequent prompt failures
- Increased testing time
- Complaints about accuracy
- Reverting to manual methods

### Continuous Improvement

1. **Weekly Review**
   - What prompts worked well?
   - What scenarios were challenging?
   - Any new patterns to share?

2. **Monthly Analysis**
   - Review metrics trends
   - Update best practices
   - Share success stories

3. **Quarterly Assessment**
   - ROI calculation
   - Tool satisfaction survey
   - Process improvements

---

<div align="center">

**Master these practices and transform your testing workflow!**

[📘 Setup Guide](setup-guide.md) | [🎬 Demo Script](demo-script.md)

</div>
