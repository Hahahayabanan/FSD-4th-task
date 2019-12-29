import ParticlesBackground from './particles-background';

const particlesBackgrounds: ParticlesBackground[] = [];
$(() => {
  $('.particles-background').each((index, val: HTMLCanvasElement) => {
    particlesBackgrounds.push(new ParticlesBackground(val));
  });
});

export { particlesBackgrounds };
