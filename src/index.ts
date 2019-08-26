import * as $ from 'jquery';
import {ISliderSettings} from './Model/SliderSettings'
import {SliderPresenter} from './Presenter/SliderPresenter'
import {SliderPresenterAPI} from './Presenter/SliderPresenterAPI'
import './View/styles.css'

(function ($: JQueryStatic) {

   let slider: SliderPresenter[] = new Array;

   $.fn['slider'] = function () {
      if(typeof arguments[0] === 'object' || arguments[0] === undefined){
         let settings: ISliderSettings = arguments[0];
         return this.each(function (i:number, val:object) {
            let htmlElem = val;
            slider.push(new SliderPresenter(htmlElem, settings))
         });
      }
      if(typeof arguments[0] === 'string'){
         let option = arguments[0];
         let setting = arguments[1];
         let value = arguments[2];
         return this.each(function (i:number, val:object) {
            let htmlElem = val;
            slider.forEach((val, i)=>{
               if(val.view.slider === htmlElem){
                  return SliderPresenterAPI.enterPoint(val, option, setting, value);
               }
            });

         });
      }
      
   };















   // $.fn['slider'] = function (settigns: ISliderSettings) {
   //    return this.each(function (i:number, val:object) {
   //       let htmlElem = val;
   //       slider.push(new SliderPresenter(htmlElem, settigns))
   //    });
   // };



})(jQuery);


