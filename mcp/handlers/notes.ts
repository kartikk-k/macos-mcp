import {
  listFolders,
  listNotes,
  createNote,
  deleteNote,
  updateNote,
  searchNotes,
  createFolder,
  moveNote,
  getNote,
  deleteFolder,
  getFolderInfo,
  searchInFolder,
  searchByTitle,
} from "../../src/notes";

export function handleNotesTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "notes_list_folders":
      return listFolders();
    case "notes_list_notes":
      return listNotes((args as { folderName?: string }).folderName);
    case "notes_create_note": {
      const noteArgs = args as {
        name: string;
        body: string;
        folderName?: string;
      };
      return {
        success: createNote({
          name: noteArgs.name,
          body: noteArgs.body,
          folderName: noteArgs.folderName,
        }),
      };
    }
    case "notes_delete_note":
      return {
        success: deleteNote(
          (args as { name: string; folderName?: string }).name,
          (args as { name: string; folderName?: string }).folderName
        ),
      };
    case "notes_update":
      return {
        success: updateNote(
          (args as { name: string; newBody: string; folderName?: string }).name,
          (args as { name: string; newBody: string; folderName?: string })
            .newBody,
          (args as { name: string; newBody: string; folderName?: string })
            .folderName
        ),
      };
    case "notes_search":
      return searchNotes((args as { query: string }).query);
    case "notes_create_folder":
      return { success: createFolder((args as { folderName: string }).folderName) };
    case "notes_move":
      return {
        success: moveNote(
          (args as {
            noteName: string;
            sourceFolderName?: string;
            targetFolderName: string;
          }).noteName,
          (args as {
            noteName: string;
            sourceFolderName?: string;
            targetFolderName: string;
          }).sourceFolderName,
          (args as {
            noteName: string;
            sourceFolderName?: string;
            targetFolderName: string;
          }).targetFolderName
        ),
      };
    case "notes_get":
      return getNote(
        (args as { name: string; folderName?: string }).name,
        (args as { name: string; folderName?: string }).folderName
      );
    case "notes_delete_folder":
      return { success: deleteFolder((args as { folderName: string }).folderName) };
    case "notes_get_folder_info":
      return getFolderInfo((args as { folderName: string }).folderName);
    case "notes_search_in_folder":
      return searchInFolder(
        (args as { query: string; folderName: string }).query,
        (args as { query: string; folderName: string }).folderName
      );
    case "notes_search_by_title":
      return searchByTitle((args as { query: string }).query);
    default:
      throw new Error(`Unknown notes tool: ${name}`);
  }
}
