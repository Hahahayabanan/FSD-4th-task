import SliderPointer from './SliderPointer'

class SliderTemplateRange {

  public slider: any;
  public isVertical: boolean = false;
  public isFollowerPoint: boolean = false;
  public thumb1: SliderPointer;
  public thumb2: SliderPointer;
  public range: any;

  constructor(elem: any, isVertical?: boolean, isFollowerPoint?: boolean){
    this.slider = elem;
    this.isVertical = isVertical;
    this.isFollowerPoint = isFollowerPoint;
    this.createTemplate();
    
    this.thumb1.createEventListeners(this.thumb2);
    this.thumb2.createEventListeners(this.thumb1);
    this.addEventToSliderClick();
  }
  
  createTemplate(){
    this.thumb1 = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
    this.thumb2 = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
    this.range = document.createElement('div');

    this.slider.append(this.range);   
    this.slider.append(this.thumb1.thumbHTMLElem);   
    this.slider.append(this.thumb2.thumbHTMLElem);   
    
    if(this.isVertical){
      this.slider.classList.add('j-plugin-slider_vertical');
      this.thumb1.thumbHTMLElem.classList.add('j-plugin-slider__thumb_vertical');
      this.thumb2.thumbHTMLElem.classList.add('j-plugin-slider__thumb_vertical');
      this.range.classList.add('j-plugin-slider__range_vertical');
      if(this.isFollowerPoint){
        this.slider.classList.add('j-plugin-slider_with-point_vertical');
      }
    }else{
      this.thumb1.thumbHTMLElem.classList.add('j-plugin-slider__thumb');
      this.thumb2.thumbHTMLElem.classList.add('j-plugin-slider__thumb');
      this.slider.classList.add('j-plugin-slider');
      this.range.classList.add('j-plugin-slider__range');
      if(this.isFollowerPoint){
        this.slider.classList.add('j-plugin-slider_with-point');
      }
    }
  }

  initRangeLine(){
    let rangeLine = (event:any)=>{
      if(this.isVertical){
        this.range.style.top = this.thumb1.thumbHTMLElem.style.top;
        this.range.style.height = (parseInt(this.thumb2.thumbHTMLElem.style.top) - parseInt(this.thumb1.thumbHTMLElem.style.top)) + '%';
      }else{
        this.range.style.left = this.thumb1.thumbHTMLElem.style.left;
        this.range.style.width = (parseInt(this.thumb2.thumbHTMLElem.style.left) - parseInt(this.thumb1.thumbHTMLElem.style.left)) + '%';
      }
    }
    rangeLine(event);
    this.slider.addEventListener('changePointer', rangeLine);
  }
  

  addEventToSliderClick(){
    this.slider.onmousedown = (event:any) => {
      event.preventDefault();
      let newLeft: number = this.isVertical
        ? event.clientY - this.slider.getBoundingClientRect().top
        : event.clientX - this.slider.getBoundingClientRect().left;
      
      let pointersRange = this.calculatePointersRange();

      if(newLeft < pointersRange){
        this.thumb1.currPos = newLeft;
      }
      if(newLeft > pointersRange){
        this.thumb2.currPos = newLeft;
      }
                    
    }
  }

  calculatePointersRange(){
    let res:number = (this.thumb2.currPos-this.thumb1.currPos) / 2 + this.thumb1.currPos;
    return res;
  }

  destroy(){
    this.range.remove();
    this.thumb1.thumbHTMLElem.remove();
    this.thumb2.thumbHTMLElem.remove();
    this.slider.classList.remove('j-plugin-slider_vertical', 'j-plugin-slider')
  }
}

export{
  SliderTemplateRange
}
export default SliderTemplateRange;