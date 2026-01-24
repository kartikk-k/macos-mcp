import { select, input, confirm } from "@inquirer/prompts";
import {
  listPeople,
  createContact,
  deleteContact,
  listGroups,
  searchContacts,
  updateContact,
  addToGroup,
  type Contact,
  type CreateContactParams,
  type UpdateContactParams,
} from "../src/contacts";

export async function handleContactsMenu() {
  while (true) {
    const choice = await select({
      message: "Contacts Options:",
      choices: [
        { name: "List All Contacts", value: "list" },
        { name: "Search Contacts", value: "search" },
        { name: "Create Contact", value: "create" },
        { name: "Update Contact", value: "update" },
        { name: "Delete Contact", value: "delete" },
        { name: "List Groups", value: "groups" },
        { name: "Add to Group", value: "add_to_group" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") await handleListContacts();
    if (choice === "search") await handleSearchContacts();
    if (choice === "create") await handleCreateContact();
    if (choice === "update") await handleUpdateContact();
    if (choice === "delete") await handleDeleteContact();
    if (choice === "groups") await handleListGroups();
    if (choice === "add_to_group") await handleAddToGroup();
  }
}

async function handleListContacts() {
  console.log("\nFetching contacts...");
  const contacts = listPeople();

  if (contacts.length === 0) {
    console.log("No contacts found.\n");
    return;
  }

  console.log("\n--- Contacts ---");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.firstName} ${contact.lastName}`);
    if (contact.email) console.log(`   Email: ${contact.email}`);
    if (contact.phone) console.log(`   Phone: ${contact.phone}`);
    if (contact.organization) console.log(`   Organization: ${contact.organization}`);
  });
  console.log("");
}

async function handleSearchContacts() {
  const query = await input({
    message: "Search query:",
    validate: (val) => (val.length > 0 ? true : "Query required"),
  });

  console.log("\nSearching contacts...");
  const contacts = searchContacts(query);

  if (contacts.length === 0) {
    console.log("No matching contacts found.\n");
    return;
  }

  console.log(`\n--- Found ${contacts.length} Contact(s) ---`);
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.firstName} ${contact.lastName}`);
    if (contact.email) console.log(`   Email: ${contact.email}`);
    if (contact.phone) console.log(`   Phone: ${contact.phone}`);
    if (contact.organization) console.log(`   Organization: ${contact.organization}`);
  });
  console.log("");
}

async function handleCreateContact() {
  const firstName = await input({
    message: "First name:",
    validate: (val) => (val.length > 0 ? true : "First name required"),
  });

  const lastName = await input({
    message: "Last name:",
  });

  const email = await input({
    message: "Email (optional):",
  });

  const phone = await input({
    message: "Phone (optional):",
  });

  const organization = await input({
    message: "Organization (optional):",
  });

  const params: CreateContactParams = {
    firstName,
    lastName: lastName || undefined,
    email: email || undefined,
    phone: phone || undefined,
    organization: organization || undefined,
  };

  console.log("\nCreating contact...");
  const success = createContact(params);

  if (success) {
    console.log("Contact created successfully!\n");
  } else {
    console.log("Failed to create contact.\n");
  }
}

async function handleUpdateContact() {
  const contacts = listPeople();

  if (contacts.length === 0) {
    console.log("No contacts found.\n");
    return;
  }

  const selectedContact = await select({
    message: "Select a contact to update:",
    choices: [
      ...contacts.map((contact) => ({
        name: `${contact.firstName} ${contact.lastName}`,
        value: `${contact.firstName} ${contact.lastName}`,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedContact === "__back__") return;

  const email = await input({
    message: "New email (leave empty to skip):",
  });

  const phone = await input({
    message: "New phone (leave empty to skip):",
  });

  const organization = await input({
    message: "New organization (leave empty to skip):",
  });

  const params: UpdateContactParams = {
    name: selectedContact,
  };

  if (email) params.email = email;
  if (phone) params.phone = phone;
  if (organization) params.organization = organization;

  console.log("\nUpdating contact...");
  const success = updateContact(params);

  if (success) {
    console.log("Contact updated successfully!\n");
  } else {
    console.log("Failed to update contact.\n");
  }
}

async function handleDeleteContact() {
  const contacts = listPeople();

  if (contacts.length === 0) {
    console.log("No contacts found.\n");
    return;
  }

  const selectedContact = await select({
    message: "Select a contact to delete:",
    choices: [
      ...contacts.map((contact) => ({
        name: `${contact.firstName} ${contact.lastName}`,
        value: `${contact.firstName} ${contact.lastName}`,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedContact === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete contact "${selectedContact}"?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting contact...");
  const success = deleteContact(selectedContact);

  if (success) {
    console.log("Contact deleted successfully!\n");
  } else {
    console.log("Failed to delete contact.\n");
  }
}

async function handleListGroups() {
  console.log("\nFetching groups...");
  const groups = listGroups();

  if (groups.length === 0) {
    console.log("No groups found.\n");
    return;
  }

  console.log("\n--- Groups ---");
  groups.forEach((group, i) => {
    console.log(`${i + 1}. ${group.name}`);
  });
  console.log("");
}

async function handleAddToGroup() {
  const contacts = listPeople();

  if (contacts.length === 0) {
    console.log("No contacts found.\n");
    return;
  }

  const groups = listGroups();

  if (groups.length === 0) {
    console.log("No groups found.\n");
    return;
  }

  const selectedContact = await select({
    message: "Select a contact:",
    choices: contacts.map((contact) => ({
      name: `${contact.firstName} ${contact.lastName}`,
      value: `${contact.firstName} ${contact.lastName}`,
    })),
  });

  const selectedGroup = await select({
    message: "Select a group:",
    choices: groups.map((group) => ({
      name: group.name,
      value: group.name,
    })),
  });

  console.log("\nAdding contact to group...");
  const success = addToGroup(selectedContact, selectedGroup);

  if (success) {
    console.log(`Contact added to ${selectedGroup} successfully!\n`);
  } else {
    console.log("Failed to add contact to group.\n");
  }
}
