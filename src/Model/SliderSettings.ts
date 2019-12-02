import { ISliderSettings } from '../helpers/interfaces';

class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    isRange: false,
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    from: null,
    to: null,
    hasTip: false,
    hasLine: true,
  };

  public settings: ISliderSettings;

  public errors = {
    minBiggerMax: 'Min slider range value cant be bigger than max value',
    stepBiggerMaxMin: 'Step cant be bigger than min and max range',
    notValidOrientation:
      'Orientation of slider has only two values "horizontal" or "vertical"',
  };

  constructor(settings?: ISliderSettings) {
    this.setDefaultSettings();
    this.setSettings(settings);
  }

  getSetting(setting: string) {
    return this.settings[setting];
  }

  setSettings(settings: ISliderSettings) {
    Object.keys(settings).forEach(val => {
      this.setSetting(val, settings[val]);
    });
  }

  setDefaultSettings() {
    this.settings = this.defaultSettings;
  }

  setSetting(setting: string,
    newValue: number | string | boolean) {
    try {
      const isSecondSmallerFirst = this.settings.to === null
        || this.settings.to <= this.settings.from;
      if (typeof newValue === 'boolean') {
        switch (setting) {
          case 'isRange':
            this.settings.isRange = newValue;
            if (isSecondSmallerFirst) this.setTo(this.settings.max);
            break;
          case 'hasTip':
            this.settings.hasTip = newValue;
            break;
          case 'hasLine':
            this.settings.hasLine = newValue;
            break;
          default:
        }
      }

      if (typeof newValue === 'number') {
        switch (setting) {
          case 'min':
            this.setMin(newValue);
            break;
          case 'max':
            this.setMax(newValue);
            break;
          case 'step':
            this.setStep(newValue);
            break;
          case 'from':
            this.setFrom(newValue);
            break;
          case 'to':
            this.setTo(newValue);
            break;
          default:
        }
      }

      if (typeof newValue === 'string') {
        this.setOrientation(newValue);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private setMin(newMin: number) {
    try {
      if (newMin >= (this.settings.max + this.settings.step)) {
        throw this.errors.minBiggerMax;
      }
      if (newMin > this.settings.from) {
        this.settings.from = newMin;
      }
      if (this.settings.isRange && newMin >= this.settings.to) {
        this.settings.from = newMin;
        this.settings.to = Number(newMin) + this.settings.step;
      }
      this.settings.min = newMin;
    } catch (err) {
      console.error(err);
    }
  }

  private setMax(newMax: number) {
    try {
      if (newMax <= (this.settings.min - this.settings.step)) {
        throw this.errors.minBiggerMax;
      }
      if (newMax < this.settings.from) {
        this.settings.from = newMax;
      }
      if (this.settings.isRange && newMax <= this.settings.to) {
        this.settings.to = newMax;
        this.settings.from = newMax - this.settings.step;
      }
      this.settings.max = newMax;
    } catch (err) {
      console.error(err);
    }
  }

  private setStep(tmp: number) {
    try {
      const valueRange = this.settings.max - this.settings.min;
      const stepBiggerZero = tmp > 0;
      const stepSmallerRange = tmp < valueRange;
      if (stepBiggerZero && stepSmallerRange) {
        this.settings.step = tmp;
      } else {
        this.settings.step = this.defaultSettings.step;
        throw this.errors.stepBiggerMaxMin;
      }
    } catch (err) {
      console.error(err);
    }
  }

  private setFrom(newValue: number) {
    const isValueSmallerMin = newValue < this.settings.min;
    const isValueNull = newValue === null;
    const isValueBiggerMax = newValue > this.settings.max;
    const isValueBiggerSecond = newValue >= this.settings.to;
    const isRangeAndValueBiggerSecond = this.settings.isRange
      && (isValueBiggerMax || isValueBiggerSecond);

    if (!isValueBiggerMax && !isValueSmallerMin) {
      this.settings.from = newValue;
    }
    if (isValueBiggerMax) this.settings.from = this.settings.max;
    if (isRangeAndValueBiggerSecond) this.settings.from = this.settings.to - this.settings.step;
    if (isValueSmallerMin) this.settings.from = this.settings.min;
    if (isValueNull) {
      this.settings.from = this.settings.min;
    }
  }

  private setTo(newValue: number) {
    const isValueSmallerMin = newValue < this.settings.min;
    const isValueNull = newValue === null;
    const isValueBiggerMax = newValue > this.settings.max;
    const isValueSmallerFirst = newValue <= this.settings.from;

    if (!isValueBiggerMax && !isValueSmallerMin) {
      this.settings.to = newValue;
    }
    if (isValueBiggerMax) this.settings.to = this.settings.max;
    if (isValueSmallerMin || isValueSmallerFirst) {
      const valuePlusStep = this.settings.from + this.settings.step;
      this.settings.to = valuePlusStep < this.settings.max ? valuePlusStep : this.settings.max;
      this.setFrom(this.settings.from);
    }
    if (isValueNull) {
      this.settings.from = this.settings.max;
    }
  }

  private setOrientation(newOrientation: string) {
    const orientation = {
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    };
    const isOrientationVertical = newOrientation !== orientation.VERTICAL;
    const isOrientationHorizontal = newOrientation !== orientation.HORIZONTAL;
    const isOrientationNotSet = isOrientationVertical && isOrientationHorizontal;
    try {
      if (isOrientationNotSet) {
        this.settings.orientation = this.defaultSettings.orientation;
        throw this.errors.notValidOrientation;
      } else {
        this.settings.orientation = newOrientation;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export { SliderSettings };

export default SliderSettings;
