import SliderPointer from './SliderPointer'

export class SliderTemplate{

    public slider: any;
    public thumb: SliderPointer;
    public isVertical: boolean;

    constructor(elem: any, isVertical?:string){
        this.slider = elem;

        if(isVertical === 'vertical'){
            this.isVertical = true;
        }else{
            this.isVertical = false;
        }

        this.createTemplate();
        this.thumb.createEventListeners();
        this.addEventToSliderClick()
        
    }
    
    createTemplate(){
        
        this.thumb = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
        this.slider.appendChild(this.thumb.thumb);   

        if(this.isVertical){
            this.slider.classList.add('j-plugin-slider_vertical');
            this.thumb.thumb.classList.add('j-plugin-slider__thumb_vertical');
        }else{
            this.slider.classList.add('j-plugin-slider');
            this.thumb.thumb.classList.add('j-plugin-slider__thumb');
        }
    }



    addEventToSliderClick(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newLeft: number = this.isVertical
                ? event.clientY - this.slider.getBoundingClientRect().top
                : event.clientX - this.slider.getBoundingClientRect().left;
            this.thumb.currPos = newLeft;           
        }
    }



    
}

export default SliderTemplate;
  