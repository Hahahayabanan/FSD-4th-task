import SliderTemplate from './SliderTemplate'

export class SliderTemplateVertical extends SliderTemplate{


    constructor(elem: any){
        super(elem);
        
    }

    createTemplate(){
        this.slider.classList.add('j-plugin-slider_vertical');

        this.thumb = document.createElement('div');
        this.thumb.classList.add('j-plugin-slider__thumb_vertical');

        this.slider.appendChild(this.thumb);   
    }

    createEventListeners(){
        this.thumb.onmousedown = (event:any) => {
            event.preventDefault();

            let shiftY = event.clientY - this.thumb.getBoundingClientRect().top;
           

            let onMouseMove = (event:any) => {
                let newTop: number = event.clientY - shiftY - this.slider.getBoundingClientRect().top;
               

                if (newTop < 0) {
                    newTop = 0;
                }

                let rightEdge: number = this.slider.offsetHeight - this.thumb.offsetHeight;

                if (newTop > rightEdge) {
                    newTop = rightEdge;
                }

                this.currPos = newTop;
            }

            let onMouseUp = () => {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
           

        };

        this.thumb.ondragstart = function() {
            return false;
        };

        this.slider.onclick = (event:any) => {
            event.preventDefault();
            let newTop: number = event.clientY - this.slider.getBoundingClientRect().top;
            this.currPos = newTop;           
        }
    }

    renderCurrentPos(newPos: number){
        this.thumb.style.top = this.calculateCurrPosInPercents(newPos) + '%';
        return this.thumb.style.top;
    }



    calculateCurrPosInPercents(newPos:number){
        let sliderStyle: string = this.slider.getBoundingClientRect().height || this.slider.style.height;
        return Math.round(newPos * 100 / parseInt(sliderStyle, 10));
    }

    renderCurrentPosInPercents(newPos: number){
        this.thumb.style.top = newPos + '%';
        return this.thumb.style.top;
    }

    
}

export default SliderTemplateVertical;
  