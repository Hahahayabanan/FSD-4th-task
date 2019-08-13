export interface SliderSettings {
    
}
  
export class SliderSettings implements SliderSettings {
    
    constructor(
        protected type:string = 'single', 
        protected minVal: number = 1, 
        protected maxVal: number = 100, 
        protected stepVal: number = 1, 
        protected followerVal: boolean = false
    ){
        this.type = type;
        this.minVal = minVal;
        this.maxVal = maxVal;
        this.stepVal = stepVal;
        this.followerVal = followerVal;
    }
    
}

export default SliderSettings;
  