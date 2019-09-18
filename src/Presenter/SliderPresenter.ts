import { SliderTemplate } from '../View/SliderTemplate';
import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';
import { SliderTemplateRange } from '../View/SliderTemplateRange';


class SliderPresenter {
  public model:Slider;

  public view: any;

  constructor(rootElement: any, options: ISliderSettings) {
    this.model = new Slider(options);

    this.createView(rootElement);

    this.view.slider.addEventListener('changePointer', this.onChangePointer.bind(this));
    this.initStartValue();
  }

  onChangePointer(event:any) {
    const currThumb = event.detail;

    const curPosInPixels:number = currThumb.curPos;
    const curPosInVal:number = this.calculateFromPixelsToValue(curPosInPixels);
    const curPosInValWithStep = this.model.setPointerPosition(curPosInVal);

    const curPosInPercentsWithStep = this.calculateFromValueToPercents(curPosInValWithStep);

    this.render(currThumb, curPosInPercentsWithStep);
    this.setFollowerPointValue(currThumb, curPosInValWithStep);

    if (currThumb === this.view.thumb1) {
      this.model.settings.settings.values[0] = curPosInValWithStep;
    }
    if (currThumb === this.view.thumb2) {
      this.model.settings.settings.values[1] = curPosInValWithStep;
    }
  }

  createView(rootElement:any) {
    if (this.model.settings.settings.range) {
      this.view = new SliderTemplateRange(rootElement, this.checkOrientationIsVertical(), this.model.settings.settings.followerPoint);
    } else {
      this.view = new SliderTemplate(rootElement, this.checkOrientationIsVertical(), this.model.settings.settings.followerPoint);
    }
  }

  initStartValue() {
    if (this.model.settings.settings.range) {
      const curPosInValues:number[] = this.model.settings.settings.values;
      const curPosInValsWithStep:number[] = this.model.setPointerPosition(curPosInValues);

      const curPosInPercentsWithStep: number[] = [0, 0];
      curPosInPercentsWithStep[0] = this.calculateFromValueToPercents(curPosInValsWithStep[0]);
      curPosInPercentsWithStep[1] = this.calculateFromValueToPercents(curPosInValsWithStep[1]);

      this.view.initRangeLine();

      this.view.thumb1.setCurPos(this.calculateFromPercentsToPixels(curPosInPercentsWithStep[0]));
      this.view.thumb2.setCurPos(this.calculateFromPercentsToPixels(curPosInPercentsWithStep[1]));
    } else {
      const curPosInValue:number = this.model.settings.settings.value;
      const curPosInValWithStep:number = this.model.setPointerPosition(curPosInValue);

      const curPosInPercentsWithStep:number = this.calculateFromValueToPercents(curPosInValWithStep);

      this.view.thumb.setCurPos(this.calculateFromPercentsToPixels(curPosInPercentsWithStep));
    }
  }


  // eslint-disable-next-line class-methods-use-this
  render(curThumb:SliderPointer, curPos: number) {
    curThumb.renderCurrentPosInPercents(curPos);
  }

  setFollowerPointValue(curThumb:SliderPointer, currPosInValWithStep: number) {
    if (this.model.settings.settings.followerPoint) {
      if (curThumb.followerPoint !== undefined) {
        curThumb.followerPoint.setValue(currPosInValWithStep);
      } else {
        curThumb.createFollowerPoint();
        curThumb.followerPoint.setValue(currPosInValWithStep);
      }
    } else {
      curThumb.deleteFollowerPoint();
    }
  }

  // EXAMPLE how it works
  // rangeValInPixels    300px - 100%
  // curPosInPixels      236px -  79%

  // rangeVal 1000-100 = 900   - 100%
  // curPosInPercents    ?     -  79%

  // curPosValInVal  =  900*79/100% = 711

  // curPosInPercents = 711 / 900 * 100%

  calculateFromPixelsToValue(curPosInPixels:number):number {
    const { minVal } = this.model.settings.settings;
    const { maxVal } = this.model.settings.settings;
    const rangeVal:number = maxVal - minVal;
    let rangePixels:string = '1';
    if (this.checkOrientationIsVertical()) {
      rangePixels = this.view.slider.getBoundingClientRect().height || this.view.slider.style.height;
    } else {
      rangePixels = this.view.slider.getBoundingClientRect().width || this.view.slider.style.width;
    }

    const curPosInPercents:number = curPosInPixels * 100 / parseInt(rangePixels, 10);
    const curPosInVal:number = rangeVal * curPosInPercents / 100;

    return curPosInVal + minVal;
  }


  // EXAMPLE how it works

  // rangeVal 1000-100   = 900   - 100%
  // curPosInVal 350-100 = 250   -   ?%
  // curPosInPercents    = 250 * 100% / 900
  calculateFromValueToPercents(curPosInValue:number):number {
    const { minVal } = this.model.settings.settings;
    const { maxVal } = this.model.settings.settings;
    const rangeVal:number = maxVal - minVal;

    const currPosInPercents:number = (curPosInValue - minVal) * 100 / rangeVal;

    return currPosInPercents;
  }


  calculateFromPercentsToPixels(curPosInPercents: number):number {
    let rangePixels:string = '1';
    if (this.checkOrientationIsVertical()) {
      rangePixels = this.view.slider.getBoundingClientRect().height || this.view.slider.style.height;
    } else {
      rangePixels = this.view.slider.getBoundingClientRect().width || this.view.slider.style.width;
    }
    const currPosInPixels: number = curPosInPercents * parseInt(rangePixels, 10) / 100;

    return currPosInPixels;
  }

  checkOrientationIsVertical():boolean {
    const ordersModule = {
      ORIENTATION: 'vertical',
    };
    if (this.model.settings.settings.orientation === ordersModule.ORIENTATION) {
      return true;
    }
    return false;
  }
}


export {
  SliderPresenter,
};
export default SliderPresenter;
