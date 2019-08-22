import { SliderSettings } from './SliderSettings';


export class Slider{
    
    public settings: SliderSettings;


    constructor(sett?: object){
        this.settings = new SliderSettings(sett);
    }
    
    setSettings(sett: object){
        this.settings = new SliderSettings(sett);
    }

    setPointerPosition(pos: number[]): number[];
    setPointerPosition(pos: number): number;

    setPointerPosition(pos: any){
        let maxVal = this.settings.settings.maxVal;
        let minVal = this.settings.settings.minVal;
        let step:number = this.settings.settings.stepVal;
        let stepsRange:number = (maxVal - minVal);


        if(stepsRange % step === 0){   

            if(typeof pos === "object"){
        
                let curVals:number[] = [   pos[0]-minVal  ,  pos[1]-minVal   ];   
                let currentStep:number[] = [  Math.round(curVals[0] / step),  Math.round(curVals[1] / step)  ];
                curVals = [  currentStep[0] * step  ,  currentStep[1] * step  ];
                this.settings.settings.values = curVals;
                return [   curVals[0] + minVal  ,  curVals[1] + minVal   ];          

            }else{

                let curVal:number = pos-minVal;
                let currentStep:number = Math.round(curVal / step);
                curVal = currentStep * step ;
                this.settings.settings.value = curVal;
                return curVal + minVal;
            }

        }else{
            throw 'Step should be an integer, commonly a dividend of the slider\'s maximum value';
        }
        
    }

    




}

export default Slider;
  