export const contactsTools = [
  {
    name: "contacts_list_people",
    description: "List all contacts",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "contacts_create_contact",
    description: "Create a new contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "First name",
        },
        lastName: {
          type: "string",
          description: "Last name",
        },
        organization: {
          type: "string",
          description: "Company/organization",
        },
        emails: {
          type: "array",
          items: { type: "string" },
          description: "Email addresses",
        },
        phones: {
          type: "array",
          items: { type: "string" },
          description: "Phone numbers",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_delete_contact",
    description: "Delete a contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "First name",
        },
        lastName: {
          type: "string",
          description: "Last name (optional)",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_list_groups",
    description: "List all contact groups",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "contacts_search",
    description: "Search for contacts by name, email, or organization",
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
    name: "contacts_update",
    description: "Update an existing contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "Current first name",
        },
        lastName: {
          type: "string",
          description: "Current last name (optional for search)",
        },
        newFirstName: {
          type: "string",
          description: "New first name",
        },
        newLastName: {
          type: "string",
          description: "New last name",
        },
        newOrganization: {
          type: "string",
          description: "New organization",
        },
        newEmails: {
          type: "array",
          items: { type: "string" },
          description: "New email addresses (replaces all existing)",
        },
        newPhones: {
          type: "array",
          items: { type: "string" },
          description: "New phone numbers (replaces all existing)",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_add_to_group",
    description: "Add a contact to a group",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "Contact first name",
        },
        lastName: {
          type: "string",
          description: "Contact last name (optional)",
        },
        groupName: {
          type: "string",
          description: "Name of the group",
        },
      },
      required: ["firstName", "groupName"],
    },
  },
];
