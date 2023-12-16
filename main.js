// Init Library
const myLibrary = [
  {
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: 900,
    read: true,
  },
];

// Initialise Book constructor
function Book(title, author, pages, read) {
	(this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

// Check if book exists in the library using some
const isInLibrary = (title) => myLibrary.some((b) => b.title === title);

// MODAL FORM
const addBookBtn = document.querySelector(".add-book");
const modalEl = document.querySelector("#modal");
const formModal = document.querySelector(".form-modal");
const closeModalBtn = document.querySelector(".close-modal");
const resetFormBtn = document.querySelector(".reset-form");
// modal functions
const openModal = () => modalEl.classList.remove("hidden");
const closeModal = () => modalEl.classList.add("hidden");
const resetForm = () => formModal.reset();
// Modal events
addBookBtn.onclick = openModal;
closeModalBtn.onclick = closeModal;
resetFormBtn.onclick = (e) => {
  resetForm();
  closeModal();
};
window.onkeydown = (e) => {
  if (e.key === "Escape") closeModal;
};

// Card Wrapper
const cardWrapper = document.querySelector(".card-wrapper");
const clearCardWrapper = () => (cardWrapper.innerHTML = "");
const updateCardWrapper = () => {
  clearCardWrapper();
  for (let book of myLibrary) {
    let index = myLibrary.findIndex((b) => b === book);
    createCardItem(book, index);
  }
};

// Create Book Card
const createCardItem = ({ title, author, pages, read }, index) => {
  const cardEL = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardInfo = document.createElement("div");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardFooter = document.createElement("div");
  const cardIsRead = document.createElement("button");
  const cardDelete = document.createElement("button");
  const readColor = read ? "green" : "blue"
  // Set Attributes and Classes
  cardEL.className =
    "flex flex-col items-start p-8 rounded-xl shadow-md bg-white";
  cardTitle.className = "text-2xl font-semibold normal-case";
  cardInfo.className = "w-full flex justify-between mt-3 mb-5";
  cardPages.className = "font-semibold italic";
  cardFooter.className =
    "w-full flex justify-center items-center text-sm space-x-3 mt-3";
  cardIsRead.className = `toggle-read p-2 bg-${readColor}-400/40 text-${readColor}-800 hover:bg-${readColor}-400/60 transition duration-200 ease-in-out rounded-md shadow-sm`;
  cardIsRead.setAttribute("title", "Toggle is read");
  cardIsRead.dataset.id = index;
  cardIsRead.onclick = toggleReadStatus;
  cardDelete.className =
    "remove-book p-2 items-center text-red-800 bg-red-400/40 hover:bg-red-400/60 transition duration-200 ease-in-out rounded-md shadow-sm";
  cardDelete.setAttribute("title", "Remove this book");
  cardDelete.dataset.id = index;
  cardDelete.onclick = removeBookFromLibrary;
  // Set values
  cardTitle.innerText = title;
  cardAuthor.innerHTML = `By <span class="italic underline text-semibold">${author}</span>`;
  cardPages.innerHTML = `<span class="slashed-zero proportional-nums">${pages}</span> pages`;
  cardIsRead.innerHTML = `<i class="fa-solid fa-circle-${read ? 'check' : 'xmark'}"></i> ${
    read ? "Already read!" : "Not read yet!"
  }`;
  cardDelete.innerHTML = `<i class="fa-solid fa-trash"></i> Remove`;
  // Append childs
  cardInfo.append(cardAuthor, cardPages);
  cardFooter.append(cardIsRead, cardDelete);
  cardEL.append(cardTitle, cardInfo, cardFooter);
  cardWrapper.appendChild(cardEL);
};

// Add book to library
function addBookToLibrary() {
  // create new book object from the form input values
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;
  // Create a new book using our Book constructor function and pass in the user's inputs as arguments
  const book = new Book(title, author, pages, read);
  console.log(read);
  // Add the book to our library array
  if (!isInLibrary(title)) {
    myLibrary.push(book);
    const bookIndex = myLibrary.findIndex((b) => b == book);
    createCardItem(book, bookIndex);
    document.querySelector(".book-title-error").classList.add("hidden");
    closeModal();
    formModal.reset();
  } else {
    document.querySelector(".book-title-error").classList.remove("hidden");
  }
}
// Submit form data
formModal.onsubmit = (e) => {
  e.preventDefault();
  addBookToLibrary();
};

// Toggle if book is read or not
function toggleReadStatus(e) {
  let index = e.target.dataset.id;
  const book = myLibrary[index];
  book.read = !book.read;
  updateCardWrapper();
}

// Remove book from myLibrary
function removeBookFromLibrary(e) {
  let index = e.target.dataset.id;
  if (myLibrary[index]) {
    myLibrary.splice(index, 1);
    updateCardWrapper();
  }
}

// Windows loaded
window.addEventListener("DOMContentLoaded", () => {
  updateCardWrapper();
});
