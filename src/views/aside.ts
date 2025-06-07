import { type lang } from "../script";
import { data } from "../data/data";
let currentLoader = "home";
export const loadAside = (
  lang: lang,
  renderLoader: (loaderName: string, lang: lang) => void
) => {
  const main = document.querySelector("main") as HTMLElement;

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
    borderBottom: "white 0.2rem solid",
  });

  for (const lang of Object.keys(data)) {
    const languageLi = document.createElement("li");
    languageLi.addEventListener("mouseenter", () => {
      languageLi.style.textDecoration = "underline";
      languageLi.style.cursor = "pointer";
    });
    languageLi.addEventListener("mouseleave", () => {
      languageLi.style.textDecoration = "none";
      languageLi.style.cursor = "default";
    });
    languageLi.addEventListener("click", () => {
      main.innerHTML = "";
      renderAside(lang as lang);
      renderLoader(currentLoader, lang as lang);
    });
    languageLi.innerText = lang;
    languageUl.appendChild(languageLi);
  }

  languagesContainer.appendChild(languageUl);

  const ul = document.createElement("ul");
  function renderAside(currlang: lang) {
    ul.innerHTML = "";
    ul.style.height = "80%";
    ul.style.padding = "1rem";
    ul.style.margin = "0";
    ul.style.textAlign = "center";
    ul.style.listStyle = "none";

    data[currlang].aside.forEach((value: string, index: number) => {
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
        currentLoader = data["en"].aside[index];
        renderLoader(currentLoader, currlang);
      });
      ul.append(li);
    });
    contianer.appendChild(ul);
  }

  contianer.appendChild(languagesContainer);
  renderAside(lang);
  aside.append(contianer);
};
