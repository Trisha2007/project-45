class Explosion {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.frame = 0;
      this.particles = Array.from(Array(20), () => new Particle(x, y, color));
    }
  
    update() {
      if (++this.frame > 20) {
        return false;
      }
  
      for (let particle of this.particles) {
        particle.update();
      }
      return true;
    }
  }