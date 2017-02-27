/**
 * Created by xax on 27.02.2017.
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

function two_obj_cross(a,b) {
    let c={};
    Object.keys(a).forEach(i=>{
        if(a[i]==b[i]){
            c[i]=a[i];
        }
    });
    return c;
}