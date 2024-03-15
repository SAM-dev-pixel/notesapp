const searchInput = document.querySelector(".search-input");
const notes = document.querySelectorAll(".note");
const notesTitle = document.querySelectorAll(".card-title");
const notesText = document.querySelectorAll(".card-text")

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  notesTitle.forEach((title, i) => {
    const isVisible = title.innerHTML.toLowerCase().includes(searchValue) || notesText[i].innerHTML.toLowerCase().includes(searchValue);
    notes[i].classList.toggle("hide", !isVisible);
  });
});
