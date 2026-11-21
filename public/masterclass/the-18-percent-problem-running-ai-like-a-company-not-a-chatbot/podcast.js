const dialog = document.querySelector('#podcast-studio');
const audio = dialog.querySelector('audio');
const player = dialog.querySelector('[data-player]');
const play = dialog.querySelector('[data-play]');
const seek = dialog.querySelector('[data-seek]');
const notice = dialog.querySelector('[data-notice]');
const current = dialog.querySelector('[data-current]');
const duration = dialog.querySelector('[data-duration]');
const wave = [...dialog.querySelectorAll('.studio-wave span')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opener;
let closeTimer;
let changedTranscript = false;

const clock = (seconds) => {
  const whole = Math.floor(seconds || 0);
  return Math.floor(whole / 60) + ':' + String(whole % 60).padStart(2, '0');
};
const update = () => {
  if (!Number.isFinite(audio.duration)) return;
  seek.max = audio.duration;
  seek.value = audio.currentTime;
  seek.disabled = false;
  seek.setAttribute('aria-valuetext', clock(audio.currentTime) + ' of ' + clock(audio.duration));
  current.textContent = clock(audio.currentTime);
  duration.textContent = clock(audio.duration);
  const count = Math.round(wave.length * audio.currentTime / audio.duration);
  wave.forEach((bar,i) => bar.toggleAttribute('data-played', i < count));
};
const reflect = () => {
  const playing = !audio.paused && !audio.ended;
  play.toggleAttribute('data-playing', playing);
  play.setAttribute('aria-label', playing ? 'Pause podcast' : 'Play podcast');
};
const start = () => {
  notice.textContent = '';
  audio.play().catch((error) => {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      notice.textContent = 'Playback is unavailable. Try the MP3 download.';
    }
  });
};
const open = (control) => {
  if (dialog.open) return;
  opener = control;
  dialog.showModal();
  document.documentElement.classList.add('podcast-open');
  start();
};
const close = () => {
  if (!dialog.open || dialog.hasAttribute('data-closing')) return;
  audio.pause();
  dialog.setAttribute('data-closing', '');
  if (reduceMotion.matches) dialog.close();
  else closeTimer = window.setTimeout(() => dialog.close(), 250);
};

if (typeof dialog.showModal === 'function') {
  document.documentElement.classList.add('podcast-enhanced');
  document.querySelectorAll('[data-open-podcast]').forEach((control) => {
    control.addEventListener('click', (event) => {
      event.preventDefault();
      open(control);
    });
  });
}
dialog.querySelector('[data-close]').addEventListener('click', close);
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  close();
});
dialog.addEventListener('close', () => {
  window.clearTimeout(closeTimer);
  dialog.removeAttribute('data-closing');
  document.documentElement.classList.remove('podcast-open');
  if (changedTranscript) {
    const transcript = document.querySelector('#podcast-transcript');
    transcript.open = true;
    transcript.querySelector('summary').focus();
    transcript.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'center' });
  } else {
    opener?.focus({ preventScroll: true });
  }
  changedTranscript = false;
});
dialog.querySelector('[data-transcript]').addEventListener('click', () => {
  changedTranscript = true;
  close();
});
play.addEventListener('click', () => {
  if (audio.paused || audio.ended) start();
  else audio.pause();
});
player.querySelectorAll('[data-skip]').forEach((button) => {
  button.addEventListener('click', () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + Number(button.dataset.skip)));
    }
  });
});
seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value);
});
player.querySelector('[data-speed]').addEventListener('change', (event) => {
  audio.playbackRate = Number(event.target.value);
});
['loadedmetadata','durationchange','timeupdate'].forEach((event) => audio.addEventListener(event, update));
['play','pause','ended'].forEach((event) => audio.addEventListener(event, reflect));
audio.addEventListener('error', () => { notice.textContent = 'Playback is unavailable. Try the MP3 download.'; });
update();
reflect();
