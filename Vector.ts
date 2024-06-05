class Vector {
  public static zero = new Vector();
  public static one = new Vector(1, 1);

  public readonly x: number;
  public readonly y: number;

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  public plus(v: Vector | number, y: number = 0) {
    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y);
    return new Vector(this.x + v, this.y + y);
  }

  public minus(v: Vector | number, y: number = 0) {
    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y);
    return new Vector(this.x - v, this.y - y);
  }

  public multiply(n: number) {
    return new Vector(this.x * n, this.y * n);
  }

  public divide(n: number) {
    return new Vector(this.x / n, this.y / n);
  }

  public reverse() {
    return this.multiply(-1);
  }

  public sqrDistance() {
    return this.x * this.x + this.y * this.y;
  }

  public distance() {
    return Math.sqrt(this.sqrDistance());
  }

  public normalize() {
    const distance = this.distance();
    return new Vector(this.x / distance, this.y / distance);
  }
}

export default Vector;
