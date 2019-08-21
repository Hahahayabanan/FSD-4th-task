import SliderPointer from './SliderPointer'

export class SliderTemplate{

    public slider: any;
    public thumb: SliderPointer;

    constructor(elem: any, isVertical:boolean){
        this.slider = elem;

        if(isVertical){
            this.createTemplateVertical();
            this.thumb.createEventListenersVertical();
            this.addEventToSliderClickVertical()
        }else{
            this.createTemplate();
            this.thumb.createEventListeners();
            this.addEventToSliderClick()
        }
        
    }
    
    createTemplate(){
        this.slider.classList.add('j-plugin-slider');

        this.thumb = new SliderPointer(document.createElement('div'), this.slider);
        this.thumb.thumb.classList.add('j-plugin-slider__thumb');

        this.slider.appendChild(this.thumb.thumb);   
    }

    createTemplateVertical(){
        this.slider.classList.add('j-plugin-slider_vertical');

        this.thumb = new SliderPointer(document.createElement('div'), this.slider);
        this.thumb.thumb.classList.add('j-plugin-slider__thumb_vertical');

        this.slider.appendChild(this.thumb.thumb);   
    }

    addEventToSliderClick(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newLeft: number = event.clientX - this.slider.getBoundingClientRect().left;
            this.thumb.currPos = newLeft;           
        }
    }

    addEventToSliderClickVertical(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newTop: number = event.clientY - this.slider.getBoundingClientRect().top;
            this.thumb.currPos = newTop;           
        }
    }


    
}

export default SliderTemplate;
  