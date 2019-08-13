import { SliderSettings } from './SliderSettings';


export interface Slider {
    
}
  
export class Slider implements Slider {
    
    public settings: SliderSettings;

    constructor(sett?: object){
        this.settings = new SliderSettings(sett);
    }

    
    setSettings(sett: object){
        this.settings = new SliderSettings(sett);
    }

    
    
}

export default Slider;
  