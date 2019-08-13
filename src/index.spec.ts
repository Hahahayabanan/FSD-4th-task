import { SliderTemplate } from './View/SliderTemplate';
import { Slider } from './Model/Slider';
import { SliderSettings } from './Model/SliderSettings';





describe('Model / Slider / Test initialization', () => {

    let slider = new Slider();

    it('Should to initializate slider object', () => {
        
        slider.setSettings({
            range: false, 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
        });

        expect(slider.settings).toEqual(new SliderSettings({
            range: false, 
            minVal: 1, 
            maxVal: 10, 
            stepVal: 1, 
        }));
    });
       

    it('Should to change slider settings', () => {

        slider.settings.setMaxVal(100);

        expect(slider.settings).toEqual(new SliderSettings({
            range: false, 
            minVal: 1, 
            maxVal: 100, 
            stepVal: 1, 
        }));
    });

    
})

describe('Model / Slider / Test moving', () => {

    let slider = new Slider({
        minVal: 20,
        maxVal: 100,
        stepVal: 5
    }); 
           
    it('Should change pointer position', ()=>{
        slider.setPointerPosition(58);
        expect(slider.pointer).toEqual(60);
    });

    it('Should change pointer position', ()=>{
        slider.setPointerPosition(92);
        expect(slider.pointer).toEqual(90);
    });

})









describe('View / Slider template / Test initialization', () => {

    let slider = function createSlider(){

        let shadowSlider = document.createElement('div');

        let shadowSliderThumb = document.createElement('div');
        shadowSlider.appendChild(shadowSliderThumb);
        
        return new SliderTemplate();
    }


  it('A ', () => {
    
  });

});