import { songs } from "../data/songs";

class MediaPlayer {
  private currentSongIndex: number;
  private audio: HTMLAudioElement;
  private container: HTMLDivElement;
  private mainContainer: HTMLDivElement;
  private image: HTMLImageElement;
  private title: HTMLHeadingElement;
  private description: HTMLParagraphElement;

  constructor() {
    this.audio = new Audio();
    this.currentSongIndex = 0;
    const currentSong = songs[this.currentSongIndex];

    // Creation of Main Container
    this.mainContainer = document.createElement("div");
    Object.assign(this.mainContainer.style, {
      gridRow: "1 / 2",
      gridColumn: "2 / 3",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      padding: "0 1.5rem",
    });

    this.title = document.createElement("h1");
    this.title.innerText = currentSong.title;
    Object.assign(this.title.style, {
      height: "2rem",
    });

    this.image = document.createElement("img");
    this.image.src = currentSong.image;
    Object.assign(this.image.style, {
      display: "block",
      height: "100%",
      width: "100%",
      objectFit: "cover",
    });

    this.description = document.createElement("p");
    this.description.innerText = currentSong.description;
    Object.assign(this.description.style, {
      height: "2rem",
    });

    this.mainContainer.append(this.title, this.image, this.description);

    // Creation of Aside with music
    const aside = document.createElement("aside");
    Object.assign(aside.style, {
      gridRow: "1 / 2",
      gridColumn: "3 / 4",
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      padding: ".5rem .3rem",
      gap: ".3rem",
      borderLeft: "#5B5B65 .2rem solid",
      overflowY: "scroll",
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

    // Creation of footer
    const footer = document.createElement("footer");
    Object.assign(footer.style, {
      gridRow: "2 / 3",
      gridColumn: "2 / 6",
      padding: "1rem",
      background: "#A2A2A9",
      display: "flex",
      gap: ".3rem",
      borderRadius: "1rem 1rem 1rem 40%",
    });

    this.container = document.createElement("div");

    Object.assign(this.container.style, {
      display: "grid",
      gridTemplateColumns: "5rem 3fr 1fr",
      gridTemplateRows: "4fr 1fr",
      background: "#A2A2A9",
      padding: "1rem 1rem 1rem 1rem",
      border: "#31313E .2rem solid",
      borderRadius: "1rem 1rem 20% 40%",
    });

    this.container.append(this.mainContainer, aside, footer);
  }

  private getRandomSongIndex(): number {
    return Math.floor(Math.random() * songs.length);
  }

  public playRandom() {
    this.currentSongIndex = this.getRandomSongIndex();
    this.audio.src = `public/music/${songs[this.currentSongIndex]}.mp3`;
    this.audio.play();
  }

  public pause() {
    this.audio.pause();
  }

  private convertSecondsToMinutesAndSeconds(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  public next() {
    this.currentSongIndex =
      this.currentSongIndex === songs.length - 1
        ? 0
        : this.currentSongIndex + 1;
    this.audio.src = `public/music/${songs[this.currentSongIndex]}.mp3`;
    this.audio.play();
  }
  public prev() {
    this.currentSongIndex =
      this.currentSongIndex === 0
        ? songs.length - 1
        : this.currentSongIndex - 1;
    this.audio.src = `public/music/${songs[this.currentSongIndex]}.mp3`;
    this.audio.play();
  }

  public load() {
    return this.container;
  }
}

export const loadMusic = () => {
  const main = document.querySelector("main") as HTMLElement;
  Object.assign(main.style, {
    backgroundImage: "url('../public/images/music.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "2rem 1.5rem",
    // overflow: "hidden",
  });
  const mediaPlayer = new MediaPlayer();

  const buttonPlayRandom = document.createElement("button");
  buttonPlayRandom.innerText = "play random song";
  buttonPlayRandom.addEventListener("click", (e) => {
    e.preventDefault();
    mediaPlayer.playRandom();
  });

  const buttonPause = document.createElement("button");
  buttonPause.innerText = "pause song";
  buttonPause.addEventListener("click", (e) => {
    e.preventDefault();
    mediaPlayer.pause();
  });

  const container = document.createElement("div");
  container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

  container.appendChild(mediaPlayer.load());
  main.appendChild(container);
};
