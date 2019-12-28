import ParticlesBackground from './particles-background';

$(() => {
  $('.particles-background').each((index, val: HTMLCanvasElement) => {
    new ParticlesBackground(val);
  });
});
