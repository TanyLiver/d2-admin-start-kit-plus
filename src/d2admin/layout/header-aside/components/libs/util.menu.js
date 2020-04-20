import { uniqueId } from 'lodash'

// 创建 el-menu-item
export function elMenuItem(createElement, menu) {
  return createElement('el-menu-item', { key: menu.path, props: { index: menu.path } }, [
    ...menu.icon ? [
      createElement('i', { attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      createElement('i', { attrs: { class: 'fa fa-file-o' } })
    ] : [],
    ...menu.iconSvg ? [
      createElement('d2-icon-svg', { props: { name: menu.iconSvg } })
    ] : [],
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
  ])
}

// 创建 el-submenu
export function elSubmenu(createElement, menu) {
  return createElement('el-submenu', { key: menu.path, props: { index: menu.path } }, [
    ...menu.icon ? [
      createElement('i', { slot: 'title', attrs: { class: `fa fa-${menu.icon}` } })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      createElement('i', { slot: 'title', attrs: { class: 'fa fa-folder-o' } })
    ] : [],
    ...menu.iconSvg ? [
      createElement('d2-icon-svg', { slot: 'title', props: { name: menu.iconSvg } })
    ] : [],
    createElement('span', { slot: 'title' }, menu.title || '未命名菜单'),
    ...menu.children.map((child, childIndex) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child))
  ])
}

export function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}
