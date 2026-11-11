// BESTIE SCRAPBOOK — the pop-ups and tiny extras live here.
// Edit the letter in index.html and replace the photos in the images folder.

const invitation = document.getElementById('inviteDialog');
const questionView = document.getElementById('questionView');
const responseView = document.getElementById('responseView');
const responseEmoji = document.getElementById('responseEmoji');
const responseTitle = document.getElementById('responseTitle');
const responseText = document.getElementById('responseText');
const shareAnswer = document.getElementById('shareAnswer');

function openInvitation() {
  // Start fresh each time she opens the envelope.
  questionView.hidden = false;
  responseView.hidden = true;
  invitation.showModal();
}

function showAnswer(isYes) {
  questionView.hidden = true;
  responseView.hidden = false;

  if (isYes) {
    responseEmoji.textContent = '💙✨';
    responseTitle.textContent = "it's a date!!";
    responseText.textContent = "YAY! A bestie dinner is exactly what we need. Can't wait to see you on Thursday!";
    shareAnswer.href = 'https://wa.me/?text=' + encodeURIComponent("YESSS! I'd love to go for dinner with you this Thursday! 💙");
    celebrate();
  } else {
    responseEmoji.textContent = '☁️💙';
    responseTitle.textContent = 'another day it is ♡';
    responseText.textContent = "Of course! We'll find a day that works for us. Dinner is still very much on me!";
    shareAnswer.href = 'https://wa.me/?text=' + encodeURIComponent("I can't do Thursday, but let's find another day for our bestie dinner 💙");
  }
}

document.getElementById('openInvite').addEventListener('click', openInvitation);
document.getElementById('closeInvite').addEventListener('click', () => invitation.close());
document.getElementById('yesButton').addEventListener('click', () => showAnswer(true));
document.getElementById('laterButton').addEventListener('click', () => showAnswer(false));

// Click the dark area around a pop-up to close it.
invitation.addEventListener('click', (event) => {
  if (event.target === invitation) invitation.close();
});

function celebrate() {
  const colours = ['#aacfe6', '#efabc2', '#f7e9b7', '#83b2d1', '#ffffff'];
  for (let i = 0; i < 48; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti-bit';
    bit.style.setProperty('--left', `${Math.random() * 100}vw`);
    bit.style.setProperty('--drift', `${(Math.random() - .5) * 180}px`);
    bit.style.setProperty('--duration', `${2 + Math.random() * 1.4}s`);
    bit.style.setProperty('--colour', colours[i % colours.length]);
    document.body.appendChild(bit);
    bit.addEventListener('animationend', () => bit.remove(), { once: true });
  }
}

// Gallery: missing photos show pretty placeholders; real photos open larger.
const photoDialog = document.getElementById('photoDialog');
const largePhoto = document.getElementById('largePhoto');
const largePhotoCaption = document.getElementById('largePhotoCaption');

document.querySelectorAll('.polaroid').forEach((card) => {
  const image = card.querySelector('img');
  const button = card.querySelector('.photo-button');

  const showIfLoaded = () => {
    if (image.naturalWidth > 0) image.hidden = false;
  };

  image.addEventListener('load', showIfLoaded);
  image.addEventListener('error', () => { image.hidden = true; });
  if (image.complete) showIfLoaded();

  button.addEventListener('click', () => {
    if (image.hidden || !image.naturalWidth) return;
    largePhoto.src = image.currentSrc;
    largePhoto.alt = image.alt;
    largePhotoCaption.textContent = card.querySelector('figcaption').textContent;
    photoDialog.showModal();
  });
});

document.getElementById('closePhoto').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', (event) => {
  if (event.target === photoDialog) photoDialog.close();
});
