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
    stepInteger:
      "Step should be an integer, commonly a dividend of the slider's maximum value",
    valueBiggerMax: 'Value cant be bigger than max value',
    valueSmallerMin: 'Value cant be smaller than min value',
    firstValueSmallerMin: 'First value cant be smaller than min value',
    secondValueBiggerMax: 'Second value cant be bigger than max value',
    firstValueBiggerSecond: 'First value cant be bigger than second value',
    secondValueBiggerFirst: 'Second value cant be bigger than first value',
    rangeValuesInSingle: 'Slider has range values but it is not range',
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
      if (typeof newValue === 'boolean') {
        switch (setting) {
          case 'isRange':
            this.settings.isRange = newValue;
            if (this.settings.value) {
              this.setSingleValueInRange(this.settings.value, 0);
              this.setSingleValueInRange(this.settings.max, 1);
            } else if (this.settings.values[0]) this.setValue(this.settings.values[0]);
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
    if (Number(newMin) >= this.settings.max) {
      throw this.errors.minBiggerMax;
    }
    if (Number(newMin) > this.settings.value) {
      this.settings.value = newMin;
    }
    if (Number(newMin) > this.settings.values[0]) {
      this.settings.values[0] = newMin;
    }
    if (Number(newMin) >= this.settings.values[1]) {
      this.settings.values[0] = newMin;
      this.settings.values[1] = Number(newMin) + this.settings.step;
    }
    this.settings.min = Number(newMin);
  }

  setMax(newMax: number) {
    if (Number(newMax) <= this.settings.min) {
      throw this.errors.minBiggerMax;
    }
    if (Number(newMax) < this.settings.value) {
      this.settings.value = newMax;
    }
    if (Number(newMax) < this.settings.values[1]) {
      this.settings.values[1] = newMax;
    }
    if (Number(newMax) <= this.settings.values[1]) {
      this.settings.values[1] = newMax;
      this.settings.values[0] = newMax - this.settings.step;
    }
    this.settings.max = Number(newMax);
  }

  setStep(tmp: number) {
    try {
      const valueRange = this.settings.max - this.settings.min;
      const stepBiggerNull = Number(tmp) > 0;
      const stepSmallerRange = Number(tmp) < valueRange;
      if (stepBiggerNull && stepSmallerRange) {
        this.settings.step = Number(tmp);
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
    newValues = newValue;

    const isFirstValueNull = this.settings.values[0] === null;
    const isSecondValueNull = this.settings.values[1] === null;
    const isFirstValueSmallerMin = newValues[0] < this.settings.min;
    const isSecondValueBiggerMax = newValues[1] > this.settings.max;
    const isFirstValueBiggerMax = newValues[0] > this.settings.max;
    const isSecondValueSmallerMin = newValues[1] < this.settings.min;
    const isFirstValueBiggerSecond = newValues[0] >= newValues[1];

    if (isFirstValueSmallerMin || isFirstValueNull) {
      newValues[0] = this.settings.min;
    }
    if (isSecondValueBiggerMax || isSecondValueNull) {
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
  }

  setSingleValueInRange(newValue: number, currentValueNumber?: number) {
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

    if (isOrientationNotSet) {
      this.settings.orientation = this.defaultSettings.orientation;
    } else {
      this.settings.orientation = newOrientation;
    }
  }
}

export { SliderSettings };

export default SliderSettings;
