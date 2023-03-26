exports.rulesData = [
  // ADMIN role
  {
    action: 'admin', // разрешение
    subject: 'admin', // роль
  },
  {
    action: 'read',
    subject: 'admin',
  },
  {
    action: 'none',
    subject: 'admin',
  },
  {
    action: 'fin-table-read',
    subject: 'admin',
  },
  {
    action: 'fin-table-create',
    subject: 'admin',
  },
  {
    action: 'fin-table-update',
    subject: 'admin',
  },
  {
    action: 'fin-table-delete',
    subject: 'admin',
  },
  {
    action: 'users-read',
    subject: 'admin',
  },
  {
    action: 'users-create',
    subject: 'admin',
  },
  {
    action: 'users-update',
    subject: 'admin',
  },
  {
    action: 'users-delete',
    subject: 'admin',
  },
  {
    action: 'apps-read',
    subject: 'admin',
  },
  {
    action: 'apps-create',
    subject: 'admin',
  },
  {
    action: 'apps-update',
    subject: 'admin',
  },
  {
    action: 'apps-delete',
    subject: 'admin',
  },
  {
    action: 'roles-read',
    subject: 'admin',
  },
  {
    action: 'roles-create',
    subject: 'admin',
  },
  {
    action: 'roles-update',
    subject: 'admin',
  },
  {
    action: 'roles-delete',
    subject: 'admin',
  },
  {
    action: 'permissions-read',
    subject: 'admin',
  },
  {
    action: 'permissions-create',
    subject: 'admin',
  },
  {
    action: 'permissions-update',
    subject: 'admin',
  },
  {
    action: 'permissions-delete',
    subject: 'admin',
  },

  // USER role
  {
    action: 'read',
    subject: 'user',
  },
  {
    action: 'none',
    subject: 'user',
  },
  {
    action: 'fin-table-read', // Разрешение
    subject: 'user', // id = имя роли
  },

  // BDM role
  {
    action: 'read',
    subject: 'bdm',
  },
  {
    action: 'none',
    subject: 'bdm',
  },

  // GROUP role
  {
    action: 'read',
    subject: 'group',
  },
  {
    action: 'none',
    subject: 'group',
  },
  {
    action: 'fin-table-read',
    subject: 'group',
  },
  {
    action: 'fin-table-update',
    subject: 'group',
  },

  //  TOP role
  {
    action: 'read',
    subject: 'top',
  },
  {
    action: 'none',
    subject: 'top',
  },
  {
    action: 'fin-table-read',
    subject: 'top',
  },
  {
    action: 'fin-table-create',
    subject: 'top',
  },
  {
    action: 'fin-table-update',
    subject: 'top',
  },
  // none role
  {
    action: 'none',
    subject: 'none',
  },
]
