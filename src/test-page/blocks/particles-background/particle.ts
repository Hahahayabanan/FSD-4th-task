import { ParticleProperties } from '../../helpers/interfaces';

class Particle {
  public properties: ParticleProperties;

  public context: CanvasRenderingContext2D;

  public x: number;

  public y: number;

  public radius: number;

  public velocityX: number;

  public velocityY: number;

  public shadowBlur: number;

  public shadowModifier: number = 0.1;

  public alpha: number;

  public alphaModifier: number = 0.005;

  constructor(properties: ParticleProperties, context: CanvasRenderingContext2D) {
    this.properties = properties;
    this.context = context;
    this.getRandomProperties();
  }

  getRandomProperties() {
    this.x = Math.random() * this.properties.width;
    this.y = Math.random() * this.properties.height;
    this.velocityX = Math.random() * this.properties.particleMaxVelocity
      * 2 - this.properties.particleMaxVelocity;
    this.velocityY = Math.random() * this.properties.particleMaxVelocity
      * 2 - this.properties.particleMaxVelocity;
    this.radius = Math.random() * (this.properties.particleRadius - 1) + 1;
    this.shadowBlur = Math.random() * (20 - 10) + 10;
    this.alpha = Math.random() * (1 - 0.2) + 0.2;
  }

  reDraw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.shadowBlur = this.getShadowBlur();
    this.context.shadowColor = 'rgba(255, 255, 255, 1)';
    this.context.fillStyle = this.getParticleColor();
    this.context.fill();
  }

  position() {
    const currentXBiggerWindow = (this.x + this.velocityX > this.properties.width
      + 10 && this.velocityX > 0) || (this.x + this.velocityX + 20 < 0 && this.velocityX < 0);
    const currentYBiggerWindow = (this.y + this.velocityY > this.properties.height
      + 10 && this.velocityY > 0) || (this.y + this.velocityY + 20 < 0 && this.velocityY < 0);

    if (currentXBiggerWindow) this.velocityX *= -1;
    if (currentYBiggerWindow) this.velocityY *= -1;
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  getShadowBlur() {
    if (this.shadowBlur < 15) this.shadowModifier = 0.1;
    if (this.shadowBlur > 25) this.shadowModifier = -0.1;
    this.shadowBlur += this.shadowModifier;
    return this.shadowBlur;
  }

  getParticleColor() {
    if (this.alpha > 0.9) this.alphaModifier = -0.005;
    if (this.alpha < 0.2) this.alphaModifier = 0.005;
    this.alpha += this.alphaModifier;
    return this.properties.particleColor.replace(/[^,]+(?=\))/, `${this.alpha}`);
  }
}

export default Particle;
