import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from './navbar';

describe('Navbar', () => {
  test('No props', () => {
    const component = renderer.create(<Navbar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Make "About" item active', () => {
    const component = renderer.create(<Navbar active='About' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Make "Introduction" item active', () => {
    const component = renderer.create(<Navbar active='Introduction' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
