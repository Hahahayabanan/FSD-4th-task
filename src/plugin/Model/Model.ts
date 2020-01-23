import { EventObserver } from '../EventObserver/EventObserver';
import { ISliderSettings } from './ISliderSettings';
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

  setSettings(settings: ISliderSettings = {}) {
    Object.entries(settings).forEach(([key, value]) => {
      this.settings[key] = this.validateSetting(key, value, settings);
    });

    Object.keys(settings).forEach((key) => {
      const isToSmallerFrom = this.settings.isRange
        && (this.settings.to === null || (this.settings.to <= this.settings.from));
      switch (key) {
        case 'isRange':
          if (isToSmallerFrom) this.setSettings({ to: this.settings.max });
          break;
        case 'min':
        case 'max':
        case 'step':
          this.setSettings({ from: this.settings.from });
          this.setSettings({ to: this.settings.to });
          break;
        case 'to':
          this.setSettings({ from: this.settings.from });
          break;
        default:
      }
    });
  }

  applySettings(settings: ISliderSettings = {}) {
    this.setSettings(settings);

    this.dispatchSettings();
  }

  applyValue(positionInPercents: number, updateValue: string) {
    const cacheSettings = this.getSettings();
    const newValue: number = this.calculatePercentsToValue(positionInPercents);
    switch (updateValue) {
      case 'fromValue':
        this.setSettings({ from: newValue });
        break;
      case 'toValue':
        this.setSettings({ to: newValue });
        break;
      default:
    }
    const isSettingsChanged = Object.entries(cacheSettings).find(
      ([key, value]) => value !== this.getSettings()[key]
    );
    if (isSettingsChanged) this.dispatchValue();
  }

  calculateValueWithStep(value: number) {
    const { min, step } = this.getSettings();
    return Math.round((value - min) / step) * step + min;
  }

  calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }

  calculateValueToPercents(positionValue: number): number {
    const { min, max } = this.getSettings();
    return ((positionValue - min) * 100) / (max - min);
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

  private validateNumber(value: ISliderSettings[keyof ISliderSettings]): number | null {
    const parsedValue = parseFloat(`${value}`);
    const isValueNaN = Number.isNaN(parsedValue);
    return !isValueNaN ? parsedValue : null;
  }

  private validateBoolean(value: ISliderSettings[keyof ISliderSettings]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private validateSetting(
    key:string,
    value: ISliderSettings[keyof ISliderSettings],
    newSettings: ISliderSettings = {}
  ) {
    const validatedFrom = this.validateNumber(newSettings.from);
    const validatedTo = this.validateNumber(newSettings.to);
    const validatedStep = this.validateNumber(newSettings.step);
    const validatedMin = this.validateNumber(newSettings.min);
    const validatedMax = this.validateNumber(newSettings.max);
    const validatedIsRange = this.validateBoolean(newSettings.isRange);
    const from = validatedFrom !== null ? this.calculateValueWithStep(validatedFrom)
      : this.settings.from;
    const to = validatedTo !== null ? this.calculateValueWithStep(validatedTo) : this.settings.to;
    const step = validatedStep !== null ? validatedStep : this.settings.step;
    const min = validatedMin !== null ? validatedMin : this.settings.min;
    const max = validatedMax !== null ? validatedMax : this.settings.max;
    const isRange = validatedIsRange !== null ? validatedIsRange : this.settings.isRange;

    const isStepInvalid = step <= 0 || step > max - min;
    const isFromBiggerTo = from >= to - step;
    const isToSmallerFrom = to <= from + step;
    const isMaxSmallerMin = max <= (min + step);
    const isMinBiggerMax = min >= (max - step);

    switch (key) {
      case 'hasTip':
      case 'hasLine':
      case 'isVertical':
      case 'isRange':
        return this.validateBoolean(value);
      case 'min':
        if (isMinBiggerMax) {
          new ErrorMessage('MAX', 'min');
          return this.settings.min;
        }
        return min;
      case 'max':
        if (isMaxSmallerMin) {
          new ErrorMessage('MIN', 'max');
          return this.settings.max;
        }
        return max;
      case 'step':
        if (isStepInvalid) {
          new ErrorMessage('STEP', 'step');
          return this.settings.step;
        }
        return step;
      case 'from':
        if (isRange && isFromBiggerTo) return to - step > min ? to - step : min;
        if (from > max) return max;
        if (from < min) return min;
        return from;
      case 'to':
        if (isToSmallerFrom) return from + step < max ? from + step : max;
        if (to > max) return max;
        if (to < min) return min;
        return to;
      default: return null;
    }
  }
}

export { Model };

export default Model;
