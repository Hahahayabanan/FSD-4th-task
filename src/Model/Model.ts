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

  private dispatchValue() {
    const newFrom: number = this.getSetting('from');
    const newFromInPercents: number = this.calculateValueToPercents(newFrom);
    const newTo: number = this.getSetting('to');
    const newToInPercents: number = this.calculateValueToPercents(newTo);
    this.valuesObserver.broadcast({
      newFrom, newTo, newFromInPercents, newToInPercents,
    });
  }

  private dispatchSettings() {
    const {
      isRange, orientation, hasTip, hasLine,
    } = this.getSettings();
    this.settingsObserver.broadcast({
      isRange, orientation, hasTip, hasLine,
    });
    this.dispatchValue();
  }

  applyValue(curPosInPercents: number, updateValue: string) {
    const newValue: number = this.calculatePercentsToValue(curPosInPercents);
    const newValueWithStep: number = this.calculateValueWithStep(newValue);
    switch (updateValue) {
      case 'first':
        this.settings.setSetting('from', newValueWithStep);
        break;
      case 'second':
        this.settings.setSetting('to', newValueWithStep);
        break;
      default:
    }
    this.dispatchValue();
  }

  applyStartValues() {
    const from: number = this.getSetting('from');
    const fromWithStep = this.calculateValueWithStep(from);
    this.settings.setSetting('from', fromWithStep);
    if (this.getSetting('isRange')) {
      const to: number = this.getSetting('to');
      const toWithStep = this.calculateValueWithStep(to);
      this.settings.setSetting('to', toWithStep);
    }
    this.dispatchValue();
  }

  setSettings(settings: ISliderSettings) {
    this.settings.setSettings(settings);
    this.dispatchSettings();
  }

  getSettings(): ISliderSettings {
    return this.settings.settings;
  }

  setSetting(setting:string,
    newValue: number | string | boolean) {
    this.settings.setSetting(setting, newValue);
    this.dispatchSettings();
  }

  getSetting(setting: string) {
    return this.settings.getSetting(setting);
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
}

export { Model };

export default Model;
