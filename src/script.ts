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
    const contianer = document.createElement("div");
    Object.assign(contianer.style, {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      height: "100%",
    });

    const languagesContainer = document.createElement("div");

    const languageUl = document.createElement("ul");
    Object.assign(languageUl.style, {
      display: "flex",
      listStyle: "none",
      margin: "0",
      padding: "1rem",
      justifyContent: "space-around",
      borderBottom: "white 0.3rem solid",
    });
    for (const lang of ["es", "en", "ja"]) {
      const languageLi = document.createElement("li");
      languageLi.addEventListener("mouseenter", () => {
        languageLi.style.textDecoration = "underline";
        languageLi.style.cursor = "pointer";
      });
      languageLi.addEventListener("mouseleave", () => {
        languageLi.style.textDecoration = "none";
        languageLi.style.cursor = "default";
      });
      languageLi.innerText = lang;
      languageUl.appendChild(languageLi);
    }

    languagesContainer.appendChild(languageUl);

    contianer.appendChild(languagesContainer);

    // aside.style.overflow = "hidden";

    aside.append(contianer);

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
  };
  loadMusic();
  loadAside();
};
