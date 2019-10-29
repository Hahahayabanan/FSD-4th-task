import { isArray } from 'util';
import { SliderSettings } from './SliderSettings';

class Model {
  private settings: SliderSettings;

  constructor(sett?: object) {
    this.settings = new SliderSettings(sett);
  }

  setSettings(sett: object) {
    this.settings = new SliderSettings(sett);
  }

  getSettings() {
    return this.settings;
  }

  calcPointerPosition(pos: number[]): number[];

  calcPointerPosition(pos: number): number;

  calcPointerPosition(pos: any) {
    const { min, max } = this.settings.settings;
    const { step } = this.settings.settings;

    if (isArray(pos)) {
      const firstCurrentValue = pos[0] - min;
      const secondCurrentValue = pos[1] - min;
      let values: number[] = [firstCurrentValue, secondCurrentValue];

      const firstCurrentValueWithoutStep = Math.round(values[0] / step);
      const secondCurrentValueWithoutStep = Math.round(values[1] / step);

      const currentStep: number[] = [
        firstCurrentValueWithoutStep,
        secondCurrentValueWithoutStep,
      ];

      let firstCurrentValueWithStep = currentStep[0] * step + min;
      let secondCurrentValueWithStep = currentStep[1] * step + min;

      if (firstCurrentValueWithStep > max) firstCurrentValueWithStep = max;
      if (secondCurrentValueWithStep > max) secondCurrentValueWithStep = max;

      values = [firstCurrentValueWithStep, secondCurrentValueWithStep];
      this.settings.setValues(values);
      return values;
    }

    let currentValue: number = pos - min;
    const currentStep: number = Math.round(currentValue / step);
    currentValue = currentStep * step;
    currentValue += min;
    if (currentValue > max) currentValue = max;
    this.settings.setValue(currentValue);
    return currentValue;
  }

  calculateFromPercentsToValue(curPosInPercents: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;

    const curPosInValue: number = (rangeVal * curPosInPercents) / 100;

    return curPosInValue + min;
  }

  calculateFromValueToPercents(curPosInValue: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;

    const currPosInPercents: number = ((curPosInValue - min) * 100) / rangeVal;

    return currPosInPercents;
  }

  setRange(tmp: boolean) {
    this.settings.setRange(tmp);
  }

  setMin(tmp: number) {
    this.settings.setMin(tmp);
  }

  setMax(tmp: number) {
    this.settings.setMax(tmp);
  }

  setStep(tmp: number) {
    this.settings.setStep(tmp);
  }

  setValue(tmp: number, newValue?: number) {
    this.settings.setValue(tmp, newValue);
  }

  setValues(tmp: number[]) {
    this.settings.setValues(tmp);
  }

  setOrientation(tmp: string) {
    this.settings.setOrientation(tmp);
  }

  setHasTip(tmp: boolean) {
    this.settings.setHasTip(tmp);
  }

  getRange(): boolean {
    return this.settings.settings.range;
  }

  getMin(): number {
    return this.settings.settings.min;
  }

  getMax(): number {
    return this.settings.settings.max;
  }

  getStep(): number {
    return this.settings.settings.step;
  }

  getValue(): number {
    return this.settings.settings.value;
  }

  getValues(number?: number): number | number[] {
    if (number !== undefined) {
      return this.settings.settings.values[number];
    }
    return this.settings.settings.values;
  }

  getOrientation(): string {
    return this.settings.settings.orientation;
  }

  getHasTip(): boolean {
    return this.settings.settings.hasTip;
  }
}

export { Model };

export default Model;
