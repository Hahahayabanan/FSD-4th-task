import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'



// import * as $ from 'jquery';



export class SliderPresenter{

    static init($: any){

        $.fn.slider = function (node:HTMLElement, setting?:ISliderSettings):any {
           return node;
        }
        
    }


}

   






// const $ = require('jquery');



