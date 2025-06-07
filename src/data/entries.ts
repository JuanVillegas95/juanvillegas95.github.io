export interface Entry {
  title: string;
  date: string;
  description: string;
  images: string[];
}

export const entriesDataEnglish: Entry[] = [
  {
    title: "hi welcome to my blog",
    date: "mon 26 may 2025 16:26",
    description:
      "hello, welcome to my blog, a place where I upload daily entries of my daily life",
    images: ["/images/25-05-2025/0.jpeg", "/images/25-05-2025/1.jpeg"],
  },
  {
    title: "i feel it in my nugget",
    date: "mon 27 may 2025 08:07",
    description:
      "this one is just for the sake of adding one mor eentry and seeing the beavior",
    images: [],
  },
];

export const entriesDataSpanish: Entry[] = [
  {
    title: "Hola, bienvenido a mi blog",
    date: "lun 26 mayo 2025 16:26",
    description:
      "Hola, bienvenido a mi blog, un lugar donde subo entradas diarias sobre mi vida cotidiana",
    images: ["/images/25-05-2025/0.jpeg", "/images/25-05-2025/1.jpeg"],
  },
  {
    title: "Lo siento en mis huesos",
    date: "lun 27 mayo 2025 08:07",
    description:
      "Esta entrada es solo para agregar una entrada más y ver el comportamiento",
    images: [],
  },
];

// Japanese Version
export const entriesDataJapanese: Entry[] = [
  {
    title: "こんにちは、私のブログへようこそ",
    date: "2025年5月26日(月) 16:26",
    description:
      "こんにちは、私のブログへようこそ。ここでは私の日常生活について日記を投稿しています",
    images: ["/images/25-05-2025/0.jpeg", "/images/25-05-2025/1.jpeg"],
  },
  {
    title: "骨の髄まで感じる",
    date: "2025年5月27日(月) 08:07",
    description: "これはエントリーを追加して動作を確認するためのテスト投稿です",
    images: [],
  },
];
