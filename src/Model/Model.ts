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

  setSettings(settings: ISliderSettings = {}) {
    const {
      min, max, step, hasLine, hasTip, isRange, from, to, isVertical,
    } = settings;

    const setMin = () => {
      const isMinBiggerMax = min >= (max || this.settings.max);
      if (isMinBiggerMax) new ErrorMessage('MAX', 'min');
      else {
        this.settings.min = min;
        this.setSettings({ from: this.settings.from, to: this.settings.to });
      }
    };

    const setMax = () => {
      const isMaxSmallerMin = max <= (min || this.settings.min);
      if (isMaxSmallerMin) new ErrorMessage('MIN', 'max');
      else {
        this.settings.max = max;
        this.setSettings({ from: this.settings.from, to: this.settings.to });
      }
    };

    const setFrom = () => {
      const isValueBiggerSecond = from >= this.settings.to - this.settings.step;
      this.settings.from = this.calculateValueWithStep(from);
      if (this.settings.isRange && isValueBiggerSecond) {
        const valueMinusStep = this.settings.to - this.settings.step;
        this.settings.from = valueMinusStep > this.settings.min
          ? valueMinusStep : this.settings.min;
      }
    };

    const setTo = () => {
      const valuePlusStep = this.settings.from + this.settings.step;
      const isValueSmallerFirst = to <= valuePlusStep;
      this.settings.to = this.calculateValueWithStep(to);
      if (isValueSmallerFirst) {
        this.settings.to = valuePlusStep < this.settings.max ? valuePlusStep : this.settings.max;
        this.setSettings({ from: this.settings.from });
      }
    };

    const setStep = () => {
      const isStepValid = step < 0 && step > this.settings.max - this.settings.min;
      if (isStepValid) new ErrorMessage('STEP', 'step');
      else {
        this.settings.step = step;
        this.setSettings({ from: this.settings.from, to: this.settings.to });
      }
    };

    const setIsRange = () => {
      const isSecondSmallerFirst = this.settings.to === null
        || (this.settings.to <= this.settings.from);
      this.settings.isRange = isRange;
      if (isSecondSmallerFirst) this.setSettings({ to: this.settings.max });
    };

    if (this.settings.from === null) this.settings.from = this.settings.min;

    if (hasTip !== undefined) this.settings.hasTip = hasTip;
    if (hasLine !== undefined) this.settings.hasLine = hasLine;
    if (isVertical !== undefined) this.settings.isVertical = isVertical;
    if (min !== undefined) setMin();
    if (max !== undefined) setMax();
    if (step !== undefined) setStep();
    if (from !== undefined) setFrom();
    if (to !== undefined) setTo();
    if (isRange !== undefined) setIsRange();
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
