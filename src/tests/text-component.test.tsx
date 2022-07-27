import React from 'react';

import Text from '../components/text';
import renderer from 'react-test-renderer';

describe('text component test', () => {
  it('should render text', () => {
    const tree = renderer.create(<Text textString="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
