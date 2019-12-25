import { EventObserver } from '../EventObserver/EventObserver';
import ISliderSettings from './ISliderSettings';
import defaultSettings from './defaultSettings';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class Model {
  private settings: ISliderSettings;

  public valuesObserver: EventObserver = new EventObserver();

  public settingsObserver: EventObserver = new EventObserver();

  constructor(settings?: ISliderSettings) {
    this.settings = { ...defaultSettings };
    this.applySettings(settings);
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
    if (this.isDefined(min)) {
      this.settings.min = this.validateMin(settings);
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
    if (this.isDefined(max)) {
      this.settings.max = this.validateMax(settings);
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
    if (this.isDefined(step)) {
      this.settings.step = this.validateStep(settings);
      this.setSettings({ from: this.settings.from, to: this.settings.to });
    }
    if (this.isDefined(from)) this.settings.from = this.validateFrom(settings);
    if (this.isDefined(to)) {
      this.settings.to = this.validateTo(settings);
      this.setSettings({ from });
    }
    if (this.isDefined(isRange)) {
      this.settings.isRange = isRange;
      const isSecondSmallerFirst = this.settings.isRange
        && (this.settings.to === null || (this.settings.to <= this.settings.from));
      if (isSecondSmallerFirst) this.setSettings({ to: this.settings.max });
    }
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

  calculateValueWithStep(value: number) {
    const { min, step } = this.getSettings();
    return Math.round((value - min) / step) * step + min;
  }

  calculatePercentsToValue(curPosInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * curPosInPercents) / 100 + min;
  }

  calculateValueToPercents(curPosInValue: number): number {
    const { min, max } = this.getSettings();
    return ((curPosInValue - min) * 100) / (max - min);
  }

  private dispatchValue() {
    const { from, to } = this.getSettings();
    const fromInPercents: number = this.calculateValueToPercents(from);
    const toInPercents: number = this.calculateValueToPercents(to);
    this.valuesObserver.broadcast({
      from, to, fromInPercents, toInPercents,
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

  private validateMin(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMinBiggerMax = min >= (max || this.settings.max);
    if (isMinBiggerMax) {
      new ErrorMessage('MAX', 'min');
      return this.settings.min;
    }
    return min;
  }

  private validateMax(newSettings: ISliderSettings) {
    const { min, max } = newSettings;
    const isMaxSmallerMin = max <= (min || this.settings.min);
    if (isMaxSmallerMin) {
      new ErrorMessage('MIN', 'max');
      return this.settings.max;
    }
    return max;
  }

  private validateStep(newSettings: ISliderSettings) {
    const { step } = newSettings;
    const { max, min } = this.getSettings();
    const isStepInvalid = step <= 0 || step > max - min;
    if (isStepInvalid) {
      new ErrorMessage('STEP', 'step');
      return this.settings.step;
    }
    return step;
  }

  private validateFrom(newSettings: ISliderSettings) {
    let { from } = newSettings;
    const to = newSettings.to || this.settings.to;
    const {
      step, min, max, isRange
    } = this.getSettings();
    from = this.calculateValueWithStep(from);
    const isValueBiggerSecond = from >= to - step;
    if (isRange && isValueBiggerSecond) {
      return to - step > min ? to - step : min;
    }
    if (from > max) return max;
    if (from < min) return min;
    return from;
  }

  private validateTo(newSettings: ISliderSettings) {
    let { to } = newSettings;
    const {
      from, step, min, max
    } = this.getSettings();
    to = this.calculateValueWithStep(to);
    const isValueSmallerFirst = to <= from + step;
    if (isValueSmallerFirst) {
      return from + step < max ? from + step : max;
    }
    if (to > max) return max;
    if (to < min) return min;
    return to;
  }
}

export { Model };

export default Model;
