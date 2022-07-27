import React from 'react';

import renderer from 'react-test-renderer';
import FinalPage from '../components/final-page';

describe('final page tests', () => {
  it('should render final page', () => {
    const tree = renderer.create(<FinalPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
