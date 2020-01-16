import { TipView } from './TipView';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__thumb"></div>';

const shadowFollower: HTMLElement = document.querySelector(
  '.j-slider-plugin__thumb',
);
const follower = new TipView(shadowFollower);

describe('View / Tip / Test of initializing', () => {
  it('Tip should be defined', () => {
    expect(follower.tipElement).toHaveClass('j-plugin-slider__tip');
  });

  it('Tip value should coincide setting value', () => {
    follower.setValue(25);
    expect(follower.tipElement.innerHTML).toEqual('25');
  });
});
