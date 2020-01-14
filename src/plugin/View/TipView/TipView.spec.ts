import { TipView } from './TipView';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__thumb"></div>';

const shadowFollower: HTMLElement = document.querySelector(
  '.j-slider-plugin__thumb',
);
const follower = new TipView(shadowFollower);

describe('View / Tip / Test of setting', () => {
  it('Slider pointer should be set', () => {
    expect(follower.tipHTML).toHaveClass('j-plugin-slider__tip');
  });
  it('Slider pointer value should be set', () => {
    follower.setValue(25);
    expect(follower.tipHTML.innerHTML).toEqual('25');
  });
});
