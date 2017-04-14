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
import { FETCH_ITEM_CELLS, LOAD_CELLS, UPDATE_CELLS } from '../actions/types';
const free={item:{url:""},id:false};
let initialList = [];
for(let n=0; n < 100; n++){
    initialList.push([]);
}
const initialState = {
    i0: 0,
    j0: 0,
    di: 4,
    dj: 4,
    list:initialList,
    activeCells:false
};

const cellsReducer = (state=initialState, action) => {
    let { list } = state;
    switch (action.type){
        case FETCH_ITEM_CELLS:
            return {...state, activeCells: action.payload};
        case LOAD_CELLS:
            const {i} = action.payload;
            const {j} = action.payload;
            list[i][j] = action.payload.cell;
            return {...state, list};
        case UPDATE_CELLS:
            const iu = action.payload.i;
            const ju = action.payload.j;
            list[iu][ju].id = action.payload.id;
            return{...state, list}
    }
    return state;
};

export default cellsReducer;