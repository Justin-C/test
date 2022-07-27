import React from 'react';

import renderer from 'react-test-renderer';
import AnswerRadio from '../components/answer-radio';

describe('checkbox tests', () => {
  it('should render checkbox', () => {
    const tree = renderer
      .create(
        <AnswerRadio
          answerText={'test'}
          handleChange={() => {}}
          isEnabled={true}
          isChecked={true}
          name={'test'}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
