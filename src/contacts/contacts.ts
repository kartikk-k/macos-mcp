import { runAppleScript } from "./runAppleScript";

export interface Contact {
  firstName: string;
  lastName: string;
  organization: string;
  emails: string[];
  phones: string[];
}

export interface Group {
  name: string;
}

export function listPeople(): Contact[] {
  const script = `
tell application "Contacts"
    set outputText to ""
    repeat with p in people
        set firstName to ""
        set lastName to ""
        set org to ""
        try
            set firstName to first name of p
        end try
        try
            set lastName to last name of p
        end try
        try
            set org to organization of p
        end try

        set emailList to ""
        repeat with e in emails of p
            set emailList to emailList & (value of e) & ","
        end repeat

        set phoneList to ""
        repeat with ph in phones of p
            set phoneList to phoneList & (value of ph) & ","
        end repeat

        set outputText to outputText & firstName & "|||" & lastName & "|||" & org & "|||" & emailList & "|||" & phoneList & linefeed
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.includes("|||"))
      .map((line) => {
        const [firstName, lastName, organization, emails, phones] = line.split("|||");
        return {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          organization: organization.trim(),
          emails: emails
            .trim()
            .split(",")
            .filter((e) => e.length > 0),
          phones: phones
            .trim()
            .split(",")
            .filter((p) => p.length > 0),
        };
      });
  } catch {
    return [];
  }
}

export interface CreateContactParams {
  firstName: string;
  lastName?: string;
  organization?: string;
  emails?: string[];
  phones?: string[];
}

export function createContact(params: CreateContactParams): boolean {
  const { firstName, lastName = "", organization = "", emails = [], phones = [] } = params;

  const script = `
tell application "Contacts"
    set newPerson to make new person with properties {first name:"${firstName}", last name:"${lastName}", organization:"${organization}"}
    ${
      emails.length > 0
        ? emails.map((email) => `make new email at end of emails of newPerson with properties {value:"${email}"}`).join("\n    ")
        : ""
    }
    ${
      phones.length > 0
        ? phones.map((phone) => `make new phone at end of phones of newPerson with properties {value:"${phone}"}`).join("\n    ")
        : ""
    }
    save
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function deleteContact(firstName: string, lastName?: string): boolean {
  const nameFilter = lastName
    ? `first name is "${firstName}" and last name is "${lastName}"`
    : `first name is "${firstName}"`;

  const script = `
tell application "Contacts"
    repeat with p in people
        if ${nameFilter} then
            delete p
        end if
    end repeat
    save
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function listGroups(): Group[] {
  const script = `
tell application "Contacts"
    set outputText to ""
    repeat with grp in groups
        set outputText to outputText & (name of grp) & linefeed
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => ({
        name: line.trim(),
      }));
  } catch {
    return [];
  }
}

export function searchContacts(query: string): Contact[] {
  const script = `
tell application "Contacts"
    set outputText to ""
    set searchResults to people whose (first name contains "${query}" or last name contains "${query}" or organization contains "${query}")

    repeat with p in searchResults
        set firstName to ""
        set lastName to ""
        set org to ""
        try
            set firstName to first name of p
        end try
        try
            set lastName to last name of p
        end try
        try
            set org to organization of p
        end try

        set emailList to ""
        repeat with e in emails of p
            set emailList to emailList & (value of e) & ","
        end repeat

        set phoneList to ""
        repeat with ph in phones of p
            set phoneList to phoneList & (value of ph) & ","
        end repeat

        set outputText to outputText & firstName & "|||" & lastName & "|||" & org & "|||" & emailList & "|||" & phoneList & linefeed
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.includes("|||"))
      .map((line) => {
        const [firstName, lastName, organization, emails, phones] = line.split("|||");
        return {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          organization: organization.trim(),
          emails: emails
            .trim()
            .split(",")
            .filter((e) => e.length > 0),
          phones: phones
            .trim()
            .split(",")
            .filter((p) => p.length > 0),
        };
      });
  } catch {
    return [];
  }
}

export interface UpdateContactParams {
  firstName: string;
  lastName?: string;
  newFirstName?: string;
  newLastName?: string;
  newOrganization?: string;
  newEmails?: string[];
  newPhones?: string[];
}

export function updateContact(params: UpdateContactParams): boolean {
  const { firstName, lastName, newFirstName, newLastName, newOrganization, newEmails, newPhones } = params;

  const nameFilter = lastName
    ? `first name is "${firstName}" and last name is "${lastName}"`
    : `first name is "${firstName}"`;

  const script = `
tell application "Contacts"
    repeat with p in people
        if ${nameFilter} then
            ${newFirstName ? `set first name of p to "${newFirstName}"` : ""}
            ${newLastName ? `set last name of p to "${newLastName}"` : ""}
            ${newOrganization ? `set organization of p to "${newOrganization}"` : ""}
            ${newEmails && newEmails.length > 0 ? `
            delete every email of p
            ${newEmails.map((email) => `make new email at end of emails of p with properties {value:"${email}"}`).join("\n            ")}
            ` : ""}
            ${newPhones && newPhones.length > 0 ? `
            delete every phone of p
            ${newPhones.map((phone) => `make new phone at end of phones of p with properties {value:"${phone}"}`).join("\n            ")}
            ` : ""}
        end if
    end repeat
    save
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function addToGroup(firstName: string, lastName: string | undefined, groupName: string): boolean {
  const nameFilter = lastName
    ? `first name is "${firstName}" and last name is "${lastName}"`
    : `first name is "${firstName}"`;

  const script = `
tell application "Contacts"
    set targetGroup to group "${groupName}"
    repeat with p in people
        if ${nameFilter} then
            add p to targetGroup
        end if
    end repeat
    save
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}
