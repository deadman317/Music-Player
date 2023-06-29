const playBtn = document.querySelector('#mainPlayBtn');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const btnRepeat = document.querySelector('#btnRepeat');
const btnFav = document.querySelector('#btnFav');
const trackTitel = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover');
const slider = document.querySelector('.slider');
const vslider = document.querySelector('.vslider');
const progress = document.querySelector('#progress');
const vprogress = document.querySelector('#vprogress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeSlider = document.querySelector('.volume-slider .vslider');
const volumeIcon = document.querySelector('.volume-icon');

//global variables
//is the song playing
let isPlaying = false;
//is the volume muted
let isMuted = false;
//current song index
let trackId = 0;
//previous volume
let prevVolume
//is loop on
let isLoop = false;

//songs array
const songs = [
    "on and on",
    "superhero",
    "heroes tonight"
];

//artists array
const artists = [
    "Cartoon",
    "Unknown Brain",
    "Janji"
];

//covers array
const covers = [
    "cover1",
    "cover2",
    "cover3"
];

//like array
let like = [
    false,
    false,
    false
];

playBtn.addEventListener('click', playTrack);

btnRepeat.addEventListener('click', () => {
    if (!isLoop) {
        isLoop = true;
        btnRepeat.innerHTML = '<span class="material-icons">repeat_one</span>';
    } else {
        isLoop = false;
        btnRepeat.innerHTML = '<span class="material-icons">repeat</span>';
    }
});

btnFav.addEventListener('click', () => {
    if (!like[trackId]) {
        like[trackId] = true;
        btnFav.innerHTML = '<span class="material-icons">favorite</span>';
    } else {
        like[trackId] = false;
        btnFav.innerHTML = '<span class="material-icons">favorite_border</span>';
    }
});

function playTrack() {
    console.log('playTrack');
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        playBtn.innerHTML = '<span class="material-icons">pause</span>';
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
    }
}

function switchTrack() {
    if (isPlaying) {
        audio.play();
    }
}

function loadTrack() {
    audio.src = `./music/music-${trackId + 1}.mp3`;
    audio.load();
    trackTitel.innerHTML = songs[trackId];
    artistName.innerHTML = artists[trackId];
    btnFav.innerHTML = `<span class="material-icons">${like[trackId] ? 'favorite' : 'favorite_border'}</span>`
    cover.src = `./image/image-${trackId + 1}.jpg`;
    audio.addEventListener('loadeddata', () => {
        setTime(fullTime, audio.duration);
        slider.setAttribute('max', audio.duration);
    });
}

loadTrack();

btnPrev.addEventListener('click', prevTrack);

function prevTrack() {
    console.log('prevTrack');
    trackId--;
    if (trackId < 0) {
        trackId = songs.length - 1;
    }
    loadTrack();
    switchTrack();
}

btnNext.addEventListener('click', nextTrack);

function nextTrack() {
    console.log('nextTrack');
    trackId++;
    if (trackId > songs.length - 1) {
        trackId = 0;
    }
    loadTrack();
    switchTrack();
}

function next() {
    if (isLoop) {
        loadTrack();
        switchTrack();
    } else {
        nextTrack();
    }
}

audio.addEventListener('ended', next);

function setTime(element, time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (min < 10) {
        min = `0${min}`;
    }
    if (sec < 10) {
        sec = `0${sec}`;
    }
    element.innerHTML = `${min}:${sec}`;
}


audio.addEventListener('timeupdate', () => {
    setTime(time, audio.currentTime);
    slider.value = audio.currentTime;
    const progressWidth = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressWidth}%`;
});

function customSlider() {
    audio.currentTime = slider.value;
    progress.style.width = `${(slider.value / audio.duration) * 100}%`;
}

slider.addEventListener('input', customSlider);

function customVolume() {
    audio.volume = volumeSlider.value / 100;
    const volumeWidth = volumeSlider.value;
    vprogress.style.width = `${volumeWidth}%`;
    if (volumeSlider.value == 0) {
        volumeIcon.innerHTML = '<span class="material-icons">volume_off</span>';
    }
    else if (volumeSlider.value > 0 && volumeSlider.value <= 50) {
        volumeIcon.innerHTML = '<span class="material-icons">volume_down</span>';
    }
    else if (volumeSlider.value > 50) {
        volumeIcon.innerHTML = '<span class="material-icons">volume_up</span>';
    }

}

customVolume();
volumeSlider.addEventListener('input', customVolume);

volumeIcon.addEventListener('click', () => {
    if (!isMuted) {
        prevVolume = volumeSlider.value;
        audio.volume = 0;
        volumeSlider.value = 0;
        vprogress.style.width = '0%';
        volumeIcon.innerHTML = '<span class="material-icons">volume_off</span>';
        isMuted = true;
    } else {
        volumeSlider.value = prevVolume;
        customVolume();
        isMuted = false;
    }
});
