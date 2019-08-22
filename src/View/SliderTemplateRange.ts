import SliderPointer from './SliderPointer'
import SliderTemplate from './SliderTemplate'

export class SliderTemplateRange extends SliderTemplate{

    // public slider: any;
    public thumb1: SliderPointer;
    public thumb2: SliderPointer;

    constructor(elem: any, isVertical: string){
        super(elem, isVertical)

        if(isVertical === 'vertical'){
            this.isVertical = true;
        }else{
            this.isVertical = false;
        }

        this.createTemplate();
        this.thumb1.createEventListeners();
        this.thumb2.createEventListeners();
        this.addEventToSliderClick()
    }
    
    createTemplate(){
        this.thumb1 = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
        this.thumb2 = new SliderPointer(document.createElement('div'), this.slider, this.isVertical);
        
        this.slider.appendChild(this.thumb1.thumb);   
        this.slider.appendChild(this.thumb2.thumb);   
        
        if(this.isVertical){
            this.slider.classList.add('j-plugin-slider_vertical');
            this.thumb1.thumb.classList.add('j-plugin-slider__thumb_vertical');
            this.thumb2.thumb.classList.add('j-plugin-slider__thumb_vertical');
        }else{
            this.thumb1.thumb.classList.add('j-plugin-slider__thumb');
            this.thumb2.thumb.classList.add('j-plugin-slider__thumb');
            this.slider.classList.add('j-plugin-slider');
        }
        
    }
    createTemplateVertical(){
        
    }

    

    addEventToSliderClick(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newLeft: number = this.isVertical
                ? event.clientY - this.slider.getBoundingClientRect().top
                : event.clientX - this.slider.getBoundingClientRect().left;
            
            let pointersRange = this.calculatePointersRange();

            if(newLeft < pointersRange/2){
                this.thumb1.currPos = newLeft;
            }
            if(newLeft > pointersRange/2){
                this.thumb2.currPos = newLeft;
            }
                       
        }
    }


    calculatePointersRange(){
        return this.thumb2.currPos - this.thumb1.currPos;
    }




}
