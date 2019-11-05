import { Presenter } from './Presenter';

class PresenterAPI {
  static slider: Presenter;

  static enterPoint(options: {
    slider: Presenter;
    option: string;
    setting: string;
    value?: string | number | number[] | boolean;
    oneOfTwoValues?: number;
  }) {
    const {
      slider, option, setting, value, oneOfTwoValues
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
    if (value !== undefined || value !== null) {
      switch (setting) {
        case 'range':
          this.slider.model.setRange(<boolean>value);
          break;
        case 'min':
          this.slider.model.setMin(<number>value);
          break;
        case 'max':
          this.slider.model.setMax(<number>value);
          break;
        case 'step':
          this.slider.model.setStep(<number>value);
          break;
        case 'orientation':
          this.slider.model.setOrientation(<string>value);
          break;
        case 'value':
          this.slider.model.setValue(<number>value);
          break;
        case 'values':
          currentReturn = this.checkValuesSetterType(oneOfTwoValues, value);
          break;
        case 'hasTip':
          this.slider.model.setHasTip(<boolean>value);
          break;
        default:
      }
    } else {
      switch (setting) {
        case 'range':
          currentReturn = this.slider.model.getRange();
          break;
        case 'min':
          currentReturn = this.slider.model.getMin();
          break;
        case 'max':
          currentReturn = this.slider.model.getMax();
          break;
        case 'step':
          currentReturn = this.slider.model.getStep();
          break;
        case 'orientation':
          currentReturn = this.slider.model.getOrientation();
          break;
        case 'value':
          currentReturn = this.slider.model.getValue();
          break;
        case 'values':
          currentReturn = this.getValues();
          break;
        case 'hasTip':
          currentReturn = this.slider.model.getHasTip();
          break;
        default:
      }
    }
    return currentReturn;
  }

  static getValues(numberCurrent?: number): number[] | number {
    if (numberCurrent === undefined) { return this.slider.model.getValues() as number[]; }
    return this.slider.model.getValues(numberCurrent) as number;
  }

  static setValues(newVal: number[] | number, numberCurrent?: number) {
    if (numberCurrent === undefined) {
      const newValue = this.slider.model.setValues(<number[]>newVal);
      return newValue;
    }
    const tmp: number[] = this.slider.model.getValues() as number[];
    tmp[numberCurrent] = <number>newVal;
    this.slider.model.setValues(<number[]>tmp);
  }

  static checkValuesSetterType(oneOfTwoValues: any, value: any) {
    const isValueNumber = typeof value === 'number';
    const isOneOfValuesUndefined = oneOfTwoValues === undefined;

    if (isOneOfValuesUndefined && !isValueNumber) {
      this.setValues(<number[]>value);
    }
    if (isOneOfValuesUndefined && isValueNumber) {
      return this.getValues(value);
    }
    if (!isOneOfValuesUndefined && isValueNumber) {
      this.slider.model.setValue(oneOfTwoValues, <number>value);
    }
  }
}

export { PresenterAPI };
export default PresenterAPI;
