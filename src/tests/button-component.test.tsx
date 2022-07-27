import React from 'react';

import renderer from 'react-test-renderer';
import Button from '../components/button';

describe('button component test', () => {
  it('should render button', () => {
    const tree = renderer
      .create(<Button handleClick={() => {}} buttonText="test" isEnabled={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
