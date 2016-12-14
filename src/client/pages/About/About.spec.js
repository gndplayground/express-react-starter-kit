import React from 'react';
import About from './About';
import renderer from 'react-test-renderer';

test('Should page about render correctly', () => {
    const component = renderer.create(
        <About/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});