import React from 'react';
import renderer from 'react-test-renderer';
import Button from './button';

describe('Button', () => {
  test('No props', () => {
    const component = renderer.create(<Button />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Label is used to name button', () => {
    const component = renderer.create(<Button label='hello' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Children are used to label button', () => {
    const component = renderer.create(<Button>hello</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Label is used when label and children defined', () => {
    const component = renderer.create(<Button label="button label">button child</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Button class is defined, but not used', () => {
    const component = renderer.create(<Button className="" label='hello' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Button class used without btn', () => {
    const component = renderer.create(<Button className="-test-class" label='hello' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('href is used', () => {
    const component = renderer.create(<Button label="hello" href="/#" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
