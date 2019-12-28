import ParticlesBackground from './particles-background';

$('.particles-background').each((index, val: any) => {
  new ParticlesBackground(val);
});
