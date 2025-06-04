export interface Song {
  title: string;
  description: string;
  image: string;
  track: string;
  draw: (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    canvas: HTMLCanvasElement,
    barWidth: number
  ) => void;
}

const rawSongs = [
  {
    title: "lilium",
    description: "i really like",
    draw: (
      ctx: CanvasRenderingContext2D,
      dataArray: Uint8Array,
      canvas: HTMLCanvasElement,
      barWidth: number
    ): void => {
      for (let i = 0, x = 0; i < dataArray.length; i++, x += barWidth) {
        const barHeight = dataArray[i] * 0.6;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * 4);
        ctx.beginPath();
        ctx.arc(0, barHeight / 2, barHeight / 2, 0, (Math.PI * 3) / 4);
        ctx.fillStyle = `hsl(${(i / dataArray.length) * 360}, 100%, 60%)`;
        ctx.fill();
        ctx.stroke;
        ctx.restore();
      }
    },
  },
  {
    title: "clair-obscure",
    description: "i really like",
    draw: (
      ctx: CanvasRenderingContext2D,
      dataArray: Uint8Array,
      canvas: HTMLCanvasElement,
      barWidth: number
    ): void => {
      for (let i = 0, x = 0; i < dataArray.length; i++, x += barWidth) {
        const barHeight = dataArray[i];
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * x);
        ctx.fillStyle = `hsl(${x},100%,${x}%)`;
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.restore();
      }
    },
  },
  {
    title: "hikari 光",
    description: "i really like",
    draw: (
      ctx: CanvasRenderingContext2D,
      dataArray: Uint8Array,
      canvas: HTMLCanvasElement,
      barWidth: number
    ): void => {
      for (let i = 0, x = 0; i < dataArray.length; i++, x += barWidth) {
        const barHeight = dataArray[i] * 0.6;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * 4);
        ctx.beginPath();
        ctx.arc(0, barHeight / 2, barHeight / 2, 0, (Math.PI * 3) / 4);
        ctx.fillStyle = `hsl(${(dataArray[i] * 2) % 360}, 100%, 60%)`;
        ctx.fill();
        ctx.stroke;
        ctx.restore();
      }
    },
  },
];

export const songs: Song[] = rawSongs.map(({ title, description, draw }) => ({
  title,
  description,
  image: `music/${title}/img.jpeg`,
  track: `music/${title}/song.mp3`,
  draw,
}));
