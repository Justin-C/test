import {
  FINAL_HEADING_HIGH,
  FINAL_HEADING_LOW,
  FINAL_HEADING_MIDDLE
} from '../enums/final-page-enums.js';

const getFinalHeaderString = (score: number, total: number): string => {
  if (score / total > 0.67) {
    return FINAL_HEADING_HIGH;
  } else if (score / total > 0.34) {
    return FINAL_HEADING_MIDDLE;
  } else {
    return FINAL_HEADING_LOW;
  }
};

export default getFinalHeaderString;
