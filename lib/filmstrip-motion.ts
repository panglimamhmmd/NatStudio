/** Shared position for autoplay and pointer dragging, in one repeated set. */
export class FilmstripMotion {
  position = 0;
  dragging = false;
  private origin = 0;
  private previous = 0;
  private moved = false;

  advance(distance: number, width: number) {
    if (!this.dragging && width > 0) this.shift(distance, width);
  }

  start(x: number) {
    this.dragging = true;
    this.origin = this.previous = x;
    this.moved = false;
  }

  move(x: number, width: number) {
    if (!this.dragging || width <= 0) return;
    if (!this.moved && Math.abs(x - this.origin) < 6) return;
    this.moved = true;
    this.shift(this.previous - x, width);
    this.previous = x;
  }

  end() {
    this.dragging = false;
    return this.moved;
  }

  private shift(distance: number, width: number) {
    this.position = ((this.position + distance) % width + width) % width;
  }
}
