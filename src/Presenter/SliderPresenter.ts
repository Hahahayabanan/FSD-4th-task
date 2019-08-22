import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'
import { SliderPointer } from '../View/SliderPointer'
import { SliderTemplateRange } from '../View/SliderTemplateRange'

import * as $ from 'jquery';



export class SliderPresenter{

    public static NAME: string = "slider";
 
    public model:Slider;
    public view:SliderTemplate;

    
    constructor(rootElement: any, options: ISliderSettings) {
         
        this.model = new Slider(options);

        if(this.model.settings.settings.range){
            this.view = new SliderTemplateRange(rootElement, this.model.settings.settings.orientation);
        }else{
            this.view = new SliderTemplate(rootElement, this.model.settings.settings.orientation);
        }
        


        let onChangePointer = (event:any)=>{
            let curPosInPixels:number = event.detail;
            let curPosInVal:number = this.calculateCurrPosFromPixelsToValue(curPosInPixels);
            let curPosInValWithStep = this.model.setPointerPosition(curPosInVal);
            this.model.settings.settings.value = curPosInValWithStep;
            let curPosInPercentsWithStep = this.getCurrPosFromValueToPercents(curPosInValWithStep);
            
            this.render(curPosInPercentsWithStep);

        }
        
        this.view.slider.addEventListener('changePointer', onChangePointer);
        this.initStartValue();
    }

    initStartValue(){
        let curPosInValue:number = this.model.settings.settings.value;
        let curPosInValWithStep = this.model.setPointerPosition(curPosInValue);
        this.model.settings.settings.value = curPosInValWithStep;
        let curPosInPercentsWithStep = this.getCurrPosFromValueToPercents(curPosInValWithStep);

        this.render(curPosInPercentsWithStep);
        
    }

    render(curPos:number){
        if(this.model.settings.settings.orientation === 'vertical'){
            this.view.thumb.renderCurrentPosInPercents(curPos);
        }else{
            this.view.thumb.renderCurrentPosInPercents(curPos);
        }
    }
    // EXAMPLE how it works
    // rangeValInPixels    300px - 100%
    // curPosInPixels      236px -  79%

    // rangeVal 1000-100 = 900   - 100%
    // curPosInPercents    ?     -  79%

    // curPosValInVal  =  900*79/100% = 711

    // curPosInPercents = 711 / 900 * 100%
    
    calculateCurrPosFromPixelsToValue(curPosInPixels:number){
        let minVal:number = this.model.settings.settings.minVal;
        let maxVal:number = this.model.settings.settings.maxVal;
        let rangeVal:number = maxVal - minVal;     
        let rangePixels:string = '1';
        if(this.model.settings.settings.orientation === 'vertical'){
            rangePixels = this.view.slider.getBoundingClientRect().height || this.view.slider.style.height;
        }else{
            rangePixels = this.view.slider.getBoundingClientRect().width || this.view.slider.style.width;
        }
        
        let curPosInPercents:number = curPosInPixels * 100 / parseInt(rangePixels, 10);
        let curPosInVal:number = rangeVal * curPosInPercents / 100;    

        return curPosInVal+minVal;
    }


    // EXAMPLE how it works

    // rangeVal 1000-100   = 900   - 100%
    // curPosInVal 350-100 = 250   -   ?%
    // curPosInPercents    = 250 * 100% / 900 
    getCurrPosFromValueToPercents(curPosInValue:number){
        let minVal:number = this.model.settings.settings.minVal;
        let maxVal:number = this.model.settings.settings.maxVal;
        let rangeVal:number = maxVal - minVal; 

        let currPosInPercents:number = (curPosInValue-minVal) * 100 / rangeVal;       

        return currPosInPercents;
    }

}


