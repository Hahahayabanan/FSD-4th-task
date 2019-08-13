import { SliderTemplate } from './View/SliderTemplate';
import { Slider } from './Model/Slider';
import { SliderSettings } from './Model/SliderSettings';





describe('Model / Slider / Test initialization', () => {

    let slider = new Slider();
    let sliderSettings = new SliderSettings('single', 1, 10, 1, false);

    slider.setSettings(sliderSettings);


    it('Should to initializate slider object', () => {
        expect(slider.settings).toEqual(new SliderSettings('single', 1, 10, 1, false))
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