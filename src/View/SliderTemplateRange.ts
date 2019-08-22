import SliderPointer from './SliderPointer'
import SliderTemplate from './SliderTemplate'

export class SliderTemplateRange {

    public slider: any;
    public isVertical: boolean;
    public thumb1: SliderPointer;
    public thumb2: SliderPointer;

    constructor(elem: any, isVertical: string){
        this.slider = elem;
       
        if(isVertical === 'vertical'){
            this.isVertical = true;
        }else{
            this.isVertical = false;
        }

        this.createTemplate();

        

        this.thumb1.createEventListeners(this.thumb2);
        this.thumb2.createEventListeners(this.thumb1);
        this.addEventToSliderClick();
        
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
        let res:number = (this.thumb2.currPos-this.thumb1.currPos) / 2 + this.thumb1.currPos
        return res;
    }




}
