import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const map = [
  [0, 2, 1, 3, 5, 0, 2, 1, 3, 5],
  [0, 0, 0, 3, 5, 0, 2, 1, 3, 5],
  [1, 2, 0, 3, 5, 0, 2, 1, 3, 5],
  [0, 4, 1, 3, 5, 0, 2, 1, 3, 5],
  [0, 2, 1, 3, 5, 0, 2, 1, 3, 5],
  [0, 2, 1, 3, 5, 0, 2, 1, 3, 5],
  [0, 0, 0, 3, 5, 0, 2, 1, 3, 5],
  [1, 2, 0, 3, 5, 0, 2, 1, 3, 5],
  [0, 4, 1, 3, 5, 0, 2, 1, 3, 5],
  [0, 2, 1, 3, 5, 0, 2, 1, 3, 5],
];

const tileWidth = 96;
const tileHeight = 48;
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [key, setKey] = useState(0);
  let animation;
  let mousePosition = {
    x: -1,
    y: -1,
  };
  let DEFAULT_TILE;

  const getMousePos = (
    canvas: HTMLCanvasElement,
    e: MouseEvent,
    initialX: number,
    initialY: number
  ) => {
    const rect = canvas.getBoundingClientRect();

    let mouseX = e.clientX - rect.left - initialX;
    let mouseY = e.clientY - rect.top - initialY;

    const hoverTileX = Math.floor(mouseY / tileHeight + mouseX / tileWidth);
    const hoverTileY =
      Math.floor(-mouseX / tileWidth + mouseY / tileHeight) + 1;

    console.log(hoverTileX, hoverTileY);
    return {
      x: hoverTileX,
      y: hoverTileY,
    };
  };

  const hoverTile = (ctx, x, y) => {
    let tileHalfWidth = tileWidth / 2;
    let tileHalfHeight = tileHeight / 2;

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(45, 146, 230, 0.8)';
    ctx.fillStyle = 'rgba(229, 255, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileHalfWidth, y - tileHalfHeight);
    ctx.lineTo(x + tileWidth, y);
    ctx.lineTo(x + tileHalfWidth, y + tileHalfHeight);
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.fill();
  };

  const backgroundTile = (ctx, x, y) => {
    let tileHalfWidth = tileWidth / 2;
    let tileHalfHeight = tileHeight / 2;

    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.fillStyle = 'rgba(25,34, 44,0.2)';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileHalfWidth, y - tileHalfHeight);
    ctx.lineTo(x + tileWidth, y);
    ctx.lineTo(x + tileHalfWidth, y + tileHalfHeight);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();
    ctx.drawImage(DEFAULT_TILE, x, y - tileHalfHeight);
  };

  const renderMap = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    initialX: number,
    initialY: number
  ) => {
    let tileHalfWidth = tileWidth / 2;
    let tileHalfHeight = tileHeight / 2;

    ctx.fillStyle = '#151d26';
    ctx.fillRect(0, 0, canvas?.width, canvas?.height);

    for (let tileX = 0; tileX < map.length; tileX += 1) {
      for (let tileY = 0; tileY < map[tileX].length; tileY += 1) {
        let renderX = initialX + (tileX - tileY) * tileHalfWidth;
        let renderY = initialY + (tileX + tileY) * tileHalfHeight;

        backgroundTile(ctx, renderX, renderY);
        if (mousePosition.x === tileX && mousePosition.y === tileY) {
          hoverTile(ctx, renderX, renderY);
        }
      }
    }

    animation = requestAnimationFrame(() =>
      renderMap(ctx, canvas, initialX, initialY)
    );
  };

  useEffect(() => {
    DEFAULT_TILE = new Image();
    DEFAULT_TILE.src =
      'data:image/png;base64,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';

    const initialX = window.innerWidth / 2 - 50;
    const initialY = window.innerHeight / 10;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d', { alpha: false });
    renderMap(ctx, canvas, initialX, initialY);

    canvas.addEventListener(
      'mousemove',
      (e) => {
        mousePosition = getMousePos(canvas, e, initialX, initialY);
      },
      false
    );

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      cancelAnimationFrame(animation);
      canvas.removeEventListener('mousemove', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <>
      <Head>
        <title>TileMap Test</title>
      </Head>

      <main>
        <canvas ref={canvasRef} key={key} draggable />
      </main>

      <style jsx>
        {`
          main {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          canvas {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </>
  );
}
