/**
 * Created by xax on 12.02.2017.
 */
import {renderComponent, expect} from './test_helper';
import Routes from '../src/router';

describe('router',() => {
    let component;
    beforeEach(()=>{
        component = renderComponent(Routes);
    });
    it('shows a container for Catalog and Manager',() => {
        expect(component.find('.container')).to.exist;
    });
});