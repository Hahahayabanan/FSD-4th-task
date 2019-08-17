import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'

import * as $ from 'jquery';

 

 export class SliderPresenter{

    public static NAME: string = "slider";
 
    private rootElement: object;
    private settings: ISliderSettings;


    constructor(rootElement: object, options: ISliderSettings) {
         
        this.rootElement = rootElement;
        this.settings = options;
  
        let model = new Slider(this.settings);
        let view = new SliderTemplate(this.rootElement);
    }    
}


