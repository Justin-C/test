import {
  BEST_SCORE,
  FINAL_HEADING,
  FINAL_SCORE,
  RESTART_BUTTON_TEXT
} from '../enums/final-page-enums';
import Button from './button';
import Text from './text';
import { useNavigate } from 'react-router-dom';

const FinalPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Text textString={FINAL_HEADING} />
      <Text textString={FINAL_SCORE(0, 1)} />
      <Text textString={BEST_SCORE(0, 1, '2/2/22')} />
      <Button buttonText={RESTART_BUTTON_TEXT} handleClick={() => navigate('/')} />
    </div>
  );
};

export default FinalPage;
