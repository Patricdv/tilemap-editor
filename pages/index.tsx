import Head from 'next/head';
import { useEffect, useRef } from 'react';

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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    for (const i in map) {
      for (const j in map[i]) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = '#00ffff';
        ctx.rect(
          parseInt(j, 10) * tileWidth,
          parseInt(i, 10) * tileHeight,
          tileWidth,
          tileWidth
        );
        ctx.stroke();
        // ctx.fillStyle = colors[map[i][j]];
        // ctx.rect(
        //   parseInt(j, 10) * tileWidth,
        //   parseInt(i, 10) * tileHeight,
        //   tileWidth,
        //   tileWidth
        // );
        // ctx.fill();
      }
    }
  });

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
        />
      </main>

      <style jsx>{`
        main {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        canvas {
          transform: rotateX(55deg) rotateZ(45deg);
        }
      `}</style>
    </>
  );
}
