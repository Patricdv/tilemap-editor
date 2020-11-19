import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const map = [
  [0, 2, 1, 3, 5],
  [0, 0, 0, 3, 5],
  [1, 2, 0, 3, 5],
  [0, 4, 1, 3, 5],
  [0, 2, 1, 3, 5],
];

const tileWidth = 80;
const tileHeight = 80;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [key, setKey] = useState(0);
  let animation;
  let mousePosition = {
    x: -1,
    y: -1,
  };

  const getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / tileWidth),
      y: Math.floor((e.clientY - rect.top) / tileHeight),
    };
  };

  const hoverTile = (ctx, x, y) => {
    ctx.beginPath();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(45, 146, 230)';
    ctx.fillStyle = 'rgb(229, 255, 0)';
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileWidth, y);
    ctx.lineTo(x + tileWidth, y + tileHeight);
    ctx.lineTo(x, y + tileHeight);
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.fill();
  };

  const backgroundTile = (ctx, x, y) => {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#00ffff';
    ctx.fillStyle = 'rgba(192, 57, 43, 0.4)';
    ctx.lineWidth = 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileWidth, y);
    ctx.lineTo(x + tileWidth, y + tileHeight);
    ctx.lineTo(x, y + tileHeight);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();
  };

  const renderMap = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < map.length; i += 1) {
      for (let j = 0; j < map[i].length; j += 1) {
        const x = i * tileWidth;
        const y = j * tileHeight;
        9;
        if (mousePosition.x === i && mousePosition.y === j) {
          hoverTile(ctx, x, y);
        }

        backgroundTile(ctx, x, y);
      }
    }

    animation = requestAnimationFrame(() => renderMap(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    renderMap(ctx);

    canvas.addEventListener(
      'mousemove',
      (e) => {
        mousePosition = getMousePos(canvas, e);
      },
      false,
    );

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <>
      <Head>
        <title>TileMap Test</title>
      </Head>

      <main>
        <canvas
          height={map.length * tileHeight}
          width={map[0].length * tileWidth}
          ref={canvasRef}
          key={key}
        />
      </main>

      <style jsx>
        {`
        main {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        canvas {
          transform: rotateX(55deg) rotateZ(45deg);
        }
      `}

      </style>
    </>
  );
}
