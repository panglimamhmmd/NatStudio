"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { FilmstripMotion } from "@/lib/filmstrip-motion";

export default function FilmstripScroll({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current!;
    const track = trackRef.current!;
    const motion = new FilmstripMotion();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let pointer: number | null = null;
    let suppressClick = false;
    let frame = 0;
    let lastTime = 0;
    let focused = false;

    const render = () => {
      track.style.transform = `translate3d(${-motion.position}px, 0, 0)`;
    };
    const measure = () => {
      width = track.scrollWidth / 2;
      motion.advance(0, width);
      render();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();

    const tick = (time: number) => {
      // Cap elapsed time so returning to a background tab never jumps ahead.
      if (lastTime && !reducedMotion.matches && !focused && !document.hidden) {
        motion.advance((Math.min(time - lastTime, 50) / 23000) * width, width);
        render();
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
      pointer = event.pointerId;
      suppressClick = false;
      motion.start(event.clientX);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      motion.move(event.clientX, width);
      if (Math.abs(event.clientX - startX) >= 6) {
        if (!viewport.hasPointerCapture(event.pointerId)) {
          viewport.setPointerCapture(event.pointerId);
        }
        viewport.classList.add("is-dragging");
      }
      render();
    };
    let startX = 0;
    const start = (event: PointerEvent) => {
      if (pointer === null) startX = event.clientX;
      down(event);
    };
    const finish = () => {
      if (pointer === null) return;
      const releasedPointer = pointer;
      suppressClick = motion.end();
      pointer = null;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(releasedPointer)) {
        viewport.releasePointerCapture(releasedPointer);
      }
    };
    const end = (event: PointerEvent) => {
      if (event.pointerId === pointer) finish();
    };
    const click = (event: MouseEvent) => {
      if (suppressClick && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const focus = (event: FocusEvent) => {
      focused = (event.target as HTMLElement).matches(":focus-visible");
      if (!focused) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>(".frame");
      if (card && width > 0) {
        const delta = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
        motion.advance(delta, width);
        viewport.scrollLeft = 0;
        render();
      }
    };
    const blur = (event: FocusEvent) => {
      if (!viewport.contains(event.relatedTarget as Node | null)) focused = false;
    };
    const preventDrag = (event: DragEvent) => event.preventDefault();
    viewport.addEventListener("pointerdown", start);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("blur", finish);
    window.addEventListener("pointercancel", end);
    viewport.addEventListener("lostpointercapture", end);
    viewport.addEventListener("click", click, true);
    viewport.addEventListener("dragstart", preventDrag);
    viewport.addEventListener("focusin", focus);
    viewport.addEventListener("focusout", blur);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("pointerdown", start);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("blur", finish);
      window.removeEventListener("pointercancel", end);
      viewport.removeEventListener("lostpointercapture", end);
      viewport.removeEventListener("click", click, true);
      viewport.removeEventListener("dragstart", preventDrag);
      viewport.removeEventListener("focusin", focus);
      viewport.removeEventListener("focusout", blur);
    };
  }, []);

  return (
    <div ref={viewportRef} className="filmstrip-scroll py-2">
      <div ref={trackRef} className="filmstrip-track flex w-max">{children}</div>
    </div>
  );
}
