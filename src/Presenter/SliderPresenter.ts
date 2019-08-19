import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'

import * as $ from 'jquery';

 

 export class SliderPresenter{

    public static NAME: string = "slider";
 
    public model:Slider;
    public view:SliderTemplate;

    
    constructor(rootElement: any, options: ISliderSettings) {
         
        this.model = new Slider(options);
        this.view = new SliderTemplate(rootElement);

        this.view.renderCurrentPosInPercents(this.getCurrPosFromValueToPercents(this.model.settings.settings.value));

        let onChangePointer = (event:any)=>{

            let curPosInPixels = event.detail;

            let curPosInPercents = this.getCurrPosInPercents(curPosInPixels);

            this.view.renderCurrentPosInPercents(curPosInPercents);

        }

        this.view.slider.addEventListener('changePointer', onChangePointer);
    }


    // EXAMPLE how it works
    // rangeValInPixels    300px - 100%
    // curPosInPixels      236px -  79%

    // rangeVal 1000-100 = 900   - 100%
    // curPosInPercents    ?     -  79%

    // curPosValInVal  =  900*79/100% = 711

    // curPosInPercents = 711 / 900 * 100%
    
    calculateCurrPos(curPosInPixels:number){
        let minVal = this.model.settings.settings.minVal;
        let maxVal = this.model.settings.settings.maxVal;
        let rangeVal = maxVal - minVal;     
        let rangePixels = this.view.slider.getBoundingClientRect().width || this.view.slider.style.width;
        
        let curPosInPercents = curPosInPixels * 100 / rangePixels;

        let curPosVal = rangeVal * curPosInPercents / 100;

        return this.model.settings.settings.value = this.model.setPointerPosition(curPosVal);

    }

    getCurrPosInPercents(curPosInPixels:number){
        let minVal = this.model.settings.settings.minVal;
        let maxVal = this.model.settings.settings.maxVal;
        let rangeVal = maxVal - minVal; 
            
        let curPosInPercents = this.calculateCurrPos(curPosInPixels) * 100 / rangeVal;

        return curPosInPercents;
    }

    // EXAMPLE how it works

    // rangeVal 1000-100 = 900   - 100%
    // curPosInVal         250   -   ?%
    // curPosInPercents = 250 * 100% / 900
    getCurrPosFromValueToPercents(curPosInValue:number){
        let minVal = this.model.settings.settings.minVal;
        let maxVal = this.model.settings.settings.maxVal;
        let rangeVal = maxVal - minVal; 

        let curPos = curPosInValue * 100 / rangeVal;       

        return curPos;
    }


}


