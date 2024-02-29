// buttons for event listener

const newBook = document.querySelector('[data-new-book]');
const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');
const addBookModal = document.querySelector('[data-add-book-modal]');

// user info to use for book constructor

const bookTitle = document.querySelector('[data-book-title');
const bookAuthor = document.querySelector('[data-book-author');
const bookPageNumber = document.querySelector('[data-book-page-number');
const bookRead = document.querySelector('[data-book-read');
const bookNotRead = document.querySelector('[data-book-not-read');

newBook.addEventListener('click', () => {
  addBookModal.showModal();
});

cancelBookModal.addEventListener('click', () => {
  addBookModal.close();
});

addBook.addEventListener('click', (e) => {
  e.preventDefault();

  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPageNumber.value,
    bookWasReadOrNotRead()
  );

  console.log(book);
});

function Book(title, author, numberOfPages, readOrNotRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readOrNotRead = readOrNotRead;
}

function bookWasReadOrNotRead() {
  return bookRead.checked
    ? bookRead.nextElementSibling.textContent
    : bookNotRead.nextElementSibling.textContent;
}

function createBook(title, author, numberOfPages) {
  const newDiv = document.createElement('div');
  const libraryCatalog = document.querySelector('[data-library-catalog]');

  newDiv.classList.add('library-book');

  newDiv.innerHTML = `<div>
    <h3>${title}</h3>
    <p>${author}</p>
</div>
<p>${numberOfPages} pages</p>
<div>
    <button>Read</button>
    <button>Not read</button>`;
  libraryCatalog.appendChild(newDiv);
}

createBook('test', 'testing', 123);
createBook('new test', 'more testing', 222);
