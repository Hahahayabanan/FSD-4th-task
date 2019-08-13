import { SliderSettings } from './SliderSettings';


export interface Slider {
    
}
  
export class Slider implements Slider {
    
    public settings: SliderSettings;
    public pointer: number;

    constructor(sett?: object){
        this.settings = new SliderSettings(sett);
        this.pointer = this.settings.settings.minVal;
    }
    
    setSettings(sett: object){
        this.settings = new SliderSettings(sett);
    }

    moveSlider(){

    }

    setPointerPosition(pos: number){

        let step = this.settings.settings.stepVal;
        
        let stepsRange = (this.settings.settings.maxVal - this.settings.settings.minVal);

        if(stepsRange % step === 0){

            if(pos >= this.settings.settings.maxVal){
                this.pointer = this.settings.settings.maxVal;
                throw new Error('Current pointer position should be smaller then max range value');
            }
            if(pos <= this.settings.settings.minVal){
                this.pointer = this.settings.settings.minVal;
                throw new Error('Current pointer position should be bigger then min range value');
            }

            let currentStep = Math.round((pos - this.settings.settings.minVal) / step);
               
            pos = (currentStep) * step  + this.settings.settings.minVal;

            this.pointer = pos;
   
        }else{
            throw new Error('Step should be an integer, commonly a dividend of the slider\'s maximum value');
        }
        return this.pointer;
    }
    
}

export default Slider;
  