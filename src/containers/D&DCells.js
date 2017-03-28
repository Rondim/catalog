/**
 * Created by xax on 23.03.2017.
 */
import React, { Component } from 'react';
import Cells from '../components/Cells';
import { Grid,Row,Col } from 'react-bootstrap';

export default class DragAndDropCells extends Component {
    render(){
        let list=[
            [ {id:"0", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
                {id:"1",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"2",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"3",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"4",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"5",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"6",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ],
            [ {id:"7", url:""},
                {id:"8",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"9",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"10",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"11",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"12",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"13",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ],
            [ {id:"14", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
                {id:"15",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"16",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"17",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"18",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"19",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"20",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ],
            [ {id:"21", url:""},
                {id:"22",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"23",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"24",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"25",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"26",url:""},
                {id:"27",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ],
            [ {id:"28", url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"} ,
                {id:"29",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"30",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"31",url:""},
                {id:"32",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"33",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"34",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ],
            [ {id:"35", url:""},
                {id:"36",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"37",url:""},
                {id:"38",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"39",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"40",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"},
                {id:"41",url:"https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-Ke7_Uu7kNGUlCMldxd8?alt=media&token=31266f78-2314-4af0-9cdb-274db7eadddc"}
            ]
        ];

        return(
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col lg={6} md={6} xs={6}>
                            <Cells cells={list}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

