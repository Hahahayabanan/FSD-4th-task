import { ParticleProperties } from '../../helpers/interfaces';

class Particle {
  public properties: ParticleProperties = {};

  public context: CanvasRenderingContext2D;

  constructor(properties: ParticleProperties, context: CanvasRenderingContext2D) {
    this.setProperties(properties);
    this.context = context;
    this.getRandomProperties();
  }

  getRandomProperties() {
    const {
      velocityModifier, bgWidth, bgHeight, radius
    } = this.getProperties();
    this.setProperties({
      x: Math.random() * bgWidth,
      y: Math.random() * bgHeight,
      velocityX: Math.random() * velocityModifier * 2 - velocityModifier,
      velocityY: Math.random() * velocityModifier * 2 - velocityModifier,
      radius: Math.random() * (radius - 1) + 1,
      shadowBlur: Math.random() * (20 - 10) + 10,
      alpha: Math.random() * (1 - 0.2) + 0.2,
    });
  }

  reDraw() {
    const {
      x, y, radius, radiusModifier,
    } = this.getProperties();
    this.context.beginPath();
    this.context.arc(x, y, radius * radiusModifier, 0, Math.PI * 2);
    this.context.closePath();
    this.context.shadowBlur = this.getShadowBlur();
    this.context.shadowColor = this.getParticleColor();
    this.context.fillStyle = this.getParticleColor();
    this.context.fill();
  }

  updatePosition() {
    const {
      x, y, velocityX, velocityY, velocityModifier, bgWidth, bgHeight,
    } = this.getProperties();
    const isCurrentXBiggerWindow = (x + velocityX > bgWidth + 20 && velocityX > 0)
      || (x + velocityX + 20 < 0 && velocityX < 0);
    const isCurrentYBiggerWindow = (y + velocityY > bgHeight + 20 && velocityY > 0)
      || (y + velocityY + 20 < 0 && velocityY < 0);
    if (isCurrentXBiggerWindow) this.setProperties({ velocityX: velocityX * -1 });
    if (isCurrentYBiggerWindow) this.setProperties({ velocityY: velocityY * -1 });
    this.setProperties({
      x: x + this.getProperties().velocityX * velocityModifier,
      y: y + this.getProperties().velocityY * velocityModifier,
    });
  }

  getShadowBlur() {
    const { shadowBlur, shadowModifier } = this.getProperties();
    if (shadowBlur < 15 || shadowBlur > 25) {
      this.setProperties({ shadowModifier: shadowModifier * -1 });
    }
    this.setProperties({ shadowBlur: shadowBlur + shadowModifier });
    return this.getProperties().shadowBlur;
  }

  getParticleColor() {
    const { alpha, alphaModifier, color } = this.getProperties();
    if (alpha > 0.9 || alpha < 0.2) this.setProperties({ alphaModifier: alphaModifier * -1 });
    this.setProperties({ alpha: alpha + alphaModifier });
    return color.replace(/[^,]+(?=\))/, `${alpha}`);
  }

  getProperties() {
    return { ...this.properties };
  }

  setProperties(newProperties: ParticleProperties) {
    Object.keys(newProperties).forEach(key => {
      const value = newProperties[key];
      switch (key) {
        case 'bgWidth' || 'bgHeight':
          if (value > 0) this.properties[key] = value;
          break;
        case 'radius':
          if (value > 0 && value < 100) this.properties[key] = value;
          break;
        case 'radiusModifier':
          if (value > 0 && value < 50) this.properties[key] = value;
          break;
        case 'count':
          if (value > 0 && value < 500) this.properties[key] = value;
          break;
        case 'velocityModifier':
          if (value > 0 && value < 300) this.properties[key] = value;
          break;
        case 'shadowBlur':
          if (value >= 0 && value < 100) this.properties[key] = value;
          break;
        case 'shadowModifier':
          if (value > -30 && value < 30) this.properties[key] = value;
          break;
        case 'alpha':
          if (value >= 0 && value <= 1) this.properties[key] = value;
          break;
        case 'alphaModifier':
          if (value > -1 && value < 1) this.properties[key] = value;
          break;
        default: this.properties[key] = value;
      }
    });
  }
}

export default Particle;
