class Balloon {
    constructor(x, color) {
      this.height = Math.pow(Math.random(), 3) * 80 + 40;
      this.width = Math.pow(Math.random(), 3) * (this.height - 30) + 20;
      this.x = x;
      this.y = canvas.height + this.height;
      this.color1 = randomColor();
      this.color2 = randomColor();
      this.text = String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  
      this.speed = Math.random() + 3.5;
      let len = Math.random() * 50 + 50;
      this.string = [
        [(Math.random() - 0.5) * 30, len / 3],
        [(Math.random() - 1.5) * 30, 2 * len / 3],
        [(Math.random() - 0.5) * 30, len],
      ];
    }
  }