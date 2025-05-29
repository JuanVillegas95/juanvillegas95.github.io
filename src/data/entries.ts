export interface Entry {
  title: string;
  date: string;
  description: string;
  images: string[];
}

export const entries: Entry[] = [
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
