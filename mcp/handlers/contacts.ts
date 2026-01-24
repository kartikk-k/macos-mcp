import {
  listPeople,
  createContact,
  deleteContact,
  listGroups,
  searchContacts,
  updateContact,
  addToGroup,
} from "../../src/contacts";

export function handleContactsTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "contacts_list_people":
      return listPeople();
    case "contacts_create_contact": {
      const contactArgs = args as {
        firstName: string;
        lastName?: string;
        organization?: string;
        emails?: string[];
        phones?: string[];
      };
      return {
        success: createContact({
          firstName: contactArgs.firstName,
          lastName: contactArgs.lastName,
          organization: contactArgs.organization,
          emails: contactArgs.emails,
          phones: contactArgs.phones,
        }),
      };
    }
    case "contacts_delete_contact":
      return {
        success: deleteContact(
          (args as { firstName: string; lastName?: string }).firstName,
          (args as { firstName: string; lastName?: string }).lastName
        ),
      };
    case "contacts_list_groups":
      return listGroups();
    case "contacts_search":
      return searchContacts((args as { query: string }).query);
    case "contacts_update": {
      const updateContactArgs = args as {
        firstName: string;
        lastName?: string;
        newFirstName?: string;
        newLastName?: string;
        newOrganization?: string;
        newEmails?: string[];
        newPhones?: string[];
      };
      return {
        success: updateContact({
          firstName: updateContactArgs.firstName,
          lastName: updateContactArgs.lastName,
          newFirstName: updateContactArgs.newFirstName,
          newLastName: updateContactArgs.newLastName,
          newOrganization: updateContactArgs.newOrganization,
          newEmails: updateContactArgs.newEmails,
          newPhones: updateContactArgs.newPhones,
        }),
      };
    }
    case "contacts_add_to_group":
      return {
        success: addToGroup(
          (args as { firstName: string; lastName?: string; groupName: string })
            .firstName,
          (args as { firstName: string; lastName?: string; groupName: string })
            .lastName,
          (args as { firstName: string; lastName?: string; groupName: string })
            .groupName
        ),
      };
    default:
      throw new Error(`Unknown contacts tool: ${name}`);
  }
}
