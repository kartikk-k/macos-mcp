import { select, input, confirm } from "@inquirer/prompts";
import {
  listNotes,
  createNote,
  deleteNote,
  updateNote,
  moveNote,
  getNote,
  listFolders,
  createFolder,
  deleteFolder,
  getFolderInfo,
  searchNotes,
  searchInFolder,
  searchByTitle,
  type Note,
  type CreateNoteParams,
} from "../src/notes";

export async function handleNotesMenu() {
  while (true) {
    const choice = await select({
      message: "Notes Options:",
      choices: [
        { name: "List Notes", value: "list" },
        { name: "View Note", value: "view" },
        { name: "Create Note", value: "create" },
        { name: "Update Note", value: "update" },
        { name: "Delete Note", value: "delete" },
        { name: "Move Note", value: "move" },
        { name: "Search Notes", value: "search" },
        { name: "--- Folders ---", value: "__separator__", disabled: true },
        { name: "List Folders", value: "list_folders" },
        { name: "Create Folder", value: "create_folder" },
        { name: "Delete Folder", value: "delete_folder" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") await handleListNotes();
    if (choice === "view") await handleViewNote();
    if (choice === "create") await handleCreateNote();
    if (choice === "update") await handleUpdateNote();
    if (choice === "delete") await handleDeleteNote();
    if (choice === "move") await handleMoveNote();
    if (choice === "search") await handleSearchNotes();
    if (choice === "list_folders") await handleListFolders();
    if (choice === "create_folder") await handleCreateFolder();
    if (choice === "delete_folder") await handleDeleteFolder();
  }
}

async function handleListNotes() {
  const folders = listFolders();

  if (folders.length === 0) {
    console.log("No folders found.\n");
    return;
  }

  const selectedFolder = await select({
    message: "Select a folder:",
    choices: [
      { name: "All Notes", value: "__all__" },
      ...folders.map((folder) => ({
        name: folder.name,
        value: folder.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedFolder === "__back__") return;

  console.log("\nFetching notes...");
  const notes = selectedFolder === "__all__"
    ? listNotes()
    : listNotes(selectedFolder);

  if (notes.length === 0) {
    console.log("No notes found.\n");
    return;
  }

  console.log("\n--- Notes ---");
  notes.forEach((note, i) => {
    console.log(`${i + 1}. ${note.name}`);
    console.log(`   Folder: ${note.folder}`);
    console.log(`   Modified: ${note.modificationDate}`);
  });
  console.log("");
}

async function handleViewNote() {
  const notes = listNotes();

  if (notes.length === 0) {
    console.log("No notes found.\n");
    return;
  }

  const selectedNote = await select({
    message: "Select a note to view:",
    choices: [
      ...notes.map((note) => ({
        name: `${note.name} (${note.folder})`,
        value: note.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedNote === "__back__") return;

  console.log("\nFetching note content...");
  const note = getNote(selectedNote);

  if (!note) {
    console.log("Note not found.\n");
    return;
  }

  console.log(`\n--- ${note.name} ---`);
  console.log(`Folder: ${note.folder}`);
  console.log(`Modified: ${note.modificationDate}`);
  console.log(`\nContent:\n${note.body}\n`);
}

async function handleCreateNote() {
  const folders = listFolders();

  if (folders.length === 0) {
    console.log("No folders found.\n");
    return;
  }

  const folderName = await select({
    message: "Select a folder:",
    choices: folders.map((folder) => ({
      name: folder.name,
      value: folder.name,
    })),
  });

  const name = await input({
    message: "Note title:",
    validate: (val) => (val.length > 0 ? true : "Title required"),
  });

  const body = await input({
    message: "Note content:",
    validate: (val) => (val.length > 0 ? true : "Content required"),
  });

  const params: CreateNoteParams = {
    name,
    body,
    folder: folderName,
  };

  console.log("\nCreating note...");
  const success = createNote(params);

  if (success) {
    console.log("Note created successfully!\n");
  } else {
    console.log("Failed to create note.\n");
  }
}

async function handleUpdateNote() {
  const notes = listNotes();

  if (notes.length === 0) {
    console.log("No notes found.\n");
    return;
  }

  const selectedNote = await select({
    message: "Select a note to update:",
    choices: [
      ...notes.map((note) => ({
        name: `${note.name} (${note.folder})`,
        value: note.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedNote === "__back__") return;

  const newContent = await input({
    message: "New content:",
    validate: (val) => (val.length > 0 ? true : "Content required"),
  });

  console.log("\nUpdating note...");
  const success = updateNote(selectedNote, newContent);

  if (success) {
    console.log("Note updated successfully!\n");
  } else {
    console.log("Failed to update note.\n");
  }
}

async function handleDeleteNote() {
  const notes = listNotes();

  if (notes.length === 0) {
    console.log("No notes found.\n");
    return;
  }

  const selectedNote = await select({
    message: "Select a note to delete:",
    choices: [
      ...notes.map((note) => ({
        name: `${note.name} (${note.folder})`,
        value: note.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedNote === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete note "${selectedNote}"?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting note...");
  const success = deleteNote(selectedNote);

  if (success) {
    console.log("Note deleted successfully!\n");
  } else {
    console.log("Failed to delete note.\n");
  }
}

async function handleMoveNote() {
  const notes = listNotes();

  if (notes.length === 0) {
    console.log("No notes found.\n");
    return;
  }

  const folders = listFolders();

  if (folders.length === 0) {
    console.log("No folders found.\n");
    return;
  }

  const selectedNote = await select({
    message: "Select a note to move:",
    choices: notes.map((note) => ({
      name: `${note.name} (${note.folder})`,
      value: note.name,
    })),
  });

  const targetFolder = await select({
    message: "Select destination folder:",
    choices: folders.map((folder) => ({
      name: folder.name,
      value: folder.name,
    })),
  });

  console.log("\nMoving note...");
  const success = moveNote(selectedNote, targetFolder);

  if (success) {
    console.log(`Note moved to ${targetFolder} successfully!\n`);
  } else {
    console.log("Failed to move note.\n");
  }
}

async function handleSearchNotes() {
  const searchType = await select({
    message: "Search by:",
    choices: [
      { name: "Title", value: "title" },
      { name: "Content", value: "content" },
      { name: "In Specific Folder", value: "folder" },
    ],
  });

  const query = await input({
    message: "Search query:",
    validate: (val) => (val.length > 0 ? true : "Query required"),
  });

  console.log("\nSearching notes...");
  let results: Note[] = [];

  if (searchType === "title") {
    results = searchByTitle(query);
  } else if (searchType === "content") {
    results = searchNotes(query);
  } else {
    const folders = listFolders();
    const folderName = await select({
      message: "Select folder:",
      choices: folders.map((folder) => ({
        name: folder.name,
        value: folder.name,
      })),
    });
    results = searchInFolder(folderName, query);
  }

  if (results.length === 0) {
    console.log("No matching notes found.\n");
    return;
  }

  console.log(`\n--- Found ${results.length} Note(s) ---`);
  results.forEach((note, i) => {
    console.log(`${i + 1}. ${note.name}`);
    console.log(`   Folder: ${note.folder}`);
    console.log(`   Modified: ${note.modificationDate}`);
  });
  console.log("");
}

async function handleListFolders() {
  console.log("\nFetching folders...");
  const folders = listFolders();

  if (folders.length === 0) {
    console.log("No folders found.\n");
    return;
  }

  console.log("\n--- Folders ---");
  folders.forEach((folder, i) => {
    console.log(`${i + 1}. ${folder.name}`);
    const info = getFolderInfo(folder.name);
    if (info) {
      console.log(`   Notes: ${info.noteCount}`);
    }
  });
  console.log("");
}

async function handleCreateFolder() {
  const name = await input({
    message: "Folder name:",
    validate: (val) => (val.length > 0 ? true : "Name required"),
  });

  console.log("\nCreating folder...");
  const success = createFolder(name);

  if (success) {
    console.log("Folder created successfully!\n");
  } else {
    console.log("Failed to create folder.\n");
  }
}

async function handleDeleteFolder() {
  const folders = listFolders();

  if (folders.length === 0) {
    console.log("No folders found.\n");
    return;
  }

  const selectedFolder = await select({
    message: "Select a folder to delete:",
    choices: [
      ...folders.map((folder) => ({
        name: folder.name,
        value: folder.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedFolder === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete folder "${selectedFolder}" and all its notes?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting folder...");
  const success = deleteFolder(selectedFolder);

  if (success) {
    console.log("Folder deleted successfully!\n");
  } else {
    console.log("Failed to delete folder.\n");
  }
}
