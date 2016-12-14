import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Home from './Home';
import {store} from '../../store';



test('Should page home render correctly', () => {
    const component = renderer.create(
        <Provider store={store}>
            <Home/>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});