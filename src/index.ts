/* eslint-disable consistent-return */
import { ISliderSettings } from './Model/ISliderSettings';
import { SliderPresenter } from './Presenter/SliderPresenter';
import { SliderPresenterAPI } from './Presenter/SliderPresenterAPI';
import './View/styles.css';


(function initialization($: JQueryStatic) {
  const sliders: SliderPresenter[] = [];


  // eslint-disable-next-line dot-notation
  $.fn['slider'] = function getStart(...args:any) {
    if (typeof args[0] === 'object' || args[0] === undefined) {
      const settings: ISliderSettings = args[0];
      return this.each((i:number, val:object) => {
        const htmlElem = val;
        return sliders.push(new SliderPresenter(htmlElem, settings));
      });
    }
    if (typeof args[0] === 'string') {
      const [option, setting, value, valuesOneOfTwoVals] = args;

      let returnValue:any;
      // eslint-disable-next-line array-callback-return
      this.map((i:number, val:object) => {
        const htmlElem = val;
        // eslint-disable-next-line array-callback-return
        sliders.map(htmlItem => {
          if (htmlItem.view.slider === htmlElem) {
            returnValue = SliderPresenterAPI.enterPoint({
              valuesOneOfTwoVals,
              value,
              option,
              setting,
              slider: htmlItem,
            });
          }
        });
      });
      return returnValue;
    }
  };
}(jQuery));
