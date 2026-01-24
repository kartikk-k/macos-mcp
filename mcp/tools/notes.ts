export const notesTools = [
  {
    name: "notes_list_folders",
    description: "List all Notes folders",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "notes_list_notes",
    description: "List notes from a folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder (optional, defaults to default folder)",
        },
      },
      required: [],
    },
  },
  {
    name: "notes_create_note",
    description: "Create a new note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        body: {
          type: "string",
          description: "Note content (HTML supported)",
        },
        folderName: {
          type: "string",
          description: "Name of the folder to create the note in",
        },
      },
      required: ["name", "body"],
    },
  },
  {
    name: "notes_delete_note",
    description: "Delete a note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        folderName: {
          type: "string",
          description: "Name of the folder (optional)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "notes_update",
    description: "Update the content of an existing note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        newBody: {
          type: "string",
          description: "New note content (HTML supported)",
        },
        folderName: {
          type: "string",
          description: "Name of the folder containing the note (optional)",
        },
      },
      required: ["name", "newBody"],
    },
  },
  {
    name: "notes_search",
    description: "Search for notes by title or content",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "notes_create_folder",
    description: "Create a new Notes folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder to create",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_move",
    description: "Move a note to a different folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        noteName: {
          type: "string",
          description: "Name of the note to move",
        },
        sourceFolderName: {
          type: "string",
          description: "Source folder (optional, defaults to default folder)",
        },
        targetFolderName: {
          type: "string",
          description: "Target folder to move the note to",
        },
      },
      required: ["noteName", "targetFolderName"],
    },
  },
  {
    name: "notes_get",
    description: "Get details of a specific note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        folderName: {
          type: "string",
          description: "Folder name (optional, defaults to default folder)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "notes_delete_folder",
    description: "Delete a Notes folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder to delete",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_get_folder_info",
    description: "Get information about a folder (name and note count)",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_search_in_folder",
    description: "Search for notes within a specific folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
        folderName: {
          type: "string",
          description: "Name of the folder to search in",
        },
      },
      required: ["query", "folderName"],
    },
  },
  {
    name: "notes_search_by_title",
    description: "Search for notes by title only (faster than full-text search)",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Title search query",
        },
      },
      required: ["query"],
    },
  },
];
