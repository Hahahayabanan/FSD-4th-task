import { Presenter } from './Presenter';

class PresenterAPI {
  static slider: Presenter;

  static enterPoint(options: {
    slider: Presenter;
    option: string;
    setting: string;
    value?: string | number | number[] | boolean;
    valuesOneOfTwoVals?: number;
  }) {
    this.slider = options.slider;
    try {
      if (options.option !== 'option') {
        const errorFirstParameterOption = "First parameter should be 'option'";
        throw errorFirstParameterOption;
      }
    } catch (err) {
      console.error(err);
    }

    let currReturn: string | number | number[] | boolean;
    if (options.value !== undefined) {
      switch (options.setting) {
        case 'range':
          currReturn = this.setRange(<boolean>options.value);
          break;
        case 'minVal':
          currReturn = this.setMinVal(<number>options.value);
          break;
        case 'maxVal':
          currReturn = this.setMaxVal(<number>options.value);
          break;
        case 'stepVal':
          currReturn = this.setStepVal(<number>options.value);
          break;
        case 'orientation':
          currReturn = this.setOrientation(<string>options.value);
          break;
        case 'value':
          currReturn = this.setValue(<number>options.value);
          break;
        case 'values':
          currReturn = this.checkValuesSetterType(
            options.valuesOneOfTwoVals,
            options.value,
          );
          break;
        case 'followerPoint':
          currReturn = this.setFollowerPoint(<boolean>options.value);
          break;
        default:
      }
    } else {
      switch (options.setting) {
        case 'range':
          currReturn = this.getRange();
          break;
        case 'minVal':
          currReturn = this.getMinVal();
          break;
        case 'maxVal':
          currReturn = this.getMaxVal();
          break;
        case 'stepVal':
          currReturn = this.getStepVal();
          break;
        case 'orientation':
          currReturn = this.getOrientation();
          break;
        case 'value':
          currReturn = this.getValue();
          break;
        case 'values':
          currReturn = this.getValues();
          break;
        case 'followerPoint':
          currReturn = this.getFollowerPoint();
          break;
        default:
      }
    }

    return currReturn;
  }

  static getFollowerPoint(): boolean {
    return this.slider.model.settings.settings.followerPoint;
  }

  static setFollowerPoint(newVal: boolean): boolean {
    const newValue = this.slider.model.settings.setFollowerPoint(newVal);
    this.slider.updateValue();
    return newValue;
  }

  static getRange(): boolean {
    return this.slider.model.settings.settings.range;
  }

  static setRange(newVal: boolean): boolean {
    const newValue = this.slider.model.settings.setRange(newVal);
    const rootElement = this.slider.view.slider;
    this.slider.view.destroy();
    this.slider.createView(rootElement);
    this.slider.updateValue();
    return newValue;
  }

  static getMinVal(): number {
    return this.slider.model.settings.settings.minVal;
  }

  static setMinVal(newVal: number): number {
    const newValue = this.slider.model.settings.setMinVal(+newVal);
    this.slider.updateValue();
    return newValue;
  }

  static getMaxVal(): number {
    return this.slider.model.settings.settings.maxVal;
  }

  static setMaxVal(newVal: number): number {
    const newValue = this.slider.model.settings.setMaxVal(newVal);
    this.slider.updateValue();
    return newValue;
  }

  static getStepVal(): number {
    return this.slider.model.settings.settings.stepVal;
  }

  static setStepVal(newVal: number): number {
    const newValue = this.slider.model.settings.setStepVal(newVal);
    this.slider.updateValue();
    return newValue;
  }

  static getValue(): number {
    return this.slider.model.settings.settings.value;
  }

  static setValue(newVal: number): number {
    const newValue = this.slider.model.settings.setValue(newVal);
    this.slider.updateValue();
    return newValue;
  }

  static getOrientation(): string {
    return this.slider.model.settings.settings.orientation;
  }

  static setOrientation(newVal: string): string {
    const newValue = this.slider.model.settings.setOrientation(newVal);
    const rootElement = this.slider.view.slider;
    this.slider.view.destroy();
    this.slider.view = undefined;
    this.slider.createView(rootElement);
    this.slider.updateValue();
    return newValue;
  }

  static getValues(numberCurrent?: number): number[] | number {
    if (numberCurrent === undefined)
      return this.slider.model.settings.settings.values;
    return this.slider.model.settings.settings.values[numberCurrent];
  }

  static setValues(
    newVal: number[] | number,
    numberCurrent?: number,
  ): number[] | number {
    if (numberCurrent === undefined) {
      const newValue = this.slider.model.settings.setValues(<number[]>newVal);
      this.slider.updateValue();
      return newValue;
    }
    const tmp: number[] = this.slider.model.settings.settings.values;
    tmp[numberCurrent] = <number>newVal;
    this.slider.model.settings.setValues(<number[]>tmp);

    this.slider.updateValue();
    return this.slider.model.settings.settings.values[numberCurrent];
  }

  static checkValuesSetterType(valuesOneOfTwoVals: any, value: any) {
    const isValueNumber = typeof value === 'number';
    const isOneOfValuesUndefined = valuesOneOfTwoVals === undefined;

    if (isOneOfValuesUndefined && !isValueNumber) {
      return this.setValues(<number[]>value);
    }
    if (isOneOfValuesUndefined && isValueNumber) {
      return this.getValues(value);
    }
    if (!isOneOfValuesUndefined && isValueNumber) {
      return this.setValues(valuesOneOfTwoVals, <number>value);
    }
  }
}

export { PresenterAPI };
export default PresenterAPI;
