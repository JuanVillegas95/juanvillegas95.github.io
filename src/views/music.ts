import { songs } from "../data/songs";

const stopAnimation = (animationId: number | null) => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

const LINEAR_GRADIENT = `linear-gradient(to bottom, 
  #f0f0f0 0%, 
  #dcdcdc 20%, 
  #ffffff 50%, 
  #dcdcdc 80%, 
  #b0b0b0 100%)`;

const BASE_STYLE_BTN = {
  padding: ".5rem",
  borderRadius: "50%",
  border: "#5B5B65 1px solid",
  background: LINEAR_GRADIENT,
  cursor: "pointer",
  transition: "all 0.1s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const BASE_MOUSE_ENTER_STYLE_BTN = {
  transform: "scale(1.05)",
  backgroundColor: "#f0f0f0",
  borderColor: "#333",
};

const BASE_MOUSE_LEAVE_STYLE_BTN = {
  transform: "scale(1)",
  backgroundColor: LINEAR_GRADIENT,
  borderColor: "#5B5B65",
};

class MediaPlayer {
  private currentSongIndex: number;
  private audio: HTMLAudioElement;
  private container: HTMLDivElement;
  private image: HTMLImageElement;
  private title: HTMLHeadingElement;
  private description: HTMLParagraphElement;

