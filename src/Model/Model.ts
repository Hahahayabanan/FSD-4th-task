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

  calculateValueWithStep(newValue: number) {
    const { min, max, step } = this.settings.settings;
    const currentValue: number = newValue - min;
    const currentValueWithoutStep: number = Math.round(currentValue / step);
    let currentValueWithStep: number = currentValueWithoutStep * step + min;
    if (currentValueWithStep > max) currentValueWithStep = max;

    return currentValueWithStep;
  }

  calculatePercentsToValue(curPosInPercents: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;
    const curPosInValue: number = (rangeVal * curPosInPercents) / 100;

    return curPosInValue + min;
  }

  calculateValueToPercents(curPosInValue: number): number {
    const { min, max } = this.settings.settings;
    const rangeVal: number = max - min;
    const currPosInPercents: number = ((curPosInValue - min) * 100) / rangeVal;

    return currPosInPercents;
  }

  setCalculatedValue(curPosInPercents: number, updateObject: string) {
    const newValue: number = this.calculatePercentsToValue(curPosInPercents);
    const newValueWithStep: number = this.calculateValueWithStep(newValue);
    switch (updateObject) {
      case 'firstValue':
        this.settings.setSetting('values', newValueWithStep, 0);
        break;
      case 'secondValue':
        this.settings.setSetting('values', newValueWithStep, 1);
        break;
      case 'singleValue':
        this.settings.setSetting('value', newValueWithStep);
        break;
      default:
    }
    this.dispatchValue();
  }

  setCalculatedStartValues() {
    if (this.getSetting('isRange')) {
      const values: number[] = this.getSetting('values');
      const valuesWithStep: number[] = values.map(val => this.calculateValueWithStep(val));
      this.settings.setSetting('values', valuesWithStep);
    } else {
      const value: number = this.getSetting('value');
      const valueWithStep: number = this.calculateValueWithStep(value);
      this.settings.setSetting('value', valueWithStep);
    }
    this.dispatchValue();
  }

  dispatchValue() {
    if (this.getSetting('isRange')) {
      const newValues: number[] = this.getSetting('values');
      const newValuesInPercents: number[] = newValues.map(val => this.calculateValueToPercents(val));
      this.valuesObserver.broadcast({ newValues, newValuesInPercents });
    } else {
      const newValue: number = this.getSetting('value');
      const newValueInPercents: number = this.calculateValueToPercents(newValue);
      this.valuesObserver.broadcast({ newValue, newValueInPercents });
    }
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
