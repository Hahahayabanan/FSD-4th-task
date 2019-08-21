import SliderPointer from './SliderPointer'
import SliderTemplate from './SliderTemplate'

export class SliderTemplateRange extends SliderTemplate{

    // public slider: any;
    public thumb1: SliderPointer;
    public thumb2: SliderPointer;

    constructor(elem: any, isVertical: boolean){
        super(elem, isVertical)

        if(isVertical){
            this.createTemplateVertical();
            this.thumb1.createEventListenersVertical(this.thumb2);
            this.thumb2.createEventListenersVertical(this.thumb1);
            this.addEventToSliderClickVertical();
        }else{
            this.createTemplate();
            this.thumb1.createEventListeners(this.thumb2);
            this.thumb2.createEventListeners(this.thumb1);
            this.addEventToSliderClick();
        }
    }
    
    createTemplate(){
        this.slider.classList.add('j-plugin-slider');

        this.thumb1 = new SliderPointer(document.createElement('div'), this.slider);
        this.thumb1.thumb.classList.add('j-plugin-slider__thumb');
        this.thumb2 = new SliderPointer(document.createElement('div'), this.slider);
        this.thumb2.thumb.classList.add('j-plugin-slider__thumb');

        this.slider.appendChild(this.thumb1.thumb);   
        this.slider.appendChild(this.thumb2.thumb);   
    }

    

    addEventToSliderClick(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newLeft: number = event.clientX - this.slider.getBoundingClientRect().left;
            
            let pointersRange = this.calculatePointersRange();

            if(newLeft < pointersRange/2){
                this.thumb1.currPos = newLeft;
            }
            if(newLeft > pointersRange/2){
                this.thumb2.currPos = newLeft;
            }
                       
        }
    }
    addEventToSliderClickVertical(){
        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newTop: number = event.clientY - this.slider.getBoundingClientRect().Top;
            
            let pointersRange = this.calculatePointersRange();

            if(newTop < pointersRange/2){
                this.thumb1.currPos = newTop;
            }
            if(newTop > pointersRange/2){
                this.thumb2.currPos = newTop;
            }
                       
        }
    }

    calculatePointersRange(){
        return this.thumb2.currPos - this.thumb1.currPos;
    }








}
