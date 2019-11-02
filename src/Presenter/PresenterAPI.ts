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
    if (value !== undefined) {
      switch (setting) {
        case 'range':
          this.setRange(<boolean>value);
          break;
        case 'min':
          this.setMin(<number>value);
          break;
        case 'max':
          this.setMax(<number>value);
          break;
        case 'step':
          this.setStep(<number>value);
          break;
        case 'orientation':
          this.setOrientation(<string>value);
          break;
        case 'value':
          this.setValue(<number>value);
          break;
        case 'values':
          currentReturn = this.checkValuesSetterType(oneOfTwoValues, value);
          break;
        case 'hasTip':
          this.setHasTip(<boolean>value);
          break;
        default:
      }
    } else {
      switch (setting) {
        case 'range':
          currentReturn = this.getRange();
          break;
        case 'min':
          currentReturn = this.getMin();
          break;
        case 'max':
          currentReturn = this.getMax();
          break;
        case 'step':
          currentReturn = this.getStep();
          break;
        case 'orientation':
          currentReturn = this.getOrientation();
          break;
        case 'value':
          currentReturn = this.getValue();
          break;
        case 'hasTip':
          currentReturn = this.getHasTip();
          break;
        default:
      }
    }
    return currentReturn;
  }

  static getHasTip(): boolean {
    return this.slider.model.getHasTip();
  }

  static setHasTip(newVal: boolean): void {
    this.slider.model.setHasTip(newVal);
  }

  static getRange(): boolean {
    return this.slider.model.getRange();
  }

  static setRange(newVal: boolean): void {
    this.slider.model.setRange(newVal);
  }

  static getMin(): number {
    return this.slider.model.getMin();
  }

  static setMin(newVal: number) {
    this.slider.model.setMin(+newVal);
  }

  static getMax(): number {
    return this.slider.model.getMax();
  }

  static setMax(newVal: number) {
    this.slider.model.setMax(newVal);
  }

  static getStep(): number {
    return this.slider.model.getStep();
  }

  static setStep(newVal: number) {
    this.slider.model.setStep(newVal);
  }

  static getValue(): number {
    return this.slider.model.getValue();
  }

  static setValue(newVal: number) {
    this.slider.model.setValue(newVal);
  }

  static getOrientation(): string {
    return this.slider.model.getOrientation();
  }

  static setOrientation(newVal: string) {
    this.slider.model.setOrientation(newVal);
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
