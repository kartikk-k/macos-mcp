# macos-mcp

A comprehensive Model Context Protocol (MCP) server that provides tools for controlling macOS system features via AppleScript. Control your Mac's applications, system settings, and more through a simple interface.

## Features

### Audio Tools
- `get_volume_settings` - Get all volume settings (output, input, alert, mute status)
- `get_volume` - Get current output volume (0-100)
- `set_volume` - Set output volume level
- `is_muted` - Check if audio is muted
- `mute` - Mute audio output
- `unmute` - Unmute audio output
- `toggle_mute` - Toggle mute state
- `beep` - Play system beep sound

### Calendar Tools
- `calendar_list_calendars` - List all calendars
- `calendar_list_events` - List calendar events with date filtering
- `calendar_create_event` - Create new calendar events with location, notes, and more
- `calendar_delete_event` - Delete calendar events by title

### Chrome Tools
- `chrome_get_all_tabs` - List all tabs across all Chrome windows
- `chrome_get_active_tab` - Get the currently active tab
- `chrome_open_url` - Open a URL in a new tab
- `chrome_close_tab` - Close a specific tab
- `chrome_reload_tab` - Reload a specific tab
- `chrome_execute_javascript` - Execute JavaScript in a tab
- `chrome_get_windows` - List all Chrome windows
- `chrome_scroll` - Scroll a page by pixels or to top/bottom

### Contacts Tools
- `contacts_list_people` - List all contacts
- `contacts_create_contact` - Create a new contact with name, email, phone, organization
- `contacts_delete_contact` - Delete a contact
- `contacts_list_groups` - List all contact groups
- `contacts_search` - Search contacts by name, email, or organization
- `contacts_update` - Update existing contact information
- `contacts_add_to_group` - Add a contact to a group

### Finder Tools
- `finder_open_path` - Open files or folders in Finder
- `finder_new_window` - Open a new Finder window
- `finder_get_selection` - Get currently selected items
- `finder_get_current_path` - Get the current Finder directory
- `finder_set_view` - Change Finder view mode
- `finder_search` - Search for files in Finder
- `finder_move_to_trash` - Move files to trash
- `finder_empty_trash` - Empty the trash
- `finder_create_folder` - Create a new folder

### Mail Tools
- `get_mail_accounts` - List configured Apple Mail accounts
- `get_mails` - Get emails from inbox
- `compose_mail` - Compose new email with recipients, subject, body
- `search_mails` - Search emails by subject, sender, or content
- `check_mail` - Check for new mail
- `get_unread_count` - Get unread counts per mailbox
- `get_total_unread_count` - Get total unread count

### Notes Tools
- `notes_list_folders` - List all Notes folders
- `notes_list_notes` - List notes from a folder
- `notes_create_note` - Create a new note (supports HTML)
- `notes_delete_note` - Delete a note
- `notes_update` - Update note content
- `notes_search` - Search notes by title or content
- `notes_create_folder` - Create a new folder
- `notes_move` - Move a note to a different folder
- `notes_get` - Get details of a specific note
- `notes_delete_folder` - Delete a folder
- `notes_get_folder_info` - Get folder information
- `notes_search_in_folder` - Search within a specific folder
- `notes_search_by_title` - Search by title only

### Reminders Tools
- `reminders_get_lists` - Get all reminder lists
- `reminders_get_reminders` - Get reminders from a list
- `reminders_create_reminder` - Create a new reminder with due date and priority
- `reminders_complete_reminder` - Mark a reminder as completed
- `reminders_delete_reminder` - Delete a reminder
- `reminders_update` - Update reminder details
- `reminders_create_list` - Create a new reminder list
- `reminders_delete_list` - Delete a reminder list
- `reminders_search` - Search reminders by title or body

### Safari Tools
- `safari_get_all_tabs` - List all tabs across all Safari windows
- `safari_get_active_tab` - Get the currently active tab
- `safari_open_url` - Open a URL in a new tab
- `safari_close_tab` - Close a specific tab
- `safari_reload_tab` - Reload a specific tab
- `safari_execute_javascript` - Execute JavaScript in a tab
- `safari_get_windows` - List all Safari windows
- `safari_navigate` - Navigate to a URL in the current tab
- `safari_search_web` - Perform a web search
- `safari_go_back` - Navigate back in history
- `safari_go_forward` - Navigate forward in history

### Terminal Tools
- `terminal_get_windows` - List all Terminal windows
- `terminal_get_tabs` - List tabs in a window
- `terminal_execute_command` - Execute a command in a tab
- `terminal_new_window` - Create a new Terminal window
- `terminal_new_tab` - Create a new tab
- `terminal_close_tab` - Close a specific tab
- `terminal_get_current_directory` - Get current working directory
- `terminal_get_contents` - Get terminal output contents
- `terminal_clear` - Clear the terminal screen

## Installation

```bash
npm install -g macos-mcp
# or
bunx macos-mcp
```

## Usage

### Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "macos": {
      "command": "bunx",
      "args": ["macos-mcp"]
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "macos": {
      "command": "macos-mcp"
    }
  }
}
```

### Claude Code

Add to your Claude Code MCP settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "macos": {
      "command": "bunx",
      "args": ["macos-mcp"]
    }
  }
}
```

### Running Directly

```bash
# With bun
bun run macos-mcp

# Or after global install
macos-mcp
```

### Interactive CLI

The project also includes an interactive CLI for testing and manual control:

```bash
# Run the CLI
bun run cli

# Or with npm
npm run cli
```

See [cli/README.md](cli/README.md) for more details on the interactive CLI.

### Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector bunx macos-mcp
```

## Permissions

This MCP server uses AppleScript to control macOS features. You may need to grant permissions:

1. **Accessibility**: System Settings > Privacy & Security > Accessibility
2. **Automation**: System Settings > Privacy & Security > Automation
3. **Application Permissions**: When first accessing apps (Mail, Calendar, Contacts, Notes, Reminders), macOS will prompt for permission

## Project Structure

```
cli/                # Interactive CLI interface
├── audio.ts        # Audio controls
├── calendar.ts     # Calendar management
├── chrome.ts       # Chrome browser control
├── contacts.ts     # Contacts management
├── finder.ts       # Finder operations
├── mail.ts         # Mail operations
├── notes.ts        # Notes management
├── reminders.ts    # Reminders management
├── safari.ts       # Safari browser control
├── terminal.ts     # Terminal control
└── index.ts        # CLI entry point

mcp/                # MCP server
├── index.ts        # Tool definitions and handlers
├── macos-mcp.ts    # MCP server entry point
├── tools/          # Tool definitions
└── handlers/       # Tool handlers

src/                # Core functionality
├── audio/          # Audio control functions
├── calendar/       # Calendar functions
├── chrome/         # Chrome automation
├── contacts/       # Contacts management
├── finder/         # Finder operations
├── mail/           # Apple Mail functions
├── notes/          # Notes functions
├── reminders/      # Reminders functions
├── safari/         # Safari automation
└── terminal/       # Terminal control
```

## Development

### Local Development

```bash
# Clone the repo
git clone https://github.com/kartikk-k/macos-mcp.git
cd macos-mcp

# Install dependencies
bun install

# Run the MCP server
bun run start

# Run the interactive CLI
bun run cli

# Test with inspector
bun run inspector
```

### Adding New Tools

1. Add your function to the appropriate module in `src/`
2. Export it from the module's `index.ts`
3. Add the tool definition to `mcp/tools/{module}.ts`
4. Add the handler in `mcp/handlers/{module}.ts`
5. (Optional) Add CLI interface in `cli/{module}.ts`

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines.

## License

MIT
