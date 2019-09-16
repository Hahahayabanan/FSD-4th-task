import {ISliderSettings} from './Model/SliderSettings'
import {SliderPresenter} from './Presenter/SliderPresenter'
import {SliderPresenterAPI} from './Presenter/SliderPresenterAPI'
import './View/styles.css'

(function ($: JQueryStatic) {

  let sliders: SliderPresenter[] = new Array;

  $.fn['slider'] = function (...args:any) {
    if(typeof args[0] === 'object' || args[0] === undefined){
      let settings: ISliderSettings = args[0];
      return this.each(function (i:number, val:object) {
        let htmlElem = val;
        sliders.push(new SliderPresenter(htmlElem, settings))
      });
    }
    if(typeof args[0] === 'string'){
      let option = args[0];
      let setting = args[1];
      let value = args[2];
      let valuesOnOfTwoVals = args[3];
      let returnValue:any;
      this.each(function (i:number, val:object) {
        let htmlElem = val;
        sliders.forEach((val, i)=>{
          if(val.view.slider === htmlElem){
            returnValue = SliderPresenterAPI.enterPoint({
              slider: val, 
              option: option, 
              setting: setting, 
              value: value, 
              valuesOneOfTwoVals: valuesOnOfTwoVals});
          }
        });

      });
      return returnValue;
    }
    
  };



})(jQuery);


