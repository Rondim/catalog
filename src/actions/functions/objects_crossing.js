/**
 * Created by xax on 27.02.2017.
 */
/**
 * Создает пересечение объектов находящихся в объекте items
 * @member action.index
 * @param {object} items объект в котором находятся объекты для пересечения
 * @return {{}} - возвращает объект пересечения
 */
export function objCross(items) {
  let sidebar = {};
  items.forEach(item => {
    if (Object.keys(sidebar).length === 0) {
      sidebar = item.filters;
    } else {
      sidebar = two_obj_cross(sidebar, item.filters);
    }
  });
  return sidebar;
}
/**
 * Создает пересечение двух объектов
 * @member action.index.objCross
 * @param {object} a - первый объект для пересечения
 * @param {object} b - второй объект для пересечения
 * @return {{}} - возвращает пересечение двух объектов
 */
function two_obj_cross(a, b) {
  let c = {};
  Object.keys(a).forEach(i => {
    if (a[i] === b[i]) {
      c[i] = a[i];
    }
  });
  return c;
}
export function obj_union_wocross(items) {
  let sidebar = {};
}
function obj_union(items) {
  let sidebar = {};
  items.forEach(item => {
    if (Object.keys(sidebar).length === 0) {
      sidebar = item.filters;
    } else {
      sidebar = two_obj_cross(sidebar, item.filters);
    }
  });
  return sidebar;
}
function two_obj_union(a, b) {
  let c = {};
  Object.keys(a).forEach(i => {
    console.log(i);
  });
  return c;
}
