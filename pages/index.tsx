import Head from 'next/head';
import { useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  return (
    <>
      <Head>
        <title>TileMap Test</title>
      </Head>

      <main>
        <canvas ref={canvasRef}></canvas>
      </main>
    </>
  );
}
