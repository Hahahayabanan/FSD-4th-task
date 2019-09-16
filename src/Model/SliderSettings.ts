import { ISliderSettings } from './ISliderSettings';

import * as $ from 'jquery';


class SliderSettings{
  protected defaultSettings: ISliderSettings = {
    range : false,
    minVal: 0,
    maxVal: 100,
    stepVal: 1,
    orientation: 'horizontal',
    value: null,
    values: [null, null],
    followerPoint: false
  };

  public settings: ISliderSettings;

  constructor(setts: ISliderSettings){
    this.settings = $.extend(this.defaultSettings, setts);

    this.setValidValue();
    this.checkValidValues();
  }

  checkValidValues(){   
    try{
      let ordersModule = {
        ORIENTATION_VERTICAL: 'vertical',
        ORIENTATION_HORIZONTAL: 'horizontal'
      }
      let isOrientationVertical = this.settings.orientation !== ordersModule.ORIENTATION_VERTICAL;
      let isOrientationHorizontal = this.settings.orientation !== ordersModule.ORIENTATION_HORIZONTAL;
      let isOrientationSet = isOrientationVertical && isOrientationHorizontal;
      let isOneOfRangeValueSet = this.settings.values[0] !== null || this.settings.values[1] !== null;
      let valueRange = this.settings.maxVal - this.settings.minVal;

      if(this.settings.minVal > this.settings.maxVal){
        this.settings.maxVal = this.defaultSettings.maxVal;
        this.settings.minVal = this.defaultSettings.minVal;
        this.settings.value = this.defaultSettings.value;
        this.settings.values = this.defaultSettings.values;
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw 'Min slider range value cant be bigger than max value';
      }
      if(valueRange <= this.settings.stepVal){
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw 'Step cant be bigger than min and max range';
      }
      if(this.settings.value > this.settings.maxVal){
        this.settings.value = this.settings.maxVal;
        throw 'Value cant be bigger than max value'
      }
      if(this.settings.value < this.settings.minVal){
        this.settings.value = this.settings.minVal;
        throw `Value cant be smaller than min value`;
      }
      if(this.settings.values[0] < this.settings.minVal && this.settings.range){
        this.settings.values[0] = this.settings.minVal;
        throw `First value cant be smaller than min value`;
      }
      if(this.settings.values[1] > this.settings.maxVal && this.settings.range){
        this.settings.values[1] = this.settings.maxVal;
        throw `Second value cant be bigger than max value`;
      }
      if(this.settings.values[0] > this.settings.values[1] && this.settings.range){
        this.settings.values[0] = this.settings.values[1];
        throw `First value cant be bigger than second value`;
      }
      if(this.settings.values[1] < this.settings.values[0] && this.settings.range){
        this.settings.values[1] = this.settings.values[0];
        throw `Second value cant be bigger than first value`;
      }
      if(isOneOfRangeValueSet && !this.settings.range){
        throw 'Your slider has range values but it is not range';
      }
      if(isOrientationSet){
        this.settings.orientation = this.defaultSettings.orientation;
        throw 'Orientation of slider has only two values \'horizontal\' or \'vertical\''
      }
    }catch(err){
      console.error(err)
    }
  }

  setValidValue(){
    if(this.settings.value === null && !this.settings.range){
      this.settings.value = this.settings.minVal;
    }
    if(this.settings.values === null && this.settings.range){
      this.settings.values = [this.settings.minVal, this.settings.maxVal];
    }
    if(this.settings.values[0] === null && this.settings.range){
      this.settings.values[0] = this.settings.minVal;
    }
    if(this.settings.values[1] === null && this.settings.range){
      this.settings.values[1] = this.settings.maxVal;
    }
  }

  setRange(tmp: boolean){
    this.settings.range = Boolean(tmp);
    this.setValidValue();
    this.checkValidValues();
    return this.settings.range;
  }
  setMinVal(tmp: number){
    try{
      if(Number(tmp) > this.settings.maxVal){
        throw 'Min slider range value cant be bigger than max value';
      }
      this.settings.minVal = Number(tmp);
      this.checkValidValues();
      return this.settings.minVal;
    }catch(err){
      console.error(err)
      return this.settings.minVal;
    }
  }
  setMaxVal(tmp: number){
    try{
      if(Number(tmp) < this.settings.minVal){
        throw 'Max slider range value cant be smaller than min value';
      }
      this.settings.maxVal = Number(tmp);
      this.checkValidValues();
      return this.settings.maxVal;
    }catch(err){
      console.error(err)
      return this.settings.maxVal;
    }
  }
  setStepVal(tmp: number){
    try{
      let valueRange = this.settings.maxVal - this.settings.minVal;
      if(Number(tmp) < valueRange){
        this.settings.stepVal = Number(tmp);
        this.checkValidValues();
        return this.settings.stepVal;
      }else{
        this.settings.stepVal = this.defaultSettings.stepVal;
        throw 'Step cant be bigger then min and max range';
      }   
    }catch(err){
      console.error(err)
      return this.settings.stepVal;
    }   
  }
  setValue(tmp: number){
    this.settings.value = Number(tmp);
    this.setValidValue();
    this.checkValidValues();
    return this.settings.value;
  }
  setValues(tmp: number[]){
    this.settings.values = tmp;
    this.setValidValue();
    this.checkValidValues();
    return this.settings.values;
  }
  setOrientation(tmp: string){
    this.settings.orientation = tmp;
    this.checkValidValues();
    return this.settings.orientation;
  }
  setFollowerPoint(tmp: boolean){
    this.settings.followerPoint = Boolean(tmp);
    return this.settings.followerPoint;
  }
    
}

export {
  SliderSettings
}

export default SliderSettings;
  