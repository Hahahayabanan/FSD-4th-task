import Example from './blocks/example/example';
import ParticlesBackground from './blocks/particles-background/particles-background';

$(() => {
  $('.sliders__element').each((index, val) => {
    const $exampleContainer = $(val);
    new Example($exampleContainer);
  });
});

const bg: HTMLElement = document.querySelector('.sliders');
new ParticlesBackground(bg, {
  bgColor: 'rgba(17, 17, 19, 1)',
  particleColor: 'rgba(255, 255, 255, 1)',
  particleRadius: 5,
  particleCount: 100,
  particleMaxVelocity: 0.5
});
