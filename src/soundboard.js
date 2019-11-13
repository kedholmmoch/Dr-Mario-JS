export default class Soundboard {
  constructor() {
    this.src = './assets/sounds/Dr_Mario_Theme.mp3';
    this.isMuted = false;
    this.muteButton = document.getElementById('mute-music');

    this.gameOptions = document.getElementById('game-options');
    this.startButton = document.getElementById('start-button');

    this.lostButton = document.getElementById('lost-game');
    this.wonButton = document.getElementById('won-game');

    muteButton.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      this.muteButton.classList.toggle('sound-off');
    });

    // start music and associated event listeners
    playMusic(this.src);

    

    lostButton.addEventListener('click', () => {
      playMusic('./assets/sounds/Dr_Mario_Theme.mp3');
    });
    wonButton.addEventListener('click', () => {
      playMusic('./assets/sounds/Dr_Mario_Theme.mp3');
    });


  }

  playMusic (url) {
    let audio = document.createElement('audio');

    if (musicIsMuted) {
      audio.muted = true;
    }

    audio.src = url;
    audio.style.display = "none";
    audio.onended = function () {
      audio.remove();
    };
    document.body.appendChild(audio);

    const play = function () {
      audio.play();
    }
    document.addEventListener('click', play);

    let muteButton = document.getElementById('mute-music');
    muteButton.addEventListener('click', () => {
      audio.muted = !audio.muted;
      // console.log('paused?');
    });

    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
      document.removeEventListener('click', play);
      audio.remove();
    });
  }
}