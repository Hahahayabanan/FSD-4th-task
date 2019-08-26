import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'
import { SliderPointer } from '../View/SliderPointer'
import { SliderTemplateRange } from '../View/SliderTemplateRange'
import {SliderPresenter} from './SliderPresenter'


import * as $ from 'jquery';


export class SliderPresenterAPI{

    static slider: SliderPresenter;
    
    static enterPoint(slider: SliderPresenter, option: string, setting: string, value: string | number | number[] | boolean){

        this.slider = slider;
        
        if(option !== 'option') throw 'First parameter should be \'option\''
        let method:string;
        let currReturn: string | number | number[] | boolean;
        if(value !== undefined){
            switch (setting){
                case 'range':   currReturn = this.setRange(<boolean>value)
                    break;
                case 'minVal':  currReturn = this.setMinVal(<number>value)
                    break;
                case 'maxVal':  currReturn = this.setMaxVal(<number>value)
                    break;
                case 'stepVal': currReturn = this.setStepVal(<number>value)
                    break;
                case 'orientation': currReturn = this.setOrientation(<string>value)
                    break;
                case 'value':   currReturn = this.setValue(<number>value)
                    break;
                case 'values':  currReturn = this.setValues(<number[]>value)
                    break;
                case 'followerPoint':   currReturn = this.setFollowerPoint(<boolean>value)
                    break;
            }
        }else{
            switch (setting){
                case 'range':   currReturn = this.getRange()
                    break;
                case 'minVal':  currReturn = this.getMinVal()
                    break;
                case 'maxVal':  currReturn = this.getMaxVal()
                    break;
                case 'stepVal': currReturn = this.getStepVal()
                    break;
                case 'orientation': currReturn = this.getOrientation()
                    break;
                case 'value':   currReturn = this.getValue()
                    break;
                case 'values':  currReturn = this.getValues()
                    break;
                case 'followerPoint': currReturn = this.getFollowerPoint()
                    break;
            }
        }

        return currReturn;
    }

    static getFollowerPoint(): boolean{
        return this.slider.model.settings.settings.range;
    }
    static setFollowerPoint(newVal: boolean): boolean{
        newVal = this.slider.model.settings.setFollowerPoint(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    static getRange(): boolean{
        return this.slider.model.settings.settings.followerPoint;
    }
    static setRange(newVal: boolean): boolean{
        newVal = this.slider.model.settings.setRange(newVal);
        let rootElement = this.slider.view.slider;
        this.slider.view.destroy();
        if(newVal){
            this.slider.view = new SliderTemplateRange(rootElement, this.slider.model.settings.settings.orientation, this.slider.model.settings.settings.followerPoint);
        }else{
            this.slider.view = new SliderTemplate(rootElement, this.slider.model.settings.settings.orientation, this.slider.model.settings.settings.followerPoint);
        }
        
        this.slider.initStartValue();
        return newVal;
    }
    static getMinVal(): number{
        return this.slider.model.settings.settings.minVal;
    }
    static setMinVal(newVal: number): number{
        newVal = this.slider.model.settings.setMinVal(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    static getMaxVal(): number{
        return this.slider.model.settings.settings.maxVal;
    }
    static setMaxVal(newVal: number): number{
        newVal = this.slider.model.settings.setMaxVal(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    static getStepVal(): number{
        return this.slider.model.settings.settings.stepVal;
    }
    static setStepVal(newVal: number): number{
        newVal = this.slider.model.settings.setStepVal(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    static getValue(): number{
        return this.slider.model.settings.settings.value;
    }
    static setValue(newVal: number): number{
        newVal = this.slider.model.settings.setValue(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    static getOrientation(): string{
        return this.slider.model.settings.settings.orientation;
    }
    static setOrientation(newVal: string): string{
        newVal = this.slider.model.settings.setOrientation(newVal);
        let rootElement = this.slider.view.slider;
        this.slider.view.destroy();
        if(this.slider.model.settings.settings.range){
            this.slider.view = new SliderTemplateRange(rootElement, this.slider.model.settings.settings.orientation, this.slider.model.settings.settings.followerPoint);
        }else{
            this.slider.view = new SliderTemplate(rootElement, this.slider.model.settings.settings.orientation, this.slider.model.settings.settings.followerPoint);
        }
        this.slider.initStartValue();
        return newVal;
    }
    static getValues(): number[]{
        return this.slider.model.settings.settings.values;
    }
    static setValues(newVal: number[]): number[]{
        newVal = this.slider.model.settings.setValues(newVal);
        this.slider.initStartValue();
        return newVal;
    }
    
    

}

export default SliderPresenterAPI;