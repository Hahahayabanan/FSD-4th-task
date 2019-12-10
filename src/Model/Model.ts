import { EventObserver } from '../EventObserver/EventObserver';
import ISliderSettings from './ISliderSettings';
import defaultSettings from './defaultSettings';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class Model {
  private settings: ISliderSettings;

  public valuesObserver: EventObserver = new EventObserver();

  public settingsObserver: EventObserver = new EventObserver();

  constructor(settings?: object) {
    this.settings = { ...defaultSettings };
    this.setSettings(settings);
  }

  getSettings() {
    return { ...this.settings };
  }

  setSettings(newSettings: ISliderSettings = {}) {
    const settings = newSettings;

    Object.keys(settings).forEach(key => {
      settings[key] = this.validateSettingType(key, settings[key]);
    });

    const {
      min, max, step, hasLine, hasTip, isRange, from, to, isVertical,
    } = settings;

    if (this.isDefined(hasTip)) this.settings.hasTip = hasTip;
    if (this.isDefined(hasLine)) this.settings.hasLine = hasLine;
    if (this.isDefined(isVertical)) this.settings.isVertical = isVertical;
    if (this.isDefined(min)) this.setMin(settings);
    if (this.isDefined(max)) this.setMax(settings);
    if (this.isDefined(step)) this.setStep(settings);
    if (this.isDefined(from)) this.setFrom(settings);
    if (this.isDefined(to)) this.setTo(settings);
    if (this.isDefined(isRange)) this.setIsRange(settings);
  }

  applySettings(settings: ISliderSettings) {
    this.setSettings(settings);
    this.dispatchSettings();
  }

  applyValue(curPosInPercents: number, updateValue: string) {
    const newValue: number = this.calculatePercentsToValue(curPosInPercents);
    switch (updateValue) {
      case 'first':
        this.setSettings({ from: newValue });
        break;
      case 'second':
        this.setSettings({ to: newValue });
        break;
      default:
    }
    this.dispatchValue();
  }

  applyStartValues() {
    this.dispatchValue();
  }

  calculateValueWithStep(newValue: number) {
    const { min, max, step } = this.getSettings();
    const currentValue: number = newValue - min;
    const currentValueWithoutStep: number = Math.round(currentValue / step);
    let currentValueWithStep: number = currentValueWithoutStep * step + min;
    if (currentValueWithStep > max) currentValueWithStep = max;
    if (currentValueWithStep < min) currentValueWithStep = min;

    return currentValueWithStep;
  }

  calculatePercentsToValue(curPosInPercents: number): number {
    const { min, max } = this.getSettings();
    const rangeVal: number = max - min;
    const curPosInValue: number = (rangeVal * curPosInPercents) / 100;

    return curPosInValue + min;
  }

  calculateValueToPercents(curPosInValue: number): number {
    const { min, max } = this.getSettings();
    const rangeVal: number = max - min;
    const currPosInPercents: number = ((curPosInValue - min) * 100) / rangeVal;

    return currPosInPercents;
  }

  private dispatchValue() {
    const { from, to } = this.getSettings();
    const newFrom: number = from;
    const newTo: number = to;
    const newFromInPercents: number = this.calculateValueToPercents(newFrom);
    const newToInPercents: number = this.calculateValueToPercents(newTo);
    this.valuesObserver.broadcast({
      newFrom, newTo, newFromInPercents, newToInPercents,
    });
  }

  private dispatchSettings() {
    const {
      isRange, isVertical, hasTip, hasLine,
    } = this.getSettings();
    this.settingsObserver.broadcast({
      isRange, isVertical, hasTip, hasLine,
    });
    this.dispatchValue();
  }

  private validateSettingType(key: string, value: ISliderSettings[keyof ISliderSettings]) {
    switch (key) {
      case 'min': return this.validateNumber(value);
      case 'max': return this.validateNumber(value);
      case 'step': return this.validateNumber(value);
      case 'from': return this.validateNumber(value);
      case 'to': return this.validateNumber(value);
      case 'isVertical': return this.validateBoolean(value);
      case 'isRange': return this.validateBoolean(value);
      case 'hasLine': return this.validateBoolean(value);
      case 'hasTip': return this.validateBoolean(value);
      default:
    }
  }

  private validateNumber(value: ISliderSettings[keyof ISliderSettings]): number | null {
    return !isNaN(parseFloat(`${value}`)) ? parseFloat(`${value}`) : null;
  }

  private validateBoolean(value: ISliderSettings[keyof ISliderSettings]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private isDefined(value: ISliderSettings[keyof ISliderSettings]) {
    return value !== undefined && value !== null;
  }

  private setMin(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMinBiggerMax = min >= (max || this.settings.max);
    if (isMinBiggerMax) new ErrorMessage('MAX', 'min');
    else {
      this.settings.min = min;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  private setMax(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMaxSmallerMin = max <= (min || this.settings.min);
    if (isMaxSmallerMin) new ErrorMessage('MIN', 'max');
    else {
      this.settings.max = max;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  private setStep(newSettings: ISliderSettings) {
    const { step } = newSettings;
    const isStepValid = step < 0 && step > this.settings.max - this.settings.min;
    if (isStepValid) new ErrorMessage('STEP', 'step');
    else {
      this.settings.step = step;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  private setFrom(newSettings: ISliderSettings) {
    const { from, to } = newSettings;
    const isValueBiggerSecond = from >= (to || this.settings.to) - this.settings.step;
    this.settings.from = this.calculateValueWithStep(from);
    if (this.settings.isRange && isValueBiggerSecond) {
      const valueMinusStep = this.settings.to - this.settings.step;
      this.settings.from = valueMinusStep > this.settings.min
        ? valueMinusStep : this.settings.min;
    }
  }

  private setTo(newSettings: ISliderSettings) {
    const { to } = newSettings;
    const valuePlusStep = this.settings.from + this.settings.step;
    const isValueSmallerFirst = to <= valuePlusStep;
    this.settings.to = this.calculateValueWithStep(to);
    if (isValueSmallerFirst) {
      this.settings.to = valuePlusStep < this.settings.max ? valuePlusStep : this.settings.max;
      this.setSettings({ from: this.settings.from });
    }
  }

  private setIsRange(newSettings: ISliderSettings) {
    const { isRange } = newSettings;
    const isSecondSmallerFirst = this.settings.to === null
      || (this.settings.to <= this.settings.from);
    this.settings.isRange = isRange;
    if (isSecondSmallerFirst) this.setSettings({ to: this.settings.max });
  }
}

export { Model };

export default Model;
