import * as $ from 'jquery';

export interface ISliderSettings {
    type? : string,
    minVal?: number,
    maxVal?: number,
    stepVal?: number,
    followerVal?: boolean
}
  
export class SliderSettings{
    
    protected defaultSettings: ISliderSettings = {
        type : 'single',
        minVal: 1,
        maxVal: 100,
        stepVal: 1,
        followerVal: false
    };

    protected settings: ISliderSettings;

    constructor(
        setts: ISliderSettings
    ){
        this.settings = $.extend(this.defaultSettings, setts);
    }

    setType(tmp: string){
        if(tmp === 'single' || tmp === 'range'){
            this.settings.type = tmp;
            return this.settings.type;
        }else{
            throw new Error('There are only two sets "single" or "range" ');
        }
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
            throw new Error('Step cant be bigger then min and max range')
        }      
    }
    setFollowerVal(tmp: boolean){
        this.settings.followerVal = tmp;
        return this.settings.followerVal;
    }
    
}

export default SliderSettings;
  