import Particle from './particle';
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
    window.onresize = () => {
      this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
      this.canvas.height = this.canvas.parentElement.getBoundingClientRect().height;
      this.setParticleProperties({
        bgWidth: this.canvas.width,
        bgHeight: this.canvas.height,
      });
      this.particleProperties.bgWidth = this.canvas.width;
      this.particleProperties.bgHeight = this.canvas.height;
    };
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

  setBackgroundProperties(newProperties: ParticleProperties) {
    Object.keys(newProperties).forEach(key => {
      const value = newProperties[key];
      switch (key) {
        case 'bgWidth' || 'bgHeight':
          if (value > 0) this.particleProperties[key] = value;
          break;
        case 'count':
          if (value > 0 && value < 500) {
            this.particleProperties[key] = value;
            this.initParticles();
          }
          break;
        default:
      }
    });
  }

  setParticleProperties(newProperty: ParticleProperties) {
    this.particles.forEach((particle: Particle) => {
      particle.setProperties(newProperty);
    });
  }
}


export default ParticlesBackground;
