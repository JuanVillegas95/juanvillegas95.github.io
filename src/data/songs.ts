export interface Song {
  title: string;
  description: string;
  image: string;
  track: string;
}

const basePath = "public/music";

const rawSongs = [
  { title: "lilium", description: "i really like" },
  { title: "clair-obscure", description: "i really like" },
  { title: "hikari 光", description: "i really like" },
];

export const songs: Song[] = rawSongs.map(({ title, description }) => ({
  title,
  description,
  image: `${basePath}/${title}/img.jpeg`,
  track: `${basePath}/${title}/song.mp3`,
}));
