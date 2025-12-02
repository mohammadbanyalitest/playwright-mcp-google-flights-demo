# Copilot Instructions for Universal Web Automation Agent

This repository contains a **universal web automation agent** that can be deployed against any web target using Playwright MCP with Excel-driven test data.

## Agent Configuration

The agent is configured through multiple files:

1. **System Prompt**: `agent/system_prompt.md` - Universal template with placeholders
2. **Agent Config**: `agent/agent_config.py` - Python configuration object
3. **Deployment Config**: `config/deployment.yaml` - Target-specific settings

## Deployment Steps

### 1. Configure Your Target

Copy the example deployment configuration and customize:

```bash
cp config/deployment-example.yaml config/deployment.yaml
```

Update target-specific values:
- `target.name` - Your target website name
- `target.url` - Your target website URL
- `target.domain` - Domain type (travel, e-commerce, finance, custom)

### 2. Create Selector Map

Create a selector map for your target based on the template:

```bash
cp config/selectors-template.json config/selectors.json
```

Customize selectors for your target application's DOM structure.

### 3. Define Test Data

Create test data following the schema in `config/data-schema.yaml`:

- **Universal columns**: `scenario_id`, `test_name`, `run` (required for all domains)
- **Domain columns**: Additional columns based on your target domain

### 4. Run Tests

```bash
npm run test:data
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `agent/` | Agent configuration and system prompt |
| `config/` | Deployment, selector, and schema configuration |
| `tests/` | Playwright test files and test data |
| `scripts/` | Utility scripts for Excel handling |
| `screenshots/` | Test evidence and captures |
| `test-results/` | Test execution outputs |

## Configuration Files

| File | Purpose |
|------|---------|
| `config/deployment-example.yaml` | Example deployment configuration |
| `config/selectors-template.json` | Template selector map |
| `config/data-schema.yaml` | Data schema definitions for all domains |

## Supported Domains

The agent supports multiple domain schemas out of the box:

- **Travel**: Flights, hotels, car rentals (trip_type, origin, destination, dates)
- **E-Commerce**: Shopping sites (search, add_to_cart, checkout, apply_coupon)
- **Finance**: Banking applications (balance, transfer, pay_bill)
- **Custom**: Define your own domain-specific columns

## Style Guidelines

- Use concise, professional, conversational tone
- Provide actionable, copy-pasteable code
- Include verification commands with examples
- Follow the selector strategy defined in your deployment configuration
