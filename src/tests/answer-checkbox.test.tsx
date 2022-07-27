import React from 'react';

import renderer from 'react-test-renderer';
import AnswerCheckbox from '../components/answer-checkbox';

describe('checkbox tests', () => {
  it('should render checkbox', () => {
    const tree = renderer
      .create(
        <AnswerCheckbox
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
