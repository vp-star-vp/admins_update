let counter = 1

exports.appsData = [
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'CRM проекты',
    routeName: 'apps-spc-list',
    props: ['prop1', 'prop2', 'prop3'],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Обороты по вендорам',
    routeName: 'app-fintable',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Отчеты для ТОПов',
    routeName: 'report',
    props: ['prop1', 'prop2', 'prop3'],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Управление пользователями',
    routeName: 'user-management/users-list',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Управление приложениями',
    routeName: 'app-management/apps',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Управление ролями',
    routeName: 'user-management/roles',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'Управление разрешениями',
    routeName: 'app-permissions',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'GetContact app 1',
    routeName: 'app-getcontact-1',
    props: [],
  },
  {
    // eslint-disable-next-line no-plusplus
    id: counter++,
    name: 'GetContact app 2',
    routeName: 'app-getcontact-2',
    props: [],
  },
]
