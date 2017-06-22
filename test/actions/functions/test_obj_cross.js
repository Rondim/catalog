// /**
//  * Created by xax on 27.02.2017.
//  */
// import { expect } from '../../test_helper';
// import {obj_cross} from '../../../src/actions/functions/objects_crossing';
//
// describe('obj_crossing',()=>{
//     it('zeroObj',()=>{
//         const items = [];
//         expect(Object.keys(obj_cross(items)).length).to.equal(0);
//     });
//     it('oneObj',()=>{
//         const items = [
//             {
//                 filters: {
//                     b: 1,
//                     c: 2
//                 }
//             }
//         ];
//         expect(obj_cross(items).b).to.equal(1);
//         expect(obj_cross(items).c).to.equal(2);
//         expect(Object.keys(obj_cross(items)).length).to.equal(2);
//     });
//     it('Object without crossing',()=> {
//         const items = [
//             {
//                 filters: {
//                     c: 2,
//                     d: 4
//                 }
//             },
//             {
//                 filters: {
//                     e: 1,
//                     f: 3
//                 }
//             }
//         ];
//         expect(Object.keys(obj_cross(items)).length).to.equal(0);
//     });
//     it('Object without crossing2',()=> {
//         const items = [
//             {
//                 filters: {
//                     c: 2,
//                     d: 4
//                 }
//             },
//             {
//                 filters: {
//                     c: 1,
//                     d: 3
//                 }
//             }
//         ];
//         expect(Object.keys(obj_cross(items)).length).to.equal(0);
//     });
//     it('2 crossing Objects',()=> {
//         const items = [
//             {
//                 filters: {
//                     c: 2,
//                     d: 4,
//                     e: 1
//                 }
//             },
//             {
//                 filters: {
//                     c: 2,
//                     d: 4,
//                     f: 2
//                 }
//             }
//         ];
//         expect(obj_cross(items).c).to.equal(2);
//         expect(obj_cross(items).d).to.equal(4);
//         expect(Object.keys(obj_cross(items)).length).to.equal(2);
//     });
//     it('3 crossing Objects',()=> {
//         const items = [
//             {
//                 filters: {
//                     c: 2,
//                     d: 4,
//                     e: 1
//                 }
//             },
//             {
//                 filters: {
//                     c: 2,
//                     d: 4,
//                     f: 2
//                 }
//             },
//             {
//                 filters:{
//                     a: 2,
//                     d: 4,
//                     f: 2
//                 }
//             }
//         ];
//         expect(obj_cross(items).d).to.equal(4);
//         expect(Object.keys(obj_cross(items)).length).to.equal(1);
//     });
// });
