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
const free={url:""};
const initialState = {
    i0: 0,
    j0: 0,
    di: 4,
    dj: 4,
    list: [
        [ {id:"0", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
            {id:"1",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"3",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"5",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"6",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
        ],
        [ free,
            {id:"8",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"9",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"11",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"12",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free
        ],
        [ {id:"14", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
            free,
            free,
            {id:"17",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"19",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"20",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
        ],
        [ free,
            {id:"22",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"23",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"24",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"25",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"27",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
        ],
        [ {id:"28", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
            {id:"29",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"30",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"32",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"33",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"34",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
        ],
        [ free,
            {id:"36",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            free,
            {id:"38",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"39",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"40",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
            {id:"41",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
        ]
    ]
};

const cellsReducer = (state=initialState, action)=>{
    switch (action.type){

    }
    return state;
};

export default cellsReducer;