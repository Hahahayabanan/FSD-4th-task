import { SliderSettings } from './SliderSettings';

export interface Slider {
    
}
  
export class Slider implements Slider {
    
    public settings: object;

    constructor(){}

    setSettings(sett: SliderSettings){
        this.settings = sett;
    }
}

export default Slider;
  