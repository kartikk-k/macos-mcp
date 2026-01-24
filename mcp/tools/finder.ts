export const finderTools = [
  {
    name: "finder_open_path",
    description: "Open a file or folder in Finder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to open",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_reveal",
    description: "Reveal a file or folder in Finder (show in enclosing folder)",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to reveal",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_create_folder",
    description: "Create a new folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        parentPath: {
          type: "string",
          description: "The parent directory path",
        },
        folderName: {
          type: "string",
          description: "Name of the new folder",
        },
      },
      required: ["parentPath", "folderName"],
    },
  },
  {
    name: "finder_move_to_trash",
    description: "Move a file or folder to the trash",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to move to trash",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_empty_trash",
    description: "Empty the trash (permanently delete all items)",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_duplicate",
    description: "Duplicate a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to duplicate",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_move",
    description: "Move a file or folder to a new location",
    inputSchema: {
      type: "object" as const,
      properties: {
        sourcePath: {
          type: "string",
          description: "The source file path",
        },
        destinationFolder: {
          type: "string",
          description: "The destination folder path",
        },
      },
      required: ["sourcePath", "destinationFolder"],
    },
  },
  {
    name: "finder_copy",
    description: "Copy a file or folder to a new location",
    inputSchema: {
      type: "object" as const,
      properties: {
        sourcePath: {
          type: "string",
          description: "The source file path",
        },
        destinationFolder: {
          type: "string",
          description: "The destination folder path",
        },
      },
      required: ["sourcePath", "destinationFolder"],
    },
  },
  {
    name: "finder_rename",
    description: "Rename a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to rename",
        },
        newName: {
          type: "string",
          description: "The new name",
        },
      },
      required: ["path", "newName"],
    },
  },
  {
    name: "finder_eject",
    description: "Eject a volume/disk",
    inputSchema: {
      type: "object" as const,
      properties: {
        volumeName: {
          type: "string",
          description: "The name of the volume to eject",
        },
      },
      required: ["volumeName"],
    },
  },
  {
    name: "finder_get_selection",
    description: "Get the currently selected items in Finder",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_get_current_folder",
    description: "Get the path of the frontmost Finder window's current folder",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_get_desktop_picture",
    description: "Get the current desktop wallpaper path",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_set_desktop_picture",
    description: "Set the desktop wallpaper",
    inputSchema: {
      type: "object" as const,
      properties: {
        imagePath: {
          type: "string",
          description: "Path to the image file",
        },
      },
      required: ["imagePath"],
    },
  },
  {
    name: "finder_get_file_info",
    description: "Get information about a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to get info for",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_get_disks",
    description: "Get a list of all mounted disks/volumes",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];
