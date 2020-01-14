import bind from 'bind-decorator';
import Particle from './Particle';
import { ParticleProperties } from '../../helpers/interfaces';
import defaultProperties from './defaultProperties';

class ParticlesBackground {
  public canvas: HTMLCanvasElement;

  public context: CanvasRenderingContext2D;

  public particles: Particle[] = [];

  public particleProperties: ParticleProperties;

  constructor(elemHTML: HTMLCanvasElement) {
    this.canvas = elemHTML;
    this.particleProperties = $.extend(defaultProperties, $(this.canvas).data());
    this.init();
  }

  init() {
    this.context = this.canvas.getContext('2d');
    this.canvas.style.webkitFilter = 'blur(1.3px)';
    this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
    this.canvas.height = this.canvas.parentElement.getBoundingClientRect().height;
    this.particleProperties.bgWidth = this.canvas.width;
    this.particleProperties.bgHeight = this.canvas.height;

    this.bindEventListeners();
    this.initParticles();
    this.loop();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleProperties.count; i += 1) {
      this.particles.push(new Particle(this.particleProperties, this.context));
    }
  }

  bindEventListeners() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  @bind
  handleWindowResize() {
    this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
    this.canvas.height = this.canvas.parentElement.getBoundingClientRect().height;
    this.setParticleProperties({
      bgWidth: this.canvas.width,
      bgHeight: this.canvas.height,
    });
    this.particleProperties.bgWidth = this.canvas.width;
    this.particleProperties.bgHeight = this.canvas.height;
  }

  reDrawBackground() {
    this.context.fillStyle = this.particleProperties.bgColor;
    this.context.fillRect(0, 0, this.particleProperties.bgWidth, this.particleProperties.bgHeight);
  }

  reDrawParticles() {
    this.particles.forEach((particle: Particle) => {
      particle.updatePosition();
      particle.reDraw();
    });
  }

  loop() {
    this.reDrawBackground();
    this.reDrawParticles();
    requestAnimationFrame(this.loop.bind(this));
  }

  setParticleProperties(newProperties: ParticleProperties) {
    this.particles.forEach((particle: Particle) => {
      particle.setProperties(newProperties);
    });
  }
}


export default ParticlesBackground;
