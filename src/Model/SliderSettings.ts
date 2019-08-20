import * as $ from 'jquery';

export interface ISliderSettings {
    range? : boolean,
    minVal?: number,
    maxVal?: number,
    stepVal?: number,
    orientation?: string,
    value?: number,
    values?: Array<number>,
    followerPoint?: boolean
}
  
export class SliderSettings{
    
    protected defaultSettings: ISliderSettings = {
        range : false,
        minVal: 0,
        maxVal: 100,
        stepVal: 1,
        orientation: 'horizontal',
        value: undefined,
        values: [undefined, undefined],
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
            if(this.settings.minVal > this.settings.maxVal){
                this.settings.maxVal = this.defaultSettings.maxVal;
                this.settings.minVal = this.defaultSettings.minVal;
                throw 'Min slider range value cant be bigger than max value';
            }
            if(this.settings.maxVal - this.settings.minVal <= this.settings.stepVal){
                this.settings.stepVal = this.defaultSettings.stepVal;
                throw 'Step cant be bigger than min and max range';
            }
            if(this.settings.value > this.settings.maxVal){
                this.settings.value = this.settings.minVal;
                throw 'Value cant be bigger than max value'
            }
            if(this.settings.value < this.settings.minVal){
                this.settings.value = this.settings.minVal;
                throw `Value cant be smaller than min value`;
            }
            if(this.settings.orientation !== 'vertical' && this.settings.orientation !== 'horizontal'){
                this.settings.orientation = 'horizontal';
                throw 'Orientation of slider has only two values \'horizontal\' or \'vertical\''
            }
        }catch(err){
            console.error(err)
        }
    }

    setValidValue(){
        if(this.settings.value === undefined && !this.settings.range){
            this.settings.value = this.settings.minVal;
        }
        if(this.settings.values[0] === undefined && this.settings.range){
            this.settings.values[0] = this.settings.minVal;
        }
        if(this.settings.values[1] === undefined && this.settings.range){
            this.settings.values[1] = this.settings.maxVal;
        }
    }

    setRange(tmp: boolean){
        this.settings.range = tmp;
        this.checkValidValues();
        return this.settings.range;
    }
    setMinVal(tmp: number){
        this.settings.minVal = tmp;
        this.checkValidValues();
        return this.settings.minVal;
    }
    setMaxVal(tmp: number){
        this.settings.maxVal = tmp;
        this.checkValidValues();
        return this.settings.maxVal;
    }
    setStepVal(tmp: number){
        if(tmp < (this.settings.maxVal - this.settings.minVal)){
            this.settings.stepVal = tmp;
            this.checkValidValues();
            return this.settings.stepVal;
        }else{
            this.settings.stepVal = this.defaultSettings.stepVal;
            throw 'Step cant be bigger then min and max range';
        }      
    }
    
}

export default SliderSettings;
  