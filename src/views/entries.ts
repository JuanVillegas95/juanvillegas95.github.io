import { entries } from "../data/entries";

let currentEntryIndex: number | null = null;

export const loadEntries = () => {
  const main = document.querySelector("main") as HTMLElement;
  Object.assign(main.style, {
    backgroundImage: "url('../public/images/entries.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });
  for (let i = entries.length - 1; i >= 0; i--) {
    const { title, date, description, images } = entries[i];

    const entry = document.createElement("article");
    entry.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    entry.style.margin = "1rem 2rem";
    entry.style.padding = ".5rem 1rem";

    const entryHeader = document.createElement("header");
    entryHeader.style.display = "flex";
    entryHeader.style.alignItems = "center";
    entryHeader.style.justifyContent = "space-between";

    const h2 = document.createElement("h2");
    h2.innerText = title;
    h2.style.margin = "0";
    h2.style.padding = "0";

    const dateEl = document.createElement("small");
    dateEl.innerText = date;

    const p = document.createElement("p");
    p.innerText = description;

    const imagesContainer = document.createElement("div");
    for (const url of images) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = title;
      img.style.width = "10rem";
      img.style.height = "auto";
      img.style.objectFit = "cover";
      img.style.marginRight = "0.5rem";
      imagesContainer.appendChild(img);
    }

    const arrow = document.createElement("p");
    arrow.innerHTML = "&rarr;";
    arrow.style.margin = "0";
    arrow.style.padding = "0";
    arrow.style.fontSize = "2rem";
    arrow.addEventListener("mouseenter", () => {
      arrow.style.cursor = "pointer";
    });
    arrow.addEventListener("mouseleave", () => {
      arrow.style.cursor = "deafault";
    });
    arrow.onclick = () => {
      const isExpanded = currentEntryIndex === i;
      arrow.innerHTML = isExpanded ? "&rarr;" : "&darr;";

      [dateEl, p, imagesContainer].forEach((el) =>
        isExpanded ? entry.removeChild(el) : entry.appendChild(el)
      );
      currentEntryIndex = isExpanded ? null : i;
    };

    entryHeader.append(h2, arrow);
    entry.append(entryHeader);
    main.appendChild(entry);
  }
};
