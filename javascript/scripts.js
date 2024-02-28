const newBook = document.querySelector('[data-new-book]');
const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');
const addBookModal = document.querySelector('[data-add-book-modal]');

const bookTitle = document.querySelector('[data-book-title');
const bookAuthor = document.querySelector('[data-book-author');
const bookPageNumber = document.querySelector('[data-book-page-number');
const bookRead = document.querySelector('[data-book-read');
const bookNotRead = document.querySelector('[data-book-not-read');

console.log(newBook);
newBook.addEventListener('click', () => {
  addBookModal.showModal();
});

cancelBookModal.addEventListener('click', () => {
  addBookModal.close();
});

addBook.addEventListener('click', (e) => {
  e.preventDefault();
});

function Book(title, author, numberOfPages, readOrNotRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readOrNotRead = readOrNotRead;
}

console.dir(addBook);
