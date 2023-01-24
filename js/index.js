const audio = new Audio();
const tracksCard = document.getElementsByClassName('track');
const player = document.querySelector('.player')
const pauseBtn = document.querySelector('.player__controller_pause');
const stopBtn = document.querySelector('.player__controller_stop');


const playMusic = (e) => {
  const trackActive = e.currentTarget;
  audio.src = trackActive.dataset.track;
  audio.play();
  pauseBtn.classList.remove('player__icon_play');
  player.classList.add('player_active');
  player.style.bottom = '100px';

  for(let i = 0; i < tracksCard.length; i++){
    tracksCard[i].classList.remove('track_active');
  };

  trackActive.classList.add('track_active');
};

for(let i = 0; i < tracksCard.length; i++){
  tracksCard[i].addEventListener('click', playMusic);
};

pauseBtn.addEventListener('click', ()=> {
  if(audio.paused){
    audio.play();
    pauseBtn.classList.remove('player__icon_play')
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play')
  }
});

stopBtn.addEventListener('click', ()=> {
  // 1. hide player
  // 2. delite from src track
  audio.src = '';
  player.style.bottom = `-100px`;

  for(let i = 0; i < tracksCard.length; i++){
    tracksCard[i].classList.remove('track_active');
  };

});

const audio = new Audio();
const tracksCard = document.getElementsByClassName('track');
const catalogContainer = document.querySelector('.catalog__container');
const player = document.querySelector('.player')
const pauseBtn = document.querySelector('.player__controller_pause');
const stopBtn = document.querySelector('.player__controller_stop');
const prevBtn = document.querySelector('.player__controller_prev');
const nextBtn = document.querySelector('.player__controller_next');
const likeBtn = document.querySelector('.player__controller_like');
const muteBtn = document.querySelector('.player__controller_mute');


const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add');
catalogAddBtn.innerHTML = `
  <span>Show All</span>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
  </svg>
`;


const pausePlayer = () => {
  const trackActive = document.querySelector('.track_active');

  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    trackActive.classList.remove('track_pause');
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play');
    trackActive.classList.add('track_pause')
  }
};

const playMusic = (e) => {
  e.preventDefault();
  const trackActive = e.currentTarget;

  if(trackActive.classList.contains('track_active')){
    pausePlayer();
  }

  let i = 0;
  const id = trackActive.dataset.idTrack;
  const track = dataMusic.find((item, index) => {
    i = index;
    return id === item.id
  });

  audio.src = track.mp3;
  audio.play();
  pauseBtn.classList.remove('player__icon_play');
  player.classList.add('player_active');

  const prevTrack = i === 0 ? dataMusic.length - 1 : i - 1;
  const nextTrack = i + 1 === dataMusic.length ? 0 : i + 1;

  prevBtn.dataset.idTrack = dataMusic[prevTrack].id;
  nextBtn.dataset.idTrack = dataMusic[nextTrack].id
;
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].classList.remove('track_active');
  };

  trackActive.classList.add('track_active');
};


const addHandlerTrack = () => {

  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
  };

}



pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {

  audio.src = '';
  player.classList.remove('player_active');

});

/******    ******/

const createCard = (data) => {
  const card = document.createElement('a');
  card.href = '#';
  card.classList.add('catalog__item', 'track');
  card.dataset.idTrack = data.id;

  card.innerHTML = `
    <div class="track__img-wrap">
      <img class="track__poster" src="${data.poster}" alt="${data.track} ${data.artist}">
    </div>
    <div class="track__info track-info">
      <p class="track-info__title">${data.track}</p>
      <p class="track-info__artist">${data.artist}</p>
    </div>
  `
  return card
};

const renderCatalog = (dataList) => {

  catalogContainer.textContent = '';
  const listCards = dataList.map(createCard);
  catalogContainer.append(...listCards);
  addHandlerTrack();
};

const checkCount = (i=1) => {
  tracksCard[0];
  if(catalogContainer.clientHeight > tracksCard[0].clientHeight * 3){
    tracksCard[tracksCard.length - i].style.display = 'none';
    checkCount(i + 1)
  } else if (i !== 1){
    catalogContainer.append(catalogAddBtn);
  }
};

const init = () => {

  renderCatalog(dataMusic);
  checkCount();

  catalogAddBtn.addEventListener('click', ()=> {
    [...tracksCard].forEach((trackCard) => {
      trackCard.style.display = '';
      catalogAddBtn.remove();
    });
  });

  prevBtn.addEventListener('click', playMusic);
  nextBtn.addEventListener('click', playMusic);

};

init();

