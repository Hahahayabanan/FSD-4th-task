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

  setPointerPosition(pos: number[]): number[];

  // eslint-disable-next-line no-dupe-class-members
  setPointerPosition(pos: number): number;

  // eslint-disable-next-line no-dupe-class-members
  setPointerPosition(pos: any) {
    const { minVal } = this.settings.settings;
    const step:number = this.settings.settings.stepVal;

    if (isArray(pos)) {
      let curVals:number[] = [pos[0] - minVal, pos[1] - minVal];
      const currentStep:number[] = [Math.round(curVals[0] / step), Math.round(curVals[1] / step)];
      curVals = [(currentStep[0] * step) + minVal, (currentStep[1] * step) + minVal];
      this.settings.settings.values = curVals;
      return curVals;
    }

    let curVal:number = pos - minVal;
    const currentStep:number = Math.round(curVal / step);
    curVal = currentStep * step;
    curVal += minVal;
    this.settings.settings.value = curVal;
    return curVal;
  }
}

export {
  Slider,
};

export default Slider;
