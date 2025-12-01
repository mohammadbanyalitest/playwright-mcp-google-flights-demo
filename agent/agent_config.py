"""Agent configuration for Playwright MCP Copilot."""


class AgentConfig:
    """Configuration class for the Playwright MCP Copilot agent."""

    # Working directories
    screenshot_dir: str = "screenshots"
    results_dir: str = "test-results"
    logs_dir: str = "logs"

    # Test data files
    testcases_xlsx: str = "tests/testcases.xlsx"
    testcases_csv: str = "tests/testcases.csv"

    # Workflow configuration
    workflow_doc: str = "agent/workflow.md"

    # Execution defaults
    default_browser: str = "chromium"
    headed_mode: bool = True
    timeout_ms: int = 30000

    def to_dict(self) -> dict:
        """Convert configuration to dictionary."""
        return {
            "screenshot_dir": self.screenshot_dir,
            "results_dir": self.results_dir,
            "logs_dir": self.logs_dir,
            "testcases_xlsx": self.testcases_xlsx,
            "testcases_csv": self.testcases_csv,
            "workflow_doc": self.workflow_doc,
            "default_browser": self.default_browser,
            "headed_mode": self.headed_mode,
            "timeout_ms": self.timeout_ms,
        }
