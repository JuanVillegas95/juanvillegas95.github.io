import { projects } from "../data/projects";

export const loadHome = () => {
  const main = document.querySelector("main") as HTMLElement;
  Object.assign(main.style, {
    backgroundImage: "url('/images/home.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });

  const contianer = document.createElement("div");
  Object.assign(contianer.style, {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    margin: "1rem 2rem",
    padding: ".5rem 1rem",
  });

  const h1 = document.createElement("h1");
  h1.innerText = "welcome";

  const p = document.createElement("p");
  p.innerHTML =
    "hi, this is my personal site on the web. i'll mainly use it because i have full freedom over what i post here. i'm someone who starts a lot of projects but rarely finishes them. maybe having a site to track and share them will help—sounds cool, ig. also this whole website is done with ts, html and css in order to keep it simple";

  const projectsContianer = document.createElement("div");
  Object.assign(projectsContianer.style, {
    border: "solid white .1rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    padding: ".5rem 1rem",
  });
  projects.forEach(({ title }) => {
    const projectItem = document.createElement("div");
    Object.assign(projectItem.style, {
      border: "solid white .1rem",
      height: "1.5rem",
    });
    projectItem.addEventListener("mouseenter", () => {
      Object.assign(projectItem.style, {
        cursor: "pointer",
        transform: "scale(1.1)",
      });
    });
    projectItem.addEventListener("mouseleave", () => {
      Object.assign(projectItem.style, {
        cursor: "default",
        transform: "scale(1)",
      });
    });

    const projectTitle = document.createElement("p");
    projectTitle.innerText = title;
    projectTitle.style.margin = "0";
    projectItem.appendChild(projectTitle);
    projectsContianer.appendChild(projectItem);
  });

  contianer.append(h1, p, projectsContianer);
  main.appendChild(contianer);
};
