// eslint-disable-next-line import/no-extraneous-dependencies
import * as $ from 'jquery';
import { ISliderSettings } from './ISliderSettings';


class SliderSettings {
  protected defaultSettings: ISliderSettings = {
    range: false,
    minVal: 0,
    maxVal: 100,
    stepVal: 1,
    orientation: 'horizontal',
    value: null,
    values: [null, null],
    followerPoint: false,
  };

  public settings: ISliderSettings;

  public errors = {
    minBiggerMax: 'Min slider range value cant be bigger than max value',
    stepBiggerMaxMin: 'Step cant be bigger than min and max range',
    stepInteger: 'Step should be an integer, commonly a dividend of the slider\'s maximum value',
    valueBiggerMax: 'Value cant be bigger than max value',
    valueSmallerMin: 'Value cant be smaller than min value',
    firstValueSmallerMin: 'First value cant be smaller than min value',
    secondValueBiggerMax: 'Second value cant be bigger than max value',
    firstValueBiggerSecond: 'First value cant be bigger than second value',
    secondValueBiggerFirst: 'Second value cant be bigger than first value',
    rangeValuesInSingle: 'Slider has range values but it is not range',
    notValidOrientation: 'Orientation of slider has only two values "horizontal" or "vertical"',
  };

  constructor(setts: ISliderSettings) {
    this.settings = $.extend(this.defaultSettings, setts);

    this.setValidValue();
    this.checkValidValues();
  }

  checkValidValues() {
    try {
      const ordersModule = {
        ORIENTATION_VERTICAL: 'vertical',
        ORIENTATION_HORIZONTAL: 'horizontal',
      };
      const isOrientationVertical = this.settings.orientation !== ordersModule.ORIENTATION_VERTICAL;
      const isOrientationHorizontal = this.settings.orientation !== ordersModule.ORIENTATION_HORIZONTAL;
      const isOrientationSet = isOrientationVertical && isOrientationHorizontal;
      const isOneOfRangeValueSet = this.settings.values[0] !== null || this.settings.values[1] !== null;
      const valueRange = this.settings.maxVal - this.settings.minVal;

      if (this.settings.minVal >= this.settings.maxVal) {
        this.settings.maxVal = this.defaultSettings.maxVal;
        this.settings.minVal = this.defaultSettings.minVal;
        this.settings.value = this.defaultSettings.value;
        this.settings.values = this.defaultSettings.values;
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw this.errors.minBiggerMax;
      }
      if (this.settings.stepVal >= valueRange) {
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw this.errors.stepBiggerMaxMin;
      }
      if (valueRange % this.settings.stepVal !== 0) {
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw this.errors.stepInteger;
      }
      if (this.settings.value > this.settings.maxVal && !this.settings.range) {
        this.settings.value = this.settings.maxVal;
        throw this.errors.valueBiggerMax;
      }
      if (this.settings.value < this.settings.minVal && !this.settings.range) {
        this.settings.value = this.settings.minVal;
        throw this.errors.valueSmallerMin;
      }
      if (this.settings.values[0] < this.settings.minVal && this.settings.range) {
        this.settings.values[0] = this.settings.minVal;
        throw this.errors.firstValueSmallerMin;
      }
      if (this.settings.values[1] > this.settings.maxVal && this.settings.range) {
        this.settings.values[1] = this.settings.maxVal;
        throw this.errors.secondValueBiggerMax;
      }
      if (this.settings.values[0] > this.settings.values[1] && this.settings.range) {
        // eslint-disable-next-line prefer-destructuring
        this.settings.values[0] = this.settings.values[1];
        throw this.errors.firstValueBiggerSecond;
      }
      if (this.settings.values[1] < this.settings.values[0] && this.settings.range) {
        // eslint-disable-next-line prefer-destructuring
        this.settings.values[1] = this.settings.values[0];
        throw this.errors.secondValueBiggerFirst;
      }
      if (isOneOfRangeValueSet && !this.settings.range) {
        throw this.errors.rangeValuesInSingle;
      }
      if (isOrientationSet) {
        this.settings.orientation = this.defaultSettings.orientation;
        throw this.errors.notValidOrientation;
      }
    } catch (err) {
      console.error(err);
    }
  }

  setValidValue() {
    if (!this.settings.range) {
      if (this.settings.values[0] !== null) {
        // eslint-disable-next-line prefer-destructuring
        this.settings.value = this.settings.values[0];
        this.settings.values = [null, null];
      }
    }
    if (this.settings.value === null && !this.settings.range) {
      this.settings.value = this.settings.minVal;
    }
    if (this.settings.values === [null, null] && this.settings.range) {
      if (this.settings.value !== null) {
        this.settings.values = [this.settings.value, this.settings.maxVal];
      } else {
        this.settings.values = [this.settings.minVal, this.settings.maxVal];
      }
      this.settings.value = null;
    }
    if (this.settings.values[0] === null && this.settings.range) {
      if (this.settings.value !== null) {
        this.settings.values[0] = this.settings.value;
        this.settings.value = null;
      } else {
        this.settings.values[0] = this.settings.minVal;
      }
    }
    if (this.settings.values[1] === null && this.settings.range) {
      this.settings.values[1] = this.settings.maxVal;
    }
    if (this.settings.value !== null && this.settings.range) {
      this.settings.value = null;
    }
    if (this.settings.values !== [null, null] && !this.settings.range) {
      this.settings.values = [null, null];
    }
  }

  setRange(tmp: boolean) {
    this.settings.range = Boolean(tmp);
    this.setValidValue();
    this.checkValidValues();
    return this.settings.range;
  }

  setMinVal(tmp: number) {
    try {
      if (Number(tmp) >= this.settings.maxVal) {
        throw this.errors.minBiggerMax;
      }
      this.settings.minVal = Number(tmp);
      this.checkValidValues();
      return this.settings.minVal;
    } catch (err) {
      console.error(err);
      return this.settings.minVal;
    }
  }

  setMaxVal(tmp: number) {
    try {
      if (Number(tmp) <= this.settings.minVal) {
        throw this.errors.minBiggerMax;
      }
      this.settings.maxVal = Number(tmp);
      this.checkValidValues();
      return this.settings.maxVal;
    } catch (err) {
      console.error(err);
      return this.settings.maxVal;
    }
  }

  setStepVal(tmp: number) {
    try {
      const valueRange = this.settings.maxVal - this.settings.minVal;
      if (Number(tmp) < valueRange) {
        this.settings.stepVal = Number(tmp);
        this.checkValidValues();
        return this.settings.stepVal;
      }
      this.settings.stepVal = this.defaultSettings.stepVal;
      throw this.errors.stepBiggerMaxMin;
    } catch (err) {
      console.error(err);
      return this.settings.stepVal;
    }
  }

  setValue(tmp: number) {
    this.settings.value = Number(tmp);
    this.setValidValue();
    this.checkValidValues();
    return this.settings.value;
  }

  setValues(tmp: number[]) {
    this.settings.values = tmp;
    this.setValidValue();
    this.checkValidValues();
    return this.settings.values;
  }

  setOrientation(tmp: string) {
    this.settings.orientation = tmp;
    this.checkValidValues();
    return this.settings.orientation;
  }

  setFollowerPoint(tmp: boolean) {
    this.settings.followerPoint = Boolean(tmp);
    return this.settings.followerPoint;
  }
}

export {
  SliderSettings,
};

export default SliderSettings;
