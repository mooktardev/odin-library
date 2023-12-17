# Library
Library is an assignement from The Odin Project

## Screenshot
![Screenshot](./screenshot.png)


## Library stucture
```javascript
// List of books
const myLibrary = []

// Book constructor (OLD VERSION)
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

// Refratoring book's function in class (NEW VERSION)
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

// Library class
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
```

## Demo
[Live preview](https://odin-library-gamma.vercel.app/)

## Contribution
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
