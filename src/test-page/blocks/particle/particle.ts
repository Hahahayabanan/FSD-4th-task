import { ParticleProperties } from '../../helpers/interfaces';

class Particle {
  public properties: ParticleProperties;

  public context: CanvasRenderingContext2D;

  public x: number;

  public y: number;

  public radius: number;

  public velocityX: number;

  public velocityY: number;

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
  }

  reDraw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.shadowBlur = 15;
    this.context.shadowColor = 'rgba(255, 255, 255, 1)';
    this.context.fillStyle = this.properties.particleColor;
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
}

export default Particle;
