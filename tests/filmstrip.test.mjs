import assert from 'node:assert/strict';
import test from 'node:test';
import { FilmstripMotion } from '../lib/filmstrip-motion.ts';

test('autoscroll resumes from the dragged position after release', () => {
  const motion = new FilmstripMotion();
  motion.advance(100, 1000);
  motion.start(200);
  motion.move(150, 1000);
  motion.advance(50, 1000);
  assert.equal(motion.position, 150);
  motion.end();
  motion.advance(20, 1000);
  assert.equal(motion.position, 170);
});

test('dragging across either loop boundary preserves continuity', () => {
  const motion = new FilmstripMotion();
  motion.start(100);
  motion.move(130, 1000);
  assert.equal(motion.position, 970);
  motion.move(80, 1000);
  assert.equal(motion.position, 20);
  assert.equal(motion.end(), true);
});

test('a tap remains a click and cancellation releases autoplay', () => {
  const motion = new FilmstripMotion();
  motion.start(100);
  motion.move(103, 1000);
  assert.equal(motion.end(), false);
  motion.advance(10, 1000);
  assert.equal(motion.position, 10);
});
