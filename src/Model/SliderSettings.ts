import { ISliderSettings } from '../helpers/interfaces';

class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    isRange: false,
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    value: null,
    values: [null, null],
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

  constructor(settings: ISliderSettings) {
    this.setSettings(settings);
  }

  setSettings(settings: ISliderSettings) {
    this.setDefaultSettings();
    Object.keys(settings).forEach(val => {
      if (val === 'isRange') this.settings.isRange = settings[val];
      else this.setSetting(val, settings[val]);
    });
  }

  setDefaultSettings() {
    this.settings = this.defaultSettings;
  }

  setSetting(setting: string,
    newValue: number | number[] | string | boolean,
    currentValueNumber?: number) {
    try {
      const isSecondValueNull = this.settings.values[1] === null;
      const isSecondValueSmallerValue = this.settings.values[1] < this.settings.value;
      if (typeof newValue === 'boolean') {
        switch (setting) {
          case 'isRange':
            this.settings.isRange = newValue;
            if (this.settings.isRange) {
              if (isSecondValueSmallerValue || isSecondValueNull) {
                this.setSingleValueInRange(this.settings.max, 1);
              }
              this.setSingleValueInRange(this.settings.value, 0);
            } else {
              this.setValue(this.settings.values[0]);
            }
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
          case 'value':
            this.setValue(newValue);
            break;
          case 'values':
            this.setSingleValueInRange(newValue, currentValueNumber);
            break;
          default:
        }
      }

      if (typeof newValue === 'string') {
        this.setOrientation(newValue);
      }

      if (newValue instanceof Array) {
        this.setValues(newValue);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getSetting(setting: string) {
    return this.settings[setting];
  }

  setMin(newMin: number) {
    try {
      if (newMin >= this.settings.max) {
        throw this.errors.minBiggerMax;
      }
      if (newMin > this.settings.value) {
        this.settings.value = newMin;
      }
      if (newMin > this.settings.values[0]) {
        this.settings.values[0] = newMin;
      }
      if (newMin >= this.settings.values[1]) {
        this.settings.values[0] = newMin;
        this.settings.values[1] = Number(newMin) + this.settings.step;
      }
      this.settings.min = newMin;
    } catch (err) {
      console.error(err);
    }
  }

  setMax(newMax: number) {
    try {
      if (newMax <= this.settings.min) {
        throw this.errors.minBiggerMax;
      }
      if (newMax < this.settings.value) {
        this.settings.value = newMax;
      }
      if (newMax < this.settings.values[1]) {
        this.settings.values[1] = newMax;
      }
      if (newMax <= this.settings.values[1]) {
        this.settings.values[1] = newMax;
        this.settings.values[0] = newMax - this.settings.step;
      }
      this.settings.max = newMax;
    } catch (err) {
      console.error(err);
    }
  }

  setStep(tmp: number) {
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

  setValue(newValue: number) {
    const isValueBiggerMax = newValue > this.settings.max;
    const isValueSmallerMin = newValue < this.settings.min;
    const isValueNull = newValue === null;

    if (!isValueBiggerMax && !isValueSmallerMin) {
      this.settings.value = newValue;
    }
    if (isValueNull) {
      this.settings.value = this.settings.min;
    }
  }

  setValues(newValue: number[]) {
    let newValues: number[] = [null, null];
    newValues = newValue.slice();
    const isFirstValueSmallerMin = newValues[0] < this.settings.min;
    const isSecondValueBiggerMax = newValues[1] > this.settings.max;
    const isFirstValueBiggerMax = newValues[0] > this.settings.max;
    const isSecondValueSmallerMin = newValues[1] < this.settings.min;
    const isFirstValueBiggerSecond = newValues[0] >= newValues[1];
    if (isFirstValueSmallerMin) {
      newValues[0] = this.settings.min;
    }
    if (isSecondValueBiggerMax) {
      newValues[1] = this.settings.max;
    }
    if (isFirstValueBiggerMax) {
      newValues[0] = this.settings.max - this.settings.step < this.settings.max
        ? this.settings.max - this.settings.step
        : this.settings.max;
    }
    if (isSecondValueSmallerMin) {
      newValues[1] = this.settings.min + this.settings.step < this.settings.min
        ? this.settings.min + this.settings.step
        : this.settings.min;
    }
    if (!isFirstValueBiggerSecond) {
      this.settings.values = newValues;
    }
    const isFirstValueNull = this.settings.values[0] === null;
    const isSecondValueNull = this.settings.values[1] === null;
    if (isFirstValueNull) {
      newValues[0] = this.settings.min;
    }
    if (isSecondValueNull) {
      newValues[1] = this.settings.max;
    }
  }

  setSingleValueInRange(newValue: number, currentValueNumber: number) {
    const newValues: number[] = [null, null];
    if (currentValueNumber === 0) {
      if (newValue <= this.settings.values[1]) {
        newValues[0] = newValue;
        const second = this.settings.values[1];
        newValues[1] = second;
      }
    } else if (currentValueNumber === 1) {
      if (newValue >= this.settings.values[0]) {
        newValues[1] = newValue;
        const first = this.settings.values[0];
        newValues[0] = first;
      }
    }
    this.setValues(newValues);
  }

  setOrientation(newOrientation: string) {
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
