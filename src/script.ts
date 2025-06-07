import "./style.css";
import { loadAside } from "./views/aside";
import { loadEntries } from "./views/entries";
import { loadHome } from "./views/home";
import { loadMusic } from "./views/music";

export type lang = "es" | "en" | "ja";

const INTIAL_LANG: lang = "en";
const loaders = {
  home: loadHome,
  entries: loadEntries,
  music: loadMusic,
  philosophy: () => console.log("Loading philosophy..."),
  astronomy: () => console.log("Loading astronomy..."),
  math: () => console.log("Loading math..."),
};

window.onload = () => {
  const main = document.querySelector("main") as HTMLElement;

  loadAside(INTIAL_LANG, (lodaerName, lang) => {
    const loader = loaders[lodaerName as keyof typeof loaders];
    main.innerHTML = "";
    loader(lang);
  });
  loadMusic(INTIAL_LANG);
};
