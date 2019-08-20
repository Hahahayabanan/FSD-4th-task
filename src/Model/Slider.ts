import { SliderSettings } from './SliderSettings';


export class Slider{
    
    public settings: SliderSettings;


    constructor(sett?: object){
        this.settings = new SliderSettings(sett);
    }
    
    setSettings(sett: object){
        this.settings = new SliderSettings(sett);
    }

    
    setPointerPosition(pos: number){
        let maxVal = this.settings.settings.maxVal;
        let minVal = this.settings.settings.minVal;
        let step:number = this.settings.settings.stepVal;
        let stepsRange:number = (maxVal - minVal);
        
        let curVal:number = pos-minVal;

        if(stepsRange % step === 0){        

            let currentStep:number = Math.round(curVal / step);
               
            curVal = currentStep * step ;

            return curVal + minVal;

        }else{
            throw 'Step should be an integer, commonly a dividend of the slider\'s maximum value';
        }
    }
}

export default Slider;
  