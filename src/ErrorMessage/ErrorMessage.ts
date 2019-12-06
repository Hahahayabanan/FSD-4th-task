import { ErrorType } from '../helpers/interfaces';
import ISliderSettings from '../Model/ISliderSettings';

const ErrorMessages: ErrorType = {
  MIN: 'smaller than min',
  MAX: 'bigger than max',
  STEP: 'bigger than sum max and min',
};

class ErrorMessage {
  private message: string;

  constructor(type: keyof ErrorType, property: keyof ISliderSettings) {
    this.message = `Your entering value '${property}' is ${ErrorMessages[type]}`;

    this.dispatchMessage();
  }

  dispatchMessage() {
    console.error(this.message);
  }
}

export default ErrorMessage;
