import React from 'react';
import renderer from 'react-test-renderer';
import Canvas from './canvas';

describe('Canvas Component', () => {
  test('No props', () => {
    const component = renderer.create(<Canvas />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('With id', () => {
    const component = renderer.create(<Canvas id='test_id' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('function is called after render', () => {
    const func = jest.fn();
    const component = renderer.create(<Canvas id='test_id' didMountFn={func} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(func.mock.calls).toHaveLength(1);
  });
});
