import React from 'react';
import About from './About';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <About/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});