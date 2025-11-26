# 📸 Screenshots Directory

This directory is used to store screenshots captured during testing sessions.

## 📋 About This Directory

Screenshots taken by the Playwright MCP agent during testing will be saved here. These files are **gitignored** to keep the repository size manageable.

## 🗂️ Organization

When saving screenshots locally, we recommend the following organization:

```
screenshots/
├── YYYY-MM-DD/                    # Date-based folders
│   ├── flight-search/             # Feature-based subfolders
│   │   ├── 001-homepage.png
│   │   ├── 002-search-form.png
│   │   └── 003-results.png
│   └── filtering/
│       ├── 001-before-filter.png
│       └── 002-after-filter.png
└── issues/                        # Screenshots of bugs/issues
    └── issue-123-date-picker.png
```

## 📝 Naming Conventions

Use descriptive names that indicate:
- **Sequence number** (if part of a flow): `001-`, `002-`
- **Feature/Page**: `homepage`, `search-results`, `booking`
- **State/Action**: `before-filter`, `after-submit`, `error-state`

### Examples

| Screenshot | Description |
|------------|-------------|
| `001-homepage-loaded.png` | Initial homepage state |
| `002-search-filled.png` | Search form with data entered |
| `003-results-displayed.png` | Search results shown |
| `error-invalid-date.png` | Error message for invalid date |
| `filter-price-slider.png` | Price filter interaction |

## 🔧 Configuration

Screenshots are ignored via `.gitignore`:

```
screenshots/
*.png
*.jpg
*.jpeg
```

## 💡 Tips

1. **Be Descriptive**: Use meaningful names so you can find screenshots later
2. **Organize by Date**: Create date-based folders for each testing session
3. **Document Issues**: Save screenshots of bugs with clear names
4. **Clean Up**: Periodically remove old screenshots you no longer need
5. **Back Up Important Ones**: Keep copies of critical evidence elsewhere

## 🚀 Getting Started

This directory is empty by default. When you run testing sessions with the Playwright MCP agent:

1. Screenshots will be saved here automatically
2. You can also manually specify screenshot locations
3. Remember to organize them using the conventions above

---

> 💡 **Note**: This README file is the only file committed to this directory. All screenshot files are gitignored.
