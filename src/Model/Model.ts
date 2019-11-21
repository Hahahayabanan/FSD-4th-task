import { isArray } from 'util';
import { SliderSettings } from './SliderSettings';
import { EventObserver } from '../EventObserver/EventObserver';
import { ISliderSettings } from '../helpers/interfaces';

class Model {
  private settings: SliderSettings;

  public valuesObserver: EventObserver = new EventObserver();

  public settingsObserver: EventObserver = new EventObserver();

  constructor(settings?: object) {
    this.settings = new SliderSettings(settings);
  }

  getSettings(): ISliderSettings {
    return this.settings.settings;
  }

  calculateValueWithStep(pos: number[]): number[];

  calculateValueWithStep(pos: number): number;

  calculateValueWithStep(pos: any) {
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
      return values;
    }

    let currentValue: number = pos - min;
    const currentStep: number = Math.round(currentValue / step);
    currentValue = currentStep * step;
    currentValue += min;
    if (currentValue > max) currentValue = max;
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

  setCalculatedValue(curPosInPercents: number, updateObject: string) {
    const curPosInValue: number = this.calculateFromPercentsToValue(curPosInPercents);
    const curPosInValueWithStep: number = this.calculateValueWithStep(
      curPosInValue,
    );
    switch (updateObject) {
      case 'firstValue':
        this.settings.setSetting('values', curPosInValueWithStep, 0);
        break;
      case 'secondValue':
        this.settings.setSetting('values', curPosInValueWithStep, 1);
        break;
      case 'singleValue':
        this.settings.setSetting('value', curPosInValueWithStep);
        break;
      default:
    }
    this.dispatchValue();
  }

  setCalculatedStartValues() {
    if (this.getSetting('isRange')) {
      const values: number[] = this.getSetting('values') as number[];
      const valuesWithStep: number[] = values.map(val => this.calculateValueWithStep(val));
      this.settings.setSetting('values', valuesWithStep);
    } else {
      const curPosInValue: number = this.getSetting('value');
      const curPosInValueWithStep: number = this.calculateValueWithStep(
        curPosInValue,
      );
      this.settings.setSetting('value', curPosInValueWithStep);
    }
    this.dispatchValue();
  }

  dispatchValue() {
    const newValues = this.getSetting('isRange') ? this.getSetting('values') : this.getSetting('value');
    this.valuesObserver.broadcast({ newValues });
  }

  dispatchSettings() {
    const {
      isRange, orientation, hasTip, hasLine,
    } = this.getSettings();
    this.settingsObserver.broadcast({
      isRange, orientation, hasTip, hasLine,
    });
    this.dispatchValue();
  }

  setSetting(setting:string,
    newValue: number | number[] | string | boolean,
    currentValueNumber?: number) {
    this.settings.setSetting(setting, newValue, currentValueNumber);
    this.dispatchSettings();
  }

  getSetting(setting: string) {
    return this.settings.getSetting(setting);
  }
}

export { Model };

export default Model;
