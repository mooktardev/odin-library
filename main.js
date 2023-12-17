class Book {
  constructor(
    title = "",
    author = "",
    pages = 0,
    read = false
  ) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
  }
}

class Library {
  constructor() {
    this.books = []
  }
  getBook(title) {
    return this.books.find(b => b.title === title)
  }
  isInLibrary(title) {
    return this.books.some((b) => b.title === title)
  }
  addBook(book) {
    if (!this.isInLibrary(book)) {
      return this.books.push(book)
    }
  }
  removeBook(title) {
    this.books = this.books.filter(b => b.title !== title)
  }
  toggleRead(title) {
    const book = this.books.find(b => b.title === title)
    book.read = !book.read
  }
}

// Init a library
const myLibrary = new Library()

// Sample book's data
myLibrary.addBook({title: 'Harry Potter', author: "J. K. someone", pages: 5990, read: false})

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
  for (let book of myLibrary.books) {
    createCardItem(book);
  }
};

// Create Book Card
const createCardItem = ({ title, author, pages, read }) => {
  const cardEL = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardInfo = document.createElement("div");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardFooter = document.createElement("div");
  const cardRead = document.createElement("button");
  const cardDelete = document.createElement("button");
  const readColor = read ? "green" : "blue"
  // Set Attributes and Classes
  cardEL.className = "flex flex-col items-start p-8 rounded-xl shadow-md bg-white";
  cardTitle.className = "text-2xl font-semibold normal-case";
  cardInfo.className = "w-full flex justify-between mt-3 mb-5";
  cardPages.className = "font-semibold italic";
  cardFooter.className = "w-full flex justify-center items-center text-sm space-x-3 mt-3";
  cardRead.className = `toggle-read p-2 bg-${readColor}-400/40 text-${readColor}-800 hover:bg-${readColor}-400/60 transition duration-200 ease-in-out rounded-md shadow-sm`;
  cardRead.setAttribute("title", "Toggle is read");
  cardRead.dataset.bookTitle = title;
  cardRead.onclick = toggleReadStatus;
  cardDelete.className = "remove-book p-2 items-center text-red-800 bg-red-400/40 hover:bg-red-400/60 transition duration-200 ease-in-out rounded-md shadow-sm";
  cardDelete.setAttribute("title", "Remove this book");
  cardDelete.dataset.bookTitle = title;
  cardDelete.onclick = removeBookFromLibrary;
  // Set values
  cardTitle.innerText = title;
  cardAuthor.innerHTML = `By <span class="italic underline text-semibold">${author}</span>`;
  cardPages.innerHTML = `<span class="slashed-zero proportional-nums">${pages}</span> pages`;
  cardRead.innerHTML = `<i class="fa-solid fa-circle-${read ? 'check' : 'xmark'}"></i> ${ read ? "Already read!" : "Not read yet!" }`;
  cardDelete.innerHTML = `<i class="fa-solid fa-trash"></i> Remove`;
  // Append childs
  cardInfo.append(cardAuthor, cardPages);
  cardFooter.append(cardRead, cardDelete);
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
  const book = new Book(title, author, pages, read);
  console.log(book);
  // Add the book to our library array
  if (!myLibrary.isInLibrary(book.title)) {
    myLibrary.addBook(book)
    createCardItem(book);
    document.querySelector(".book-title-error").classList.add("hidden");
    closeModal();
    formModal.reset();
  } else {
    document.querySelector(".book-title-error").classList.remove("hidden");
  }
}

// Submit Form data
formModal.onsubmit = (e) => {
  e.preventDefault();
  addBookToLibrary();
};

// Toggle if book is read or not
function toggleReadStatus(e) {
  const title = e.target.dataset.bookTitle;
  myLibrary.toggleRead(title);
  updateCardWrapper();
}

// Remove book from myLibrary
function removeBookFromLibrary(e) {
  let title = e.target.dataset.bookTitle;
  myLibrary.removeBook(title)
  updateCardWrapper();
}

// Windows loaded
window.addEventListener("DOMContentLoaded", () => {
  updateCardWrapper();
});
