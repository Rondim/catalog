/**
 * Created by xax on 01.04.2017.
 */

/**
 *
 * @param i0 - с чего начинается отображение строк
 * @param j0 - с чего начинается отображение столбцов
 * @param di - количество строк
 * @param dj - количество столбцов
 * @type {{i0: number, j0: number, di: number, dj: number}}
 */
import { FETCH_ITEM_CELLS, LOAD_CELLS, UPDATE_CELLS, REMOVE_CELL, SET_ACTIVE_CELL, RESET_ACTIVE_CELL } from '../actions/types';
let initialList = [];
for(let n=0; n < 100; n++){
    initialList.push([]);
}
const initialState = {
    i0: 0,
    j0: 0,
    di: 10,
    dj: 8,
    list:initialList,
    activeCells:false,
    active:[]
};

const cellsReducer = (state=initialState, action) => {
    let { list, active } = state;
    switch (action.type){
        case FETCH_ITEM_CELLS:
            return {...state, activeCells: action.payload};
        case LOAD_CELLS:
            const {i} = action.payload;
            const {j} = action.payload;
            list[i][j] = action.payload.cell;
            list[i][j].active=false;
            return {...state, list};
        case UPDATE_CELLS:
            const iu = action.payload.i;
            const ju = action.payload.j;
            list[iu][ju]=list[iu][ju]?list[iu][ju]:{};
            list[iu][ju].id = action.payload.id;
            return{...state, list};
        case REMOVE_CELL:
            const ir = action.payload.i;
            const jr = action.payload.j;
            list[ir][jr].id = false;
            list[ir][jr].item = {url:""};
            return{...state, list};
        case SET_ACTIVE_CELL:
            const is = action.payload.i;
            const js = action.payload.j;
            list[is][js].active=action.payload.active;
            if(action.payload.active) active.push({i:is,j:js});
            else {
                active.forEach((e, index) => {
                    if (e.i === is && e.j === js) {
                        active.splice(index,1);
                    }
                });
            }
            console.log(active);
            return {...state, active, list};
        case RESET_ACTIVE_CELL:
            const activeOld = action.payload;
            activeOld.forEach(e =>{
                list[e.i][e.j].active = false;
            });
            active = [];
            return {...state,list,active};

    }
    return state;
};

export default cellsReducer;