export const organisation_permission = {
  1: {
    organisation_id: 1,
    name: 'AIR',
    role: 'ADMIN',
    allowed_permissions: {
      ACCOUNTS: [
        'MY_DETAILS',
        'CHANGE_PASSWORD',
        'TEAM',
        'ASSETS',
        'INTEGRATIONS',
        'BILLING',
      ],
      ARCHIVED_PROJECTS: ['VIEW', 'DELETE', 'UNARCHIVE', 'VIEW_DETAILS'],
      MY_MEDIA: ['ASSETS', 'COLLECTIONS'],
      HELP_ARTICLES: ['VIEW'],
      PROJECTS: ['CREATE_PROJECT'],
    },
  },
  2: {
    organisation_id: 2,
    name: 'AIR',
    role: 'ADMIN',
    allowed_permissions: {
      ACCOUNTS: ['MY_DETAILS', 'CHANGE_PASSWORD'],
      ARCHIVED_PROJECTS: ['VIEW', 'DELETE', 'UNARCHIVE', 'VIEW_DETAILS'],
      MY_MEDIA: ['ASSETS', 'COLLECTIONS'],
      HELP_ARTICLES: ['VIEW'],
      PROJECTS: ['CREATE_PROJECT'],
    },
  },
  3: {
    organisation_id: 3,
    name: 'AIR',
    role: 'CREW',
    allowed_permissions: {
      ACCOUNTS: ['MY_DETAILS', 'CHANGE_PASSWORD'],
      HELP_ARTICLES: ['VIEW'],
    },
  },
  4: {
    organisation_id: 4,
    name: 'AIR',
    role: 'NO_ROLE',
    allowed_permissions: {
      ACCOUNTS: ['MY_DETAILS', 'CHANGE_PASSWORD'],
      HELP_ARTICLES: ['VIEW'],
    },
  },
};
