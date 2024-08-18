let mobileMediaQuery = window.matchMedia("(max-width: 400px)");
let tabletMediaQuery = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

// Function to reset the size of the notes.
function resizeNotes() {
  notes.forEach(note => {
    note.classList.remove("active");
    note.style.height = "30%";
  });
}

// Function to handle note clicks.
function handleNoteClick(note, i) {
  if (note.classList.contains("active")) {
    note.classList.remove("active");
    note.style.height = "30%";
  } else {
    resizeNotes();
    note.classList.add("active");
    if (mobileMediaQuery.matches) {
      note.style.height = `${125 + 40 * i}%`;
    } else if (tabletMediaQuery.matches) {
      note.style.height = `${80 + 21 * i}%`;
    } else {
      note.style.height = `${70 + 20 * i}%`;
    }
  }
}

// Main function to initialize note functionality.
function initNotes() {
  notes.forEach((note, i) => {
    note.addEventListener("click", () => handleNoteClick(note, i));
  });
  document.querySelector(".js-envelop-content").style.height = "110%";
}

// Function to set up the up paper of the envelope.
function setupUpPaper() {
  const upPaper = document.querySelector(".js-up-paper");
  upPaper.style.bottom = "97%";
  upPaper.style.transform = "rotate(180deg)";
  upPaper.style.zIndex = "200";
  upPaper.style.clipPath = "polygon(0% 0%, 100% 0%, 50% 61%)";
  
  // Ensure the notes are revealed after the up paper is set up
  document.querySelector(".js-envelop-content").style.transform = "translateY(0)";
  
  initNotes();
}

// Function to start the up paper transition.
function startEnvelopTransition() {
  const upPaper = document.querySelector(".js-up-paper");
  upPaper.style.bottom = "1%";
  upPaper.style.transition = "bottom 0.25s ease";
  upPaper.addEventListener("transitionend", setupUpPaper, { once: true });
  upPaper.removeEventListener("click", startEnvelopTransition);
  upPaper.classList.remove("cursor");
}

// Function to handle sticker removal.
function handleStickerClick() {
  const sticker = document.querySelector(".js-sticker");
  sticker.style.width = "20%";
  sticker.style.left = "-80%";
  document.body.classList.remove("scissors");
  sticker.removeEventListener("click", handleStickerClick);

  const upPaper = document.querySelector(".js-up-paper");
  upPaper.addEventListener("click", startEnvelopTransition);
  upPaper.classList.add("cursor");
}

// Initialize event listeners.
document.querySelector(".js-sticker").addEventListener("click", handleStickerClick);
window.onresize = resizeNotes;
