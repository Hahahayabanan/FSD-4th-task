import { SliderTemplate } from './SliderTemplate';

describe('View / Slider template / Test of setting pointer positions', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  const slider = new SliderTemplate(shadowSlider);

  slider.slider.style.cssText = 'width: 300px';

  it('Curr position should be set', () => {
    slider.thumb.setCurPos(150);
    expect(slider.thumb.curPos).toEqual(150);
  });

  it('Should update value of curr position on change 236', () => {
    slider.thumb.renderCurrentPosInPixels(236);
    // width  300px - 100 %
    // newPos 236px -  79 %
    expect(Math.round(parseInt(slider.thumb.thumbHTMLElem.style.left, 10))).toEqual(78);
  });
  it('Should update value of curr position on change 33', () => {
    slider.thumb.renderCurrentPosInPercents(33);
    expect(slider.thumb.thumbHTMLElem.style.left).toEqual('33%');
  });
});

describe('View / Vertical Slider template / Test of setting pointer positions', () => {
  const shadowSlider = document.createElement('div');
  shadowSlider.classList.add('slider');

  const slider = new SliderTemplate(shadowSlider, true);
  slider.slider.style.cssText = 'height: 300px';

  it('Curr position should be set', () => {
    slider.thumb.setCurPos(150);
    expect(slider.thumb.curPos).toEqual(150);
  });

  it('Should update value of curr position on change 236', () => {
    slider.thumb.renderCurrentPosInPixels(236);
    expect(Math.round(parseInt(slider.thumb.thumbHTMLElem.style.top, 10))).toEqual(78);
  });
  it('Should update value of curr position on change 33', () => {
    slider.thumb.renderCurrentPosInPercents(33);
    expect(slider.thumb.thumbHTMLElem.style.top).toEqual('33%');
  });
});
