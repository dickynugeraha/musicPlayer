// Initialization variable selector
const trackArtist = document.querySelector("#trackName");
const trackArt = document.querySelector(".track-img");
const trackName = document.querySelector("#trackArtist");

const btnPrev = document.querySelector(".prev-track");
const btnPlaypause = document.querySelector(".playpauseTrack");
const btnNext = document.querySelector(".next-track");

const currTime = document.querySelector(".current-time");
const seekSlider = document.querySelector(".seek-slider");
const totalTime = document.querySelector(".total-duration");

// variable control
let trackIndex = 0;
let isPlay = false;
let updateTimer;

// Set img awal
let currTrack = document.createElement("audio");
let imgTag = document.createElement("img");

let trackList = [
  {
    name: "Somebody That I Used To Know",
    artist: "Gotye",
    image: "images/somebodythatiusedtoknow.jpg",
    path: "audio/somebodythatiusedtoknow.mp3",
  },
  {
    name: "Girls Like You",
    artist: "Maroon 5",
    image: "images/girlslikeyou.jpg",
    path: "audio/girlslikeyou.mp3",
  },
  {
    name: "Fix You",
    artist: "Coldplay",
    image: "images/fixyou.jpg",
    path: "audio/fixyou.mp3",
  },
  {
    name: "Beggin",
    artist: "Maneskin",
    image: "images/begginyou.jpg",
    path: "audio/begginyou.mp3",
  },
  {
    name: "Let Me Love You",
    artist: "Justin Bieber",
    image: "images/letmeloveyou.jpg",
    path: "audio/letmeloveyou.mp3",
  },
];

imgTag.setAttribute("src", `${trackList[trackIndex].image}`);
trackArt.appendChild(imgTag);

let combineColor = [
  {
    color: "#eecda3",
    color2: "#f5cc7f",
  },
  {
    color: "#4ca1af ",
    color2: "#c4e0e5",
  },
  {
    color: "#ee9ca7",
    color2: "#ffdde1",
  },
  {
    color: "#bdc3c7",
    color2: "#2c3e50",
  },
  {
    color: "#eacda3",
    color2: "#d6ae7b",
  },
];

function loadTrack(trackIndex) {
  // membersihkan track sebelumnya
  resetValues();
  clearInterval(updateTimer);
  // Muat track baru kedalam tag audio
  currTrack.src = trackList[trackIndex].path;
  currTrack.load();

  trackArtist.innerText = `${trackList[trackIndex].artist}`;
  trackName.innerText = `${trackList[trackIndex].name}`;

  // ganti gambar
  let newImg = document.createElement("img");
  newImg.setAttribute("src", `${trackList[trackIndex].image}`);

  trackArt.replaceChild(newImg, trackArt.lastChild);

  // menjalankan fungsionalitas dari input range
  updateTimer = setInterval(seekUpdate, 1000);

  // pindahkan track ketika musik sudah selesai
  currTrack.addEventListener("ended", nextTrack);

  // apply random backround color
  randomColor(trackIndex);
}

function randomColor(trackIndex) {
  document.body.style.background =
    `linear-gradient(to right,` +
    combineColor[trackIndex].color +
    "," +
    combineColor[trackIndex].color2 +
    `)`;
}

function resetValues() {
  currTime.innerHTML = "00:00";
  totalTime.innerHTML = "00:00";
  seekSlider.value = "0";
}

function playpauseTrack() {
  !isPlay ? playTrack() : pauseTrack();
}

function playTrack() {
  currTrack.play();
  isPlay = true;
  btnPlaypause.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack() {
  currTrack.pause();
  isPlay = false;
  btnPlaypause.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

function nextTrack() {
  trackIndex < trackList.length - 1 ? (trackIndex += 1) : (trackIndex = 0);
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  trackIndex > 0 ? (trackIndex -= 1) : (trackIndex = trackList.length - 1);
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  let seekto = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currTime.innerText = currentMinutes + ":" + currentSeconds;
    totalTime.innerText = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(trackIndex);
