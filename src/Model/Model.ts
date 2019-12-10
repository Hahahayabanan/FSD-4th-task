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

  setMin(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMinBiggerMax = min >= (max || this.settings.max);
    if (isMinBiggerMax) new ErrorMessage('MAX', 'min');
    else {
      this.settings.min = min;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  setMax(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMaxSmallerMin = max <= (min || this.settings.min);
    if (isMaxSmallerMin) new ErrorMessage('MIN', 'max');
    else {
      this.settings.max = max;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  setStep(newSettings: ISliderSettings) {
    const { step } = newSettings;
    const isStepValid = step < 0 && step > this.settings.max - this.settings.min;
    if (isStepValid) new ErrorMessage('STEP', 'step');
    else {
      this.settings.step = step;
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
  }

  setFrom(newSettings: ISliderSettings) {
    const { from, to } = newSettings;
    const isValueBiggerSecond = from >= (to || this.settings.to) - this.settings.step;
    this.settings.from = this.calculateValueWithStep(from);
    if (this.settings.isRange && isValueBiggerSecond) {
      const valueMinusStep = this.settings.to - this.settings.step;
      this.settings.from = valueMinusStep > this.settings.min
        ? valueMinusStep : this.settings.min;
    }
  }

  setTo(newSettings: ISliderSettings) {
    const { to } = newSettings;
    const valuePlusStep = this.settings.from + this.settings.step;
    const isValueSmallerFirst = to <= valuePlusStep;
    this.settings.to = this.calculateValueWithStep(to);
    if (isValueSmallerFirst) {
      this.settings.to = valuePlusStep < this.settings.max ? valuePlusStep : this.settings.max;
      this.setSettings({ from: this.settings.from });
    }
  }

  setIsRange(newSettings: ISliderSettings) {
    const { isRange } = newSettings;
    const isSecondSmallerFirst = this.settings.to === null
      || (this.settings.to <= this.settings.from);
    this.settings.isRange = isRange;
    if (isSecondSmallerFirst) this.setSettings({ to: this.settings.max });
  }

  setSettings(settings: ISliderSettings = {}) {
    const {
      min, max, step, hasLine, hasTip, isRange, from, to, isVertical,
    } = settings;

    if (this.settings.from === null) this.settings.from = this.settings.min;

    if (hasTip !== undefined) this.settings.hasTip = hasTip;
    if (hasLine !== undefined) this.settings.hasLine = hasLine;
    if (isVertical !== undefined) this.settings.isVertical = isVertical;
    if (min !== undefined) this.setMin(settings);
    if (max !== undefined) this.setMax(settings);
    if (step !== undefined) this.setStep(settings);
    if (from !== undefined) this.setFrom(settings);
    if (to !== undefined) this.setTo(settings);
    if (isRange !== undefined) this.setIsRange(settings);
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
}

export { Model };

export default Model;
