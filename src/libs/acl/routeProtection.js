import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource))
/* export const canNavigate = (to, who) => to.matched.some(route => {
  if (route.meta.action === undefined) return true
  return ability.can(route.meta.action, who)
}) */

export const _ = undefined
