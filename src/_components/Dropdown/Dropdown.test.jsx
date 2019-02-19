/* Packages */
import React from 'react';

/* Test Suite */
import { expect } from 'chai';
import { shallow } from 'enzyme';

/* Component */
import Dropdown from './Dropdown';

/* Values */
const className = 'dropdown';

/* DOM/Unit test */
describe('Dropdown', () => {

    test('validate default classNames and "active" behavior', () => {
        let wrapper   = shallow(<Dropdown />);
        let container = wrapper.props();
        let toggle    = container.children[1];
        let content   = container.children[2];

        expect(container.className).to.include(className);
        expect(container.className).to.not.include('active');
        expect(toggle.props.className).to.include(`${className}__toggle`);

        wrapper.find('span').simulate('click', { preventDefault: () => {} });

        container = wrapper.props();

        expect(container.className).to.include('active');

        wrapper.find('.dropdown__content').simulate('click', { target: 'dropdown__content' });

        container = wrapper.props();

        expect(container.className).not.to.include('active');
    });

});
