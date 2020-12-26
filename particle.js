class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velX = 5 * Math.random() - 1;
      this.velY = -5 * Math.random();
    }
  
    update() {
      this.x += this.velX;
      this.y += this.velY;
      this.velY++;
    }  
  }