  constructor() {
    this.currentSongIndex = 1;

    const mainContainer = document.createElement("div");
    Object.assign(mainContainer.style, {
      gridRow: "1 / 2",
      gridColumn: "1 / 2",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      padding: "0 1.5rem",
      borderRadius: ".5rem .5rem 0 0",
    });

    this.title = document.createElement("h1");
    this.title.innerText = songs[this.currentSongIndex].title;
    this.title.style.height = "2rem";

    this.image = document.createElement("img");
    this.image.src = songs[this.currentSongIndex].image;
    Object.assign(this.image.style, {
      width: "80%", // Start at 80% when menu is open
      transition: "width 1 ease", // Reduced from 12s to 0.5s for better UX
      height: "auto",
      maxWidth: "20rem",
      objectFit: "cover",
    });

    this.description = document.createElement("p");
    this.description.innerText = songs[this.currentSongIndex].description;
    this.description.style.height = "2rem";

    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "1",
    });

    this.audio = new Audio();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(this.audio);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(dataArray);
      songs[this.currentSongIndex].draw(
        ctx,
        dataArray,
        canvas,
        canvas.width / bufferLength
      );
      requestAnimationFrame(animate);
    };

    const triangle = document.createElement("div");
    Object.assign(triangle.style, {
      width: "0",
      height: "0",
      borderTop: ".5rem solid transparent",
      borderBottom: ".5rem solid transparent",
      borderLeft: "1rem solid black",
      transition: "transform 0.2s ease",
    });

    const playButton = document.createElement("button");
    Object.assign(playButton.style, BASE_STYLE_BTN);
    playButton.append(triangle);

    playButton.addEventListener("mouseenter", () => {
      Object.assign(playButton.style, BASE_MOUSE_ENTER_STYLE_BTN);
      triangle.style.borderLeftColor = "grey";
    });

    playButton.addEventListener("mouseleave", () => {
      Object.assign(playButton.style, BASE_MOUSE_LEAVE_STYLE_BTN);
      triangle.style.borderLeftColor = "black";
    });

    playButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      this.audio.src = songs[this.currentSongIndex].track;
      this.audio.play();
      animate();
    });

    const nextButton = document.createElement("button");
    nextButton.innerText = "next";
    Object.assign(nextButton.style, BASE_STYLE_BTN);

    const prevButton = document.createElement("button");
    prevButton.innerText = "prev";
    Object.assign(prevButton.style, BASE_STYLE_BTN);

    const randButton = document.createElement("button");
    randButton.innerText = "rand";
    Object.assign(randButton.style, BASE_STYLE_BTN);

    const louderButton = document.createElement("button");
    louderButton.innerText = "louder";
    Object.assign(louderButton.style, BASE_STYLE_BTN);

    const quieterButton = document.createElement("button");
    quieterButton.innerText = "quieter";
    Object.assign(quieterButton.style, BASE_STYLE_BTN);

    const menuButton = document.createElement("button");
    menuButton.innerText = "menu";
    Object.assign(menuButton.style, BASE_STYLE_BTN);

    nextButton.addEventListener("click", () => {
      this.changeTrack("next");
      this.image.src = songs[this.currentSongIndex].image;
      this.title.innerText = songs[this.currentSongIndex].title;
      this.description.innerText = songs[this.currentSongIndex].description;
    });

    new ResizeObserver(() => {
      canvas.width = this.image.clientWidth;
      canvas.height = this.image.clientHeight;
    }).observe(this.image);

    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, {
      position: "relative",
      width: "100%",
      height: "auto",
      transition: "all 1s ease-in-out", // Add this
    });
    wrapper.append(this.image, canvas);
    mainContainer.append(this.title, wrapper, this.description);

    const aside = document.createElement("aside");
    Object.assign(aside.style, {
      gridRow: "1 / 2",
      gridColumn: "2 / 3",
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      padding: ".5rem .3rem",
      gap: ".3rem",
      borderLeft: "#5B5B65 .2rem solid",
      overflowY: "scroll",
      transition: "max-width 1s ease-in-out, border-left 0.5s linear",
      maxWidth: "15rem",
    });

    for (let i = 0; i < songs.length; i++) {
      const name = document.createElement("p");
      name.innerText = songs[i].title;
      name.style.margin = "0";

      const audio = new Audio();
      audio.src = songs[i].track;

      const duration = document.createElement("p");
      duration.style.margin = "0";

      audio.addEventListener("loadedmetadata", () => {
        duration.innerText = this.convertSecondsToMinutesAndSeconds(
          audio.duration
        );
      });

      const track = document.createElement("div");
      Object.assign(track.style, {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#D9D0C8",
        color: "black",
        padding: ".1rem .3rem",
        fontSize: ".8rem",
      });

      track.append(name, duration);
      aside.appendChild(track);
    }

    const footer = document.createElement("footer");
    Object.assign(footer.style, {
      gridRow: "2 / 3",
      gridColumn: "1 / 3",
      background: LINEAR_GRADIENT,
      gap: ".3rem",
      borderRadius: "0 0 .5rem .5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: ".5rem",
    });

    footer.append(
      playButton,
      // randButton,
      // prevButton,
      // nextButton,
      // quieterButton,
      louderButton,
      menuButton
    );

    this.container = document.createElement("div");
    this.container.classList.add("media-player-container");

    Object.assign(this.container.style, {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gridTemplateRows: "1fr 3rem",
      border: "#31313E .2rem solid",
      borderRadius: ".5rem",
      position: "absolute",
      top: "4rem",
      zIndex: "2",
      width: "90vw",
      maxWidth: "30rem",
      height: "25rem",
    });

    menuButton.addEventListener("click", () => {
      if (aside.style.maxWidth === "15rem") {
        // Collapsing menu
        Object.assign(aside.style, {
          maxWidth: "0",
          padding: "0",
          borderLeft: "none",
          overflow: "hidden",
        });
        mainContainer.style.gridColumn = "1 / 3";

        // Small delay to allow grid to update
        requestAnimationFrame(() => {
          this.image.style.width = "100%";
        });
      } else {
        // Expanding menu
        Object.assign(aside.style, {
          maxWidth: "15rem",
          padding: ".5rem .3rem",
          borderLeft: "#5B5B65 .2rem solid",
          overflowY: "scroll",
        });
        mainContainer.style.gridColumn = "1 / 2";
        this.image.style.width = "80%";
      }
    });

    this.container.append(mainContainer, footer, aside);
  }

  private convertSecondsToMinutesAndSeconds(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  private changeTrack(type: "next" | "prev" | "rnd") {
    switch (type) {
      case "next":
        this.currentSongIndex = (this.currentSongIndex + 1) % songs.length;
        break;
      case "prev":
        this.currentSongIndex =
          this.currentSongIndex === 0
            ? songs.length - 1
            : this.currentSongIndex - 1;
        break;
      case "rnd":
        this.currentSongIndex = Math.floor(Math.random() * songs.length);
        break;
    }
  }

  public load() {
    return this.container;
  }
}

export const loadMusic = () => {
  const main = document.querySelector("main");
  if (!main) return;

  Object.assign(main.style, {
    backgroundImage: `url('/images/music.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const mediaPlayer = new MediaPlayer();

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    width: "40rem",
    height: "40rem",
  });

  const background = document.createElement("div");
  Object.assign(background.style, {
    position: "absolute",
    zIndex: "1",
    width: "30rem",
    top: "4rem",
    left: "5rem",
    height: "25rem",
    background: "black",
  });

  const monitorImg = document.createElement("img");
  monitorImg.src = "/images/monitor.png";
  Object.assign(monitorImg.style, {
    width: "40rem",
    height: "40rem",
  });

  container.append(mediaPlayer.load(), monitorImg, background);
  main.appendChild(container);
};
