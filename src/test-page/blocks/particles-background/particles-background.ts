import Particle from '../particle/particle';
import { ParticleProperties } from '../../helpers/interfaces';

class ParticlesBackground {
  public elemHTML: HTMLElement;

  public canvas: HTMLCanvasElement;

  public context: CanvasRenderingContext2D;

  public particles: Particle[] = [];;

  public properties: ParticleProperties;

  constructor(elemHTML: HTMLElement, properties: ParticleProperties) {
    this.elemHTML = elemHTML;
    this.properties = properties;

    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('particles-background__canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.elemHTML.getBoundingClientRect().width;
    this.canvas.height = this.elemHTML.getBoundingClientRect().height;
    this.canvas.style.webkitFilter = 'blur(1.5px)';
    this.properties.width = this.canvas.width;
    this.properties.height = this.canvas.height;
    this.elemHTML.prepend(this.canvas);

    this.bindEventListeners();

    for (let i = 0; i < this.properties.particleCount; i += 1) {
      this.particles.push(new Particle(this.properties, this.context));
    }

    this.loop();
  }

  bindEventListeners() {
    window.onresize = () => {
      this.canvas.width = this.elemHTML.getBoundingClientRect().width;
      this.properties.width = this.canvas.width;
      this.canvas.height = this.elemHTML.getBoundingClientRect().height;
      this.properties.height = this.canvas.height;
    };
  }

  reDrawBackground() {
    this.context.fillStyle = this.properties.bgColor;
    this.context.fillRect(0, 0, this.properties.width, this.properties.height);
  }

  reDrawParticles() {
    this.particles.forEach((particle: Particle) => {
      particle.position();
      particle.reDraw();
    });
  }

  loop() {
    this.reDrawBackground();
    this.reDrawParticles();
    requestAnimationFrame(this.loop.bind(this));
  }
}


export default ParticlesBackground;
