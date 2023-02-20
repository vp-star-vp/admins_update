import { Ability } from '@casl/ability'
import { initialAbility } from './config'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem('userData'))
const existingAbility = userData ? userData.ability : null

const permissionsData = [
  {
    // eslint-disable-next-line no-plusplus
    id: 1,
    name: 'contact-read',
    appId: 1,
    appName: 'getContact',
    functionalityName: 'contact',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 2,
    name: 'contact-update',
    appId: 1,
    appName: 'getContact',
    functionality: 'contact',
    operationType: 'update',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 3,
    name: 'contact.dealer-read',
    appId: 1,
    appName: 'getContact',
    functionality: 'contact.dealer',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
]

permissionsData.forEach(i => {
  initialAbility.push(
    {
      action: i.operationType,
      subject: i.functionality,
    },
  )
})

/* initialAbility.push(
  {
    action: 'read',
    subject: 'appContact',
  },

) */

export default new Ability(existingAbility || initialAbility)
