"use client";

import { useEffect, useRef } from "react";

type ShapeGridDirection = "up" | "down" | "left" | "right" | "diagonal";
type ShapeGridShape = "square" | "hexagon" | "circle" | "triangle";

interface ShapeGridProps {
  direction?: ShapeGridDirection;
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: ShapeGridShape;
  hoverTrailAmount?: number;
  className?: string;
}

export default function ShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "rgba(255,255,255,0.12)",
  squareSize = 40,
  hoverFillColor = "rgba(12,192,223,0.25)",
  shape = "square",
  hoverTrailAmount = 0,
  className = "",
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    let requestId: number | null = null;
    let numSquaresX = 0;
    let numSquaresY = 0;
    const gridOffset = { x: 0, y: 0 };
    let hoveredSquare: { x: number; y: number } | null = null;
    const trailCells: { x: number; y: number }[] = [];
    const cellOpacities = new Map<string, number>();

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    void numSquaresX;
    void numSquaresY;

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      flip: boolean
    ) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHex) {
        const colShift = Math.floor(gridOffset.x / hexHoriz);
        const offsetX = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.y % hexVert) + hexVert) % hexVert;

        const cols = Math.ceil(canvas.width / hexHoriz) + 3;
        const rows = Math.ceil(canvas.height / hexVert) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * hexHoriz + offsetX;
            const cy =
              row * hexVert +
              ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) +
              offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawHex(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawHex(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.x / halfW);
        const rowShift = Math.floor(gridOffset.y / squareSize);
        const offsetX = ((gridOffset.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / halfW) + 4;
        const rows = Math.ceil(canvas.height / squareSize) + 4;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip = (((col + colShift + row + rowShift) % 2) + 2) % 2 !== 0;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawTriangle(cx, cy, squareSize, flip);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawTriangle(cx, cy, squareSize, flip);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              drawCircle(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawCircle(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else {
        const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;

            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.get(cellKey);
            if (alpha) {
              ctx.globalAlpha = alpha;
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(sx, sy, squareSize, squareSize);
              ctx.globalAlpha = 1;
            }

            ctx.strokeStyle = borderColor;
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquare) {
        targets.set(`${hoveredSquare.x},${hoveredSquare.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.length; i++) {
          const t = trailCells[i];
          const key = `${t.x},${t.y}`;
          if (!targets.has(key)) {
            targets.set(key, (trailCells.length - i) / (trailCells.length + 1));
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.has(key)) {
          cellOpacities.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities) {
        const target = targets.get(key) || 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) {
          cellOpacities.delete(key);
        } else {
          cellOpacities.set(key, next);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.x = (gridOffset.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.x = (gridOffset.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.y = (gridOffset.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.y = (gridOffset.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.x = (gridOffset.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.y = (gridOffset.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      updateCellOpacities();
      drawGrid();
      requestId = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let col: number;
      let row: number;

      if (isHex) {
        const colShift = Math.floor(gridOffset.x / hexHoriz);
        const offsetX = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        col = Math.round(adjustedX / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        row = Math.round((adjustedY - rowOffset) / hexVert);
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        col = Math.round(adjustedX / halfW);
        row = Math.floor(adjustedY / squareSize);
      } else if (shape === "circle") {
        const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        col = Math.round(adjustedX / squareSize);
        row = Math.round(adjustedY / squareSize);
      } else {
        const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        col = Math.floor(adjustedX / squareSize);
        row = Math.floor(adjustedY / squareSize);
      }

      if (!hoveredSquare || hoveredSquare.x !== col || hoveredSquare.y !== row) {
        if (hoveredSquare && hoverTrailAmount > 0) {
          trailCells.unshift({ ...hoveredSquare });
          if (trailCells.length > hoverTrailAmount) trailCells.length = hoverTrailAmount;
        }
        hoveredSquare = { x: col, y: row };
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquare && hoverTrailAmount > 0) {
        trailCells.unshift({ ...hoveredSquare });
        if (trailCells.length > hoverTrailAmount) trailCells.length = hoverTrailAmount;
      }
      hoveredSquare = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let isVisible = false;
    let isPageVisible = !document.hidden;

    const tryStart = () => {
      if (isVisible && isPageVisible && requestId === null) {
        requestId = requestAnimationFrame(updateAnimation);
      }
    };
    const tryStop = () => {
      if (requestId !== null) {
        cancelAnimationFrame(requestId);
        requestId = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tryStop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount]);

  return (
    <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />
  );
}
