# Copilot Instructions for Playwright MCP Google Flights Demo

This repository demonstrates Playwright MCP for manual testing of Google Flights with Excel-driven data.

## Agent Configuration
The agent configuration is defined in `agent/agent_config.py`. When working with this codebase:

1. **Testing Approach**: Use Excel files (`.xlsx`) for test data, located in `tests/testcases.xlsx`
2. **Screenshots**: Save to `screenshots/` directory
3. **Test Results**: Output to `test-results/` directory
4. **Headed Mode**: Default to headed Playwright runs during development

## Key Directories
- `agent/` - Agent configuration and system prompt
- `tests/` - Playwright test files and test data
- `scripts/` - Utility scripts for Excel handling
- `screenshots/` - Test evidence and captures
- `test-results/` - Test execution outputs

## Style Guidelines
- Use concise, professional, conversational tone
- Provide actionable, copy-pasteable code
- Include verification commands with examples
