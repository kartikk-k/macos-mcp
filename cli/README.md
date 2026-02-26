# macOS MCP - Interactive CLI

An interactive command-line interface for testing and manually controlling macOS system features via AppleScript. This CLI provides a menu-driven interface to access all the functionality available in the MCP server.

## Installation

The CLI is included with the macos-mcp package. Install the project dependencies:

```bash
bun install
```

## Running the CLI

```bash
# Using bun
bun run cli

# Or with npm
npm run cli
```

## Features

The CLI provides interactive menus for all macOS system integrations:

### Audio Controls
- View and adjust system volume (0-100%)
- Volume up/down in 10% increments
- Mute/unmute audio output
- View current mute status
- Play system beep sounds

### Calendar Management
- List all calendars
- View upcoming events
- Create new events with:
  - Title, start/end dates
  - Location and description
  - All-day event support
- Delete events by title

### Chrome Browser Control
- **Tabs**: List all tabs, get active tab, open URLs, close/reload tabs
- **Windows**: List windows, create new windows, focus/close windows
- **Navigation**: Back/forward navigation, scroll pages
- **JavaScript**: Execute custom JavaScript in tabs
- **Page Info**: Get page title, URL, content

### Contacts Management
- List all contacts
- Search contacts by name, email, or organization
- Create new contacts with:
  - Name, email, phone
  - Organization details
- Update existing contacts
- Delete contacts
- List and manage contact groups
- Add contacts to groups

### Finder Operations
- Open files and folders
- Create new Finder windows
- Get current path and selection
- Change view modes (icon, list, column, gallery)
- Search for files
- Create folders
- Move items to trash
- Empty trash

### Mail Operations
- View all mail accounts
- Read emails from inbox
- Compose and send emails with:
  - Multiple recipients (To, CC, BCC)
  - Subject and body
  - Send immediately or save as draft
- Search emails by:
  - Subject
  - Sender
  - Content
- Check for new mail
- View unread counts

### Notification Controls
- **Basic Notifications**: Send simple notifications with title, message, subtitle, and sound
- **Interactive Dialogs**: Display dialogs with custom action buttons (Accept/Reject, etc.)
- **Alerts**: Show prominent alerts with action buttons for important confirmations
- **Text Input**: Prompt users for text input with customizable buttons
- **Password Input**: Request hidden text input for sensitive information
- **Custom Options**: Configure timeouts, button labels, and default selections

### Notes Management
- **Notes**: List, view, create, update, delete notes
- **Folders**: List, create, delete folders
- **Search**: Search by title or content, search within specific folders
- **Organization**: Move notes between folders
- HTML content support

### Reminders Management
- **Reminders**: List, create, complete, update, delete reminders
- **Lists**: View, create, delete reminder lists
- **Search**: Find reminders by title or body
- **Details**: Set due dates, priorities (0-9), and notes

### Safari Browser Control
- **Tabs**: List all tabs, get active tab, open/close/reload tabs
- **Windows**: List windows, create new windows, focus/close windows
- **Navigation**: Navigate to URLs, search web, go back/forward
- **Page Actions**: Get page title, URL, text, source; scroll to top/bottom
- **JavaScript**: Execute custom JavaScript in tabs

### Terminal Control
- **Windows**: List, create, focus, close Terminal windows
- **Tabs**: List tabs, get active tab, create/close tabs
- **Commands**: Execute commands in active or specific tabs
- **Session Info**: Get current directory, running processes, busy status
- **Properties**: Get terminal contents, selected text, settings; clear screen; set profile

## Navigation

The CLI uses an intuitive menu system:

- **Arrow keys**: Navigate between options
- **Enter**: Select an option
- **Type**: Enter text when prompted
- **"< Back"**: Return to previous menu
- **"Exit"**: Close the application

## Examples

### Example Session

```
AppleScript CLI - Navigate with arrow keys

? What would you like to do? (Use arrow keys)
❯ Audio
  Calendar
  Chrome
  Contacts
  Finder
  Mail
  Notes
  Reminders
  Safari
  Terminal
  Exit
```

Select "Audio" to see audio controls:

```
? Audio Controls (Volume: 50%): (Use arrow keys)
❯ Set Volume (current: 50%)
  Volume Up (+10%)
  Volume Down (-10%)
  Mute
  Play Beep
  < Back
```

### Composing an Email

1. Select **Mail** from main menu
2. Choose **Compose Email**
3. Enter recipients (comma-separated for multiple)
4. Enter CC and BCC (optional)
5. Enter subject and body
6. Choose whether to send immediately or save as draft

### Creating a Reminder

1. Select **Reminders** from main menu
2. Choose **Create Reminder**
3. Select a reminder list
4. Enter reminder title
5. Add notes (optional)
6. Set due date in ISO format (optional)
7. Select priority level

## Project Structure

```
cli/
├── audio.ts        # Audio volume and mute controls
├── calendar.ts     # Calendar and event management
├── chrome.ts       # Chrome browser automation
├── contacts.ts     # Contacts and groups management
├── finder.ts       # File system operations
├── index.ts        # Main menu and CLI entry point
├── mail.ts         # Apple Mail operations
├── notes.ts        # Notes and folders management
├── notification.ts # Notifications, dialogs, and user input
├── reminders.ts    # Reminders and lists management
├── safari.ts       # Safari browser automation
├── terminal.ts     # Terminal window and command control
└── utils.ts        # Utility functions
```

## Development

### Adding a New CLI Module

1. Create a new file in `cli/` directory (e.g., `cli/myapp.ts`)
2. Export a `handleMyAppMenu` function:

```typescript
import { select, input } from "@inquirer/prompts";
import { myFunction } from "../src/myapp";

export async function handleMyAppMenu() {
  while (true) {
    const choice = await select({
      message: "My App Options:",
      choices: [
        { name: "Do Something", value: "action" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "action") {
      // Handle the action
    }
  }
}
```

3. Import and add to `cli/index.ts`:

```typescript
import { handleMyAppMenu } from "./myapp";

// Add to main menu choices
{ name: "My App", value: "myapp" }

// Add handler
if (mainChoice === "myapp") {
  await handleMyAppMenu();
}
```

## Technologies Used

- **[@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js)**: Interactive command-line prompts
- **TypeScript**: Type-safe development
- **Bun**: Fast JavaScript runtime

## Troubleshooting

### Permission Errors

If you encounter permission errors when running CLI commands:

1. Go to **System Settings** > **Privacy & Security**
2. Grant permissions to your terminal app under:
   - **Accessibility**
   - **Automation**
   - Specific apps (Mail, Contacts, Calendar, Notes, Reminders)

### Application Not Responding

If an application (Mail, Calendar, etc.) is not responding:
- Make sure the application is installed
- Try opening the application manually first
- Check macOS privacy permissions

## See Also

- [Main README](../README.md) - Project overview and MCP server setup
- [MCP README](../mcp/README.md) - MCP server documentation
- [CLAUDE.md](../CLAUDE.md) - Development guidelines

## License

MIT
