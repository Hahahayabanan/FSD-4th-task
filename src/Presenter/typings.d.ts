import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { SliderSettings } from '../Model/SliderSettings'
import { ISliderSettings } from '../Model/SliderSettings'
import { SliderPresenter } from './SliderPresenter';
import * as $ from 'jquery';




interface JQuery {
    slider(node:HTMLElement, settings?:ISliderSettings):SliderPresenter;
}
interface JQueryStatic {
    slider(node:HTMLElement, settings?:ISliderSettings):SliderPresenter;
}
 


