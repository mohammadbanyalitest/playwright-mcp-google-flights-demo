"""
Agent configuration for "Playwright MCP Copilot" (Python object).
Copy-paste this file into your project and import AgentConfig where you instantiate your agent runtime.

This is a pure configuration object — it does not call any external services.
Adjust fields (model, tools, memory) to match your runtime and policy.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any


@dataclass
class AgentConfig:
    # Basic identity
    name: str = "Universal Web Testing Agent"
    description: str = (
        "An expert Playwright + MCP coding and testing assistant for ANY web application. "
        "Provides Excel-driven data-driven tests and interactive exploratory testing. "
        "Adapts to any website configured in config/deployment.yaml. "
        "Reads/writes testcases.xlsx, captures screenshots, and produces structured test-results."
    )

    # Model and latency / creativity control
    model: str = "claude-sonnet-4.5"  # replace with your runtime model id if different
    temperature: float = 0.08  # low temperature for deterministic, actionable outputs
    max_tokens: int = 4096

    # Memory approach: short-term + rolling summary long-term memory
    memory: Dict[str, Any] = field(default_factory=lambda: {
        "approach": "hybrid",
        "short_term_window": 8,          # number of recent messages retained verbatim for context
        "long_term_summary": True,       # periodically summarize older context to keep history concise
        "summary_interval": 50,          # messages before creating/updating a long-term summary
        "persistence": {
            "enabled": True,
            "store_type": "file",        # options: 'file', 'database', 'vector_db'
            "store_location": "agent_memory/",  # relative path or connection string
            "namespaces": ["projects", "scenarios", "last_runs"]
        }
    })

    # Tools the agent is permitted to use and expected capability mapping.
    # Tool implementations must exist in your runtime and be mapped by name.
    tools: List[str] = field(default_factory=lambda: [
        # Git / GitHub
        "git_status", "git_commit", "git_push", "github_read", "github_write", "github_pr",

        # Files and workspace
        "file_read", "file_write", "file_list", "file_delete",

        # Playwright & MCP specific
        "playwright_test_run", "playwright_install_browsers", "mcp_browser_navigate",
        "mcp_browser_click", "mcp_browser_type", "mcp_browser_snapshot", "mcp_browser_screenshot",

        # Terminal / commands
        "run_command", "run_npm_script",

        # Excel / data handling
        "xlsx_read", "xlsx_write", "csv_read", "csv_write",

        # Reporting & artifacts
        "save_screenshot", "save_report", "upload_artifact",

        # Utilities
        "search_codebase", "open_file", "edit_file", "run_linter",
    ])

    # Policy & style: how the agent should format responses and behave
    style: Dict[str, Any] = field(default_factory=lambda: {
        "tone": "concise professional conversational",
        "voice": "second-person for instructions, active voice",
        "response_structure": [
            "1. Short summary of what I will/do",
            "2. Actionable steps or file contents (copy-pasteable)",
            "3. One-line verification commands",
            "4. Final single-paragraph narration of progress & next step"
        ],
        "file_presentation_rules": {
            "use_file_block_syntax": True,
            "markdown_files_four_backticks": True,
            "include_commit_message_when_writing": True
        },
        "safety": {
            "never_store_secrets": True,
            "image_policy": "no face identification or sensitive attribute inference"
        },
        "max_inline_code_lines": 200
    })

    # Runtime constraints and helpful defaults
    runtime: Dict[str, Any] = field(default_factory=lambda: {
        "headed_by_default": True,   # use headed Playwright runs during development
        "config_file": "config/deployment.yaml",  # read target website and settings
        "default_screenshots_dir": "screenshots",
        "default_results_dir": "test-results",
        "xlsx_testcases_path": "test-scenarios/flight-test-scenarios.xlsx",  # configurable per deployment
        "xlsx_results_sheet": "Results"  # if writing back to XLSX
    })

    def to_dict(self) -> Dict[str, Any]:
        """Serialize config to a plain dict suitable for agent bootstrap."""
        return {
            "name": self.name,
            "description": self.description,
            "model": self.model,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "memory": self.memory,
            "tools": self.tools,
            "style": self.style,
            "runtime": self.runtime,
        }


# Example usage:
# from agent_config import AgentConfig
# config = AgentConfig()
# bootstrap_agent(config.to_dict())
#
# NOTE: Replace bootstrap_agent(...) with your agent runtime initialization call.
if __name__ == "__main__":
    import json
    cfg = AgentConfig()
    print(json.dumps(cfg.to_dict(), indent=2))
