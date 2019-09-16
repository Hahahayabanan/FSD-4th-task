import { SliderTemplate } from '../View/SliderTemplate'
import { Slider } from '../Model/Slider'
import { ISliderSettings } from '../Model/ISliderSettings'
import { SliderPointer } from '../View/SliderPointer'
import { SliderTemplateRange } from '../View/SliderTemplateRange'




class SliderPresenter{

  public model:Slider;
  public view: any;
    
  constructor(rootElement: any, options: ISliderSettings) {
    this.model = new Slider(options);
    
    this.createView(rootElement);
          
    this.view.slider.addEventListener('changePointer', this.onChangePointer.bind(this));
    this.initStartValue();
  }

  onChangePointer(event:any){
    let currThumb = event.detail;

    let curPosInPixels:number = currThumb.currPos;
    let curPosInVal:number = this.calculateFromPixelsToValue(curPosInPixels);
    let curPosInValWithStep = this.model.setPointerPosition(curPosInVal);
      
    let curPosInPercentsWithStep = this.calculateFromValueToPercents(curPosInValWithStep);

    this.render(currThumb, curPosInPercentsWithStep);
    this.setFollowerPointValue(currThumb, curPosInValWithStep);

    if(currThumb === this.view.thumb1){
      this.model.settings.settings.values[0] = curPosInValWithStep;
    }
    if(currThumb === this.view.thumb2){
      this.model.settings.settings.values[1] = curPosInValWithStep;
    }
  }

  createView(rootElement:any){
    if(this.model.settings.settings.range){
      this.view = new SliderTemplateRange(rootElement, this.checkOrientationIsVertical(), this.model.settings.settings.followerPoint);
    }else{
      this.view = new SliderTemplate(rootElement, this.checkOrientationIsVertical(), this.model.settings.settings.followerPoint);
    }
  }

  initStartValue(){
    if(this.model.settings.settings.range){
      let curPosInValues:number[] = this.model.settings.settings.values;
      let curPosInValsWithStep:number[] = this.model.setPointerPosition(curPosInValues);
      
      let curPosInPercentsWithStep: number[] = [ 0 , 0 ];
      curPosInPercentsWithStep[0] = this.calculateFromValueToPercents(curPosInValsWithStep[0]);
      curPosInPercentsWithStep[1] = this.calculateFromValueToPercents(curPosInValsWithStep[1]);

      this.view.initRangeLine();

      this.view.thumb1.currPos = this.calculateFromPercentsToPixels(curPosInPercentsWithStep[0]);
      this.view.thumb2.currPos = this.calculateFromPercentsToPixels(curPosInPercentsWithStep[1]);
    }else{
      let curPosInValue:number = this.model.settings.settings.value;
      let curPosInValWithStep:number = this.model.setPointerPosition(curPosInValue);
      
      let curPosInPercentsWithStep:number = this.calculateFromValueToPercents(curPosInValWithStep);
          
      this.view.thumb.currPos = this.calculateFromPercentsToPixels(curPosInPercentsWithStep);
    }       
  }

  
  render(curThumb:SliderPointer, curPos: number){
    curThumb.renderCurrentPosInPercents(curPos);
  }

  setFollowerPointValue(curThumb:SliderPointer, currPosInValWithStep: number){
    if(this.model.settings.settings.followerPoint){
      if(curThumb.followerPoint !== undefined){
        curThumb.followerPoint.setValue(currPosInValWithStep);
      }else{
        curThumb.createFollowerPoint();
        curThumb.followerPoint.setValue(currPosInValWithStep);
      }
    }else{
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
  
  calculateFromPixelsToValue(curPosInPixels:number):number{
    let minVal:number = this.model.settings.settings.minVal;
    let maxVal:number = this.model.settings.settings.maxVal;
    let rangeVal:number = maxVal - minVal;     
    let rangePixels:string = '1';
    if(this.checkOrientationIsVertical()){
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
  calculateFromValueToPercents(curPosInValue:number):number{
    let minVal:number = this.model.settings.settings.minVal;
    let maxVal:number = this.model.settings.settings.maxVal;
    let rangeVal:number = maxVal - minVal; 

    let currPosInPercents:number = (curPosInValue-minVal) * 100 / rangeVal;       

    return currPosInPercents;
  }


  calculateFromPercentsToPixels(curPosInPercents: number):number{
    let rangePixels:string = '1';
    if(this.checkOrientationIsVertical()){
      rangePixels = this.view.slider.getBoundingClientRect().height || this.view.slider.style.height;
    }else{
      rangePixels = this.view.slider.getBoundingClientRect().width || this.view.slider.style.width;
    }
    let currPosInPixels: number = curPosInPercents * parseInt(rangePixels, 10) / 100;
    
    return currPosInPixels;
  }

  checkOrientationIsVertical():boolean{
    let ordersModule = {
      ORIENTATION: 'vertical'
    }
    if(this.model.settings.settings.orientation === ordersModule.ORIENTATION){
      return true;
    }else{
      return false;
    }
  }

}


export {
  SliderPresenter
}
export default SliderPresenter