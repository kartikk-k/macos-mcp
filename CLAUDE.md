# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Model Context Protocol (MCP) server that provides tools for controlling macOS system features via AppleScript. It exposes functionality for audio control, Apple Mail, Finder operations, and Chrome browser automation through the MCP protocol.

## Development Commands

```bash
# Run the MCP server
bun run start

# Test with MCP inspector
bun run inspector
# Alternative: npx @modelcontextprotocol/inspector bun run mcp/macos-mcp.ts
```

The project uses Bun as the runtime and requires Node >= 18.

## Architecture

### Core Components

**MCP Server Entry Point** (`mcp/macos-mcp.ts`)
- Initializes the MCP server using `@modelcontextprotocol/sdk`
- Sets up stdio transport for communication
- Registers request handlers for `ListTools` and `CallTool` operations

**Tool Registry** (`mcp/index.ts`)
- Exports `tools` array containing all tool definitions with JSON schemas
- Exports `handleToolCall()` function that routes tool calls to appropriate implementations
- Acts as the central dispatcher - all new tools must be registered here

**Feature Modules** (`src/`)
- Each feature domain (audio, mail, finder, chrome) is in its own directory
- Each module exports functions via `index.ts`
- Each module has its own `runAppleScript.ts` helper (identical implementations)

### AppleScript Execution Pattern

All macOS system interactions use AppleScript via `execSync` with:
- Single-quote escaping: `script.replace(/'/g, "'\"'\"'")`
- 5-second timeout
- UTF-8 encoding

Example from `src/audio/runAppleScript.ts`:
```typescript
execSync(`osascript -e '${escaped}'`, { encoding: "utf-8", timeout: 5000 })
```

### Tool Call Flow

1. MCP client sends `CallTool` request
2. `mcp/macos-mcp.ts` receives request via stdio
3. `handleToolCall()` in `mcp/index.ts` switches on tool name
4. Appropriate function from `src/{module}` is called
5. AppleScript is executed via `runAppleScript()`
6. Result is formatted as `ToolResult` with `content` array

### Module Organization

Each feature module follows this pattern:
```
src/{feature}/
├── index.ts           # Re-exports all functions and types
├── runAppleScript.ts  # AppleScript execution utility
└── {function}.ts      # Individual feature implementations
```

## Adding New Tools

To add a new tool:

1. **Implement the function** in the appropriate `src/{module}` directory
   - Create a new `.ts` file or add to existing one
   - Use `runAppleScript()` for system interaction
   - Export function and any types from module's `index.ts`

2. **Register in tool registry** (`mcp/index.ts`)
   - Add tool definition to `tools` array with name, description, and JSON schema
   - Add case in `handleToolCall()` switch statement
   - Import the function at top of file

3. **Tool naming convention**
   - Audio tools: `{action}` (e.g., `get_volume`, `set_volume`)
   - Mail tools: `{action}_mail` (e.g., `compose_mail`, `search_mails`)
   - Finder tools: `finder_{action}` (e.g., `finder_open_path`, `finder_copy`)
   - Chrome tools: `chrome_{action}` (e.g., `chrome_open_url`, `chrome_scroll`)

## Testing

Test tools using the MCP inspector:
```bash
bun run inspector
```

This launches an interactive web interface where you can:
- View all registered tools
- Execute tools with custom parameters
- See real-time responses

## Key Implementation Details

**Window/Tab Indexing (Chrome)**
- All Chrome window and tab indices are 1-based (not 0-based)
- Default to window 1, tab 1 when not specified

**Error Handling**
- All tool calls wrapped in try-catch in `handleToolCall()`
- Errors returned as `ToolResult` with `isError: true`
- AppleScript failures throw exceptions that are caught and formatted

**Type Safety**
- Tool arguments are typed as `Record<string, unknown>` initially
- Cast to specific types within each case using `as` assertions
- TypeScript strict mode enabled in `tsconfig.json`

**Module System**
- Uses ESNext modules (`"type": "module"` in package.json)
- Import paths must include `.js` extension for SDK imports
- Bun's bundler mode allows `.ts` extensions in local imports
