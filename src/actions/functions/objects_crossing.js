/**
 * Created by xax on 27.02.2017.
 */
/**
 * Создает пересечение объектов находящихся в объекте items
 * @member action.index
 * @param items объект в котором находятся объекты для пересечения
 * @returns {{}} - возвращает объект пересечения
 */
export function obj_cross(items){
    let sidebar = {};
    items.forEach(item=>{
        if(Object.keys(sidebar).length == 0){
            sidebar=item.filters;
        }
        else{
            sidebar=two_obj_cross(sidebar,item.filters);
        }
    });
    return sidebar;
}
/**
 * Создает пересечение двух объектов
 * @member action.index.obj_cross
 * @param a - первый объект для пересечения
 * @param b - второй объект для пересечения
 * @returns {{}} - возвращает пересечение двух объектов
 */
function two_obj_cross(a,b) {
    let c={};
    Object.keys(a).forEach(i=>{
        if(a[i]==b[i]){
            c[i]=a[i];
        }
    });
    return c;
}