# macos-mcp

A Model Context Protocol (MCP) server that provides tools for controlling macOS system features via AppleScript.

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

### Mail Tools
- `get_mail_accounts` - List configured Apple Mail accounts
- `get_mails` - Get emails from inbox
- `compose_mail` - Compose new email
- `search_mails` - Search emails by subject, sender, or content
- `check_mail` - Check for new mail
- `get_unread_count` - Get unread counts per mailbox
- `get_total_unread_count` - Get total unread count

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

### Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector bunx macos-mcp
```

## Permissions

This MCP server uses AppleScript to control macOS features. You may need to grant permissions:

1. **Accessibility**: System Settings > Privacy & Security > Accessibility
2. **Automation**: System Settings > Privacy & Security > Automation
3. **Mail**: When first accessing Mail, macOS will prompt for permission

## Project Structure

```
mcp/
├── index.ts       # Tool definitions and handlers
├── macos-mcp.ts   # MCP server entry point
└── README.md      # This file

src/
├── audio/         # Audio control functions
│   ├── volume.ts
│   └── beep.ts
└── mail/          # Apple Mail functions
    ├── getAccounts.ts
    ├── getMails.ts
    ├── composeMail.ts
    ├── searchMails.ts
    ├── checkMail.ts
    └── getUnreadCount.ts
```

## Development

### Local Development

```bash
# Clone the repo
git clone https://github.com/kartikk-k/macos-mcp.git
cd macos-mcp

# Install dependencies
bun install

# Run the server
bun run start

# Test with inspector
bun run inspector
```

### Adding New Tools

1. Add your function to the appropriate module in `src/`
2. Export it from the module's `index.ts`
3. Add the tool definition to `mcp/index.ts` in the `tools` array
4. Add the handler case in `handleToolCall` function

## License

MIT
