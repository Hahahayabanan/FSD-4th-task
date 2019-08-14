import * as $ from 'jquery';

export interface ISliderSettings {
    range? : boolean,
    minVal?: number,
    maxVal?: number,
    stepVal?: number,
}
  
export class SliderSettings{
    
    protected defaultSettings: ISliderSettings = {
        range : false,
        minVal: 1,
        maxVal: 100,
        stepVal: 1,
    };

    public settings: ISliderSettings;

    constructor(
        setts: ISliderSettings
    ){
        this.settings = $.extend(this.defaultSettings, setts);
        this.checkValidValues();
    }

    checkValidValues(){
        if(this.settings.minVal > this.settings.maxVal){
            this.settings.maxVal = this.defaultSettings.maxVal;
            this.settings.minVal = this.defaultSettings.minVal;
            throw 'Min slider range value cant be bigger then max value';
        }

        if(this.settings.maxVal - this.settings.minVal <= this.settings.stepVal){
            this.settings.stepVal = this.defaultSettings.stepVal;
            throw 'Step cant be bigger then min and max range';
        }
    }



    setRange(tmp: boolean){
        return this.settings.range;
    }
    setMinVal(tmp: number){
        this.settings.minVal = tmp;
        return this.settings.minVal;
    }
    setMaxVal(tmp: number){
        this.settings.maxVal = tmp;
        return this.settings.maxVal;
    }
    setStepVal(tmp: number){
        if(tmp < (this.settings.maxVal - this.settings.minVal)){
            this.settings.stepVal = tmp;
            return this.settings.stepVal;
        }else{
            throw 'Step cant be bigger then min and max range';
        }      
    }
    
}

export default SliderSettings;
  