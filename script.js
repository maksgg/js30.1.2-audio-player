const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.querySelector('.play');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.querySelector('.down-time');
const durationDisplay = document.querySelector('.up-time');
const coverImage = document.querySelector('.img-child');
const coverImageMain = document.getElementById('coverMain');

const tracks = [
  {
    src: './audio/beyonce.mp3',
    name: "Don't Hurt Yourself",
    author: 'Beyonce',
    cover: './img/lemonade.png',
    duration: '3:47'
  },
  {
    src: './audio/dontstartnow.mp3',
    name: 'Don`t start now',
    author: 'Dua Lipa',
    cover: './img/dontstartnow.png',
    duration: '3:23'
  },
];

let currentTrackIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  audioPlayer.src = track.src;
  document.querySelector('.name-song').textContent = track.name;
  document.querySelector('.author').textContent = track.author;
  coverImage.src = track.cover;
  coverImageMain.src = track.cover;
  durationDisplay.textContent = track.duration;
  progressBar.value = 0;
  currentTimeDisplay.textContent = '00:00';
}

function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.src = './svg/pause.png';
  } else {
    audioPlayer.pause();
    playPauseBtn.src = './svg/play.png';
  }
}

playPauseBtn.addEventListener('click', playPause);

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playPause();
});

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playPause();
});

audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  progressBar.max = duration;
  progressBar.value = currentTime;
  currentTimeDisplay.textContent = formatTime(currentTime);
});

progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

loadTrack(currentTrackIndex);