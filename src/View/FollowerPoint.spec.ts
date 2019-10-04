import { FollowerPoint } from './FollowerPoint';

document.body.innerHTML = '<div id="test" class="j-slider-plugin__thumb"></div>';

const shadowFollower = document.querySelector('.j-slider-plugin__thumb') as HTMLElement;
const follower = new FollowerPoint(shadowFollower);

describe('View / Slider Pointer / Test of setting', () => {
  it('Slider pointer should be set', () => {
    expect(follower.elemHTMLElement).toHaveClass('j-plugin-slider__follower-point');
  });
});
