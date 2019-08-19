import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'

import * as $ from 'jquery';

 

 export class SliderPresenter{

    public static NAME: string = "slider";
 
    public rootElement: any;
    public settings: ISliderSettings;

    public model:Slider;
    public view:SliderTemplate;


    constructor(rootElement: any, options: ISliderSettings) {
         
        this.rootElement = rootElement;
        this.settings = options;
  
        this.model = new Slider(this.settings);
        this.view = new SliderTemplate(this.rootElement);

        this.rootElement.addEventListener('changePointer', (event:any)=>{

            let curPosInPixels = event.detail;

            let minVal = this.model.settings.settings.minVal;
            let maxVal = this.model.settings.settings.maxVal;
            let rangeVal = maxVal - minVal; 
              
            let curPosInPercents = this.calculateCurrPos(curPosInPixels) * 100 / rangeVal;

            this.view.renderCurrentPosInPercents(curPosInPercents);
        });
    }

    // EXAMPLE
    // rangeValInPixels    300px - 100%
    // curPosInPixels      236px -  79%

    // rangeVal 1000-100 = 900   - 100%
    // curPosInPercents    ?     -  79%

    // curPosVal  =  900*79/100% = 711

    // curPosInPercents = 711 / 900 * 100%

    calculateCurrPos(curPosInPixels:number){
        let minVal = this.model.settings.settings.minVal;
        let maxVal = this.model.settings.settings.maxVal;
        let rangeVal = maxVal - minVal;     
        let rangePixels = this.view.slider.getBoundingClientRect().width;
        
        let curPosInPercents = curPosInPixels * 100 / rangePixels;

        let curPosVal = rangeVal * curPosInPercents / 100;

        curPosVal = this.model.setPointerPosition(curPosVal);

        return curPosVal;
    }

  


}


