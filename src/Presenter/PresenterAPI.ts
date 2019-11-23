import { Presenter } from './Presenter';

class PresenterAPI {
  static slider: Presenter;

  static enterPoint(options: {
    slider: Presenter;
    option: string;
    setting: string;
    value?: string | number | number[] | boolean;
    numberOfOneOfTheValues?: number;
  }) {
    const {
      slider, option, setting, value, numberOfOneOfTheValues
    } = options;

    this.slider = slider;
    try {
      if (option !== 'option') {
        const errorFirstParameterOption = "First parameter should be 'option'";
        throw errorFirstParameterOption;
      }
    } catch (err) {
      console.error(err);
    }

    let currentReturn: string | number | number[] | boolean;
    if (value !== undefined && value !== null) {
      if (setting === 'values') {
        const isValueNumber = typeof value === 'number';
        const isOneOfValuesUndefined = numberOfOneOfTheValues === undefined;

        if (isOneOfValuesUndefined && !isValueNumber) {
          this.slider.model.setSetting('values', value);
        }
        if (isOneOfValuesUndefined && isValueNumber) {
          currentReturn = this.slider.model.getSetting('values')[value];
        }
        if (!isOneOfValuesUndefined && typeof value === 'number') {
          const currentValueNumber: number = value;
          this.slider.model.setSetting('values', numberOfOneOfTheValues, currentValueNumber);
        }
      } else {
        this.slider.model.setSetting(setting, value);
      }
    } else {
      currentReturn = this.slider.model.getSetting(setting);
    }


    return currentReturn;
  }
}

export { PresenterAPI };
export default PresenterAPI;
