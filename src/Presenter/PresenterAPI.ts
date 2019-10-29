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
    const { slider, option, setting, value, oneOfTwoValues } = options;

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
          this.checkValuesSetterType(oneOfTwoValues, value);
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
        case 'values':
          currentReturn = this.getValues();
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
    this.slider.updateValue();
  }

  static getRange(): boolean {
    return this.slider.model.getRange();
  }

  static setRange(newVal: boolean): void {
    this.slider.model.setRange(newVal);
    const rootElement = this.slider.view.sliderHTML;
    this.slider.view.destroy();
    this.slider.createView(rootElement);
    this.slider.updateValue();
  }

  static getMin(): number {
    return this.slider.model.getMin();
  }

  static setMin(newVal: number) {
    this.slider.model.setMin(+newVal);
    this.slider.updateValue();
  }

  static getMax(): number {
    return this.slider.model.getMax();
  }

  static setMax(newVal: number) {
    this.slider.model.setMax(newVal);
    this.slider.updateValue();
  }

  static getStep(): number {
    return this.slider.model.getStep();
  }

  static setStep(newVal: number) {
    this.slider.model.setStep(newVal);
    this.slider.updateValue();
  }

  static getValue(): number {
    return this.slider.model.getValue();
  }

  static setValue(newVal: number) {
    this.slider.model.setValue(newVal);
    this.slider.updateValue();
  }

  static getOrientation(): string {
    return this.slider.model.getOrientation();
  }

  static setOrientation(newVal: string) {
    this.slider.model.setOrientation(newVal);
    const rootElement = this.slider.view.sliderHTML;
    this.slider.view.destroy();
    this.slider.view = undefined;
    this.slider.createView(rootElement);
    this.slider.updateValue();
  }

  static getValues(numberCurrent?: number): number[] | number {
    if (numberCurrent === undefined)
      return this.slider.model.getValues() as number[];
    return this.slider.model.getValues(numberCurrent) as number;
  }

  static setValues(newVal: number[] | number, numberCurrent?: number) {
    if (numberCurrent === undefined) {
      const newValue = this.slider.model.setValues(<number[]>newVal);
      this.slider.updateValue();
      return newValue;
    }
    const tmp: number[] = this.slider.model.getValues() as number[];
    tmp[numberCurrent] = <number>newVal;
    this.slider.model.setValues(<number[]>tmp);

    this.slider.updateValue();
  }

  static checkValuesSetterType(oneOfTwoValues: any, value: any) {
    const isValueNumber = typeof value === 'number';
    const isOneOfValuesUndefined = oneOfTwoValues === undefined;

    if (isOneOfValuesUndefined && !isValueNumber) {
      return this.setValues(<number[]>value);
    }
    if (isOneOfValuesUndefined && isValueNumber) {
      return this.getValues(value);
    }
    if (!isOneOfValuesUndefined && isValueNumber) {
      return this.setValues(oneOfTwoValues, <number>value);
    }
  }
}

export { PresenterAPI };
export default PresenterAPI;
