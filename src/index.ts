import * as $ from 'jquery';
import {ISliderSettings} from './Model/SliderSettings'
import {SliderPresenter} from './Presenter/SliderPresenter'
import './View/styles.css'

(function ($: JQueryStatic) {
    // you have to extend jQuery with the fn['pluginName'] notation because in Typescript you can't extend
    // the existing typing interface with fn.pluginName!
    $.fn[SliderPresenter.NAME] = function (settigs: ISliderSettings) {
       return this.each(function (i:number, val:object) {
          let htmlElem = val;
          new SliderPresenter(htmlElem, settigs);
       });
    };
})(jQuery);


