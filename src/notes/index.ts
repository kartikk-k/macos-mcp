// Note operations
export {
  listNotes,
  createNote,
  deleteNote,
  updateNote,
  moveNote,
  getNote,
  type Note,
  type CreateNoteParams,
} from "./notes";

// Folder operations
export {
  listFolders,
  createFolder,
  deleteFolder,
  getFolderInfo,
  type Folder,
  type FolderInfo,
} from "./folders";

// Search operations
export {
  searchNotes,
  searchInFolder,
  searchByTitle,
} from "./search";
