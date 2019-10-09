import { isArray } from 'util';
import { SliderSettings } from './SliderSettings';

class Slider {
  public settings: SliderSettings;

  constructor(sett?: object) {
    this.settings = new SliderSettings(sett);
  }

  setSettings(sett: object) {
    this.settings = new SliderSettings(sett);
  }

  calcPointerPosition(pos: number[]): number[];

  calcPointerPosition(pos: number): number;

  calcPointerPosition(pos: any) {
    const { minVal, maxVal } = this.settings.settings;
    const step: number = this.settings.settings.stepVal;

    if (isArray(pos)) {
      const firstCurVal = pos[0] - minVal;
      const secondCurVal = pos[1] - minVal;
      let curVals: number[] = [firstCurVal, secondCurVal];

      const firstCurValWithoutStep = Math.round(curVals[0] / step);
      const secondCurValWithoutStep = Math.round(curVals[1] / step);

      const currentStep: number[] = [
        firstCurValWithoutStep,
        secondCurValWithoutStep,
      ];

      let firstCurValWithStep = currentStep[0] * step + minVal;
      let secondCurValWithStep = currentStep[1] * step + minVal;

      if (firstCurValWithStep > maxVal) firstCurValWithStep = maxVal;
      if (secondCurValWithStep > maxVal) secondCurValWithStep = maxVal;

      curVals = [firstCurValWithStep, secondCurValWithStep];
      this.settings.setValues(curVals);
      return curVals;
    }

    let curVal: number = pos - minVal;
    const currentStep: number = Math.round(curVal / step);
    curVal = currentStep * step;
    curVal += minVal;
    if (curVal > maxVal) curVal = maxVal;
    this.settings.setValue(curVal);
    return curVal;
  }

  calculateFromPercentsToValue(curPosInPercents: number): number {
    const { minVal, maxVal } = this.settings.settings;
    const rangeVal: number = maxVal - minVal;

    const curPosInValue: number = (rangeVal * curPosInPercents) / 100;

    return curPosInValue + minVal;
  }

  calculateFromValueToPercents(curPosInValue: number): number {
    const { minVal, maxVal } = this.settings.settings;
    const rangeVal: number = maxVal - minVal;

    const currPosInPercents: number =
      ((curPosInValue - minVal) * 100) / rangeVal;

    return currPosInPercents;
  }
}

export { Slider };

export default Slider;
