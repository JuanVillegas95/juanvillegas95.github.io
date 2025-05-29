import "./style.css";
import { loadEntries } from "./views/entries";
import { loadHome } from "./views/home";
import { loadMusic } from "./views/music";

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
  const loadAside = () => {
    const aside = document.querySelector("aside") as HTMLElement;
    aside.style.overflow = "hidden";
    const ul = document.createElement("ul");
    ul.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    ul.style.height = "100%";
    ul.style.padding = "1rem";
    ul.style.margin = "0";
    ul.style.textAlign = "center";
    ul.style.listStyle = "none";

    Object.keys(loaders).forEach((value: string) => {
      const li = document.createElement("li");
      li.innerText = value;
      li.style.color = "white";
      li.style.paddingLeft = "0";
      li.style.margin = "2rem auto";
      li.addEventListener("mouseenter", () => {
        li.style.fontSize = "1.2rem";
        li.style.cursor = "pointer";
      });
      li.addEventListener("mouseleave", () => {
        li.style.fontSize = "1rem";
        li.style.cursor = "default";
      });
      li.addEventListener("click", () => {
        main.innerHTML = "";
        const loader = loaders[value as keyof typeof loaders];
        loader();
      });
      ul.append(li);
    });
    aside.append(ul);
  };
  loadMusic();
  loadAside();
};
