// Buttons for event listeners
const newBook = document.querySelector('[data-new-book]');
const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');
const addBookModal = document.querySelector('[data-add-book-modal]');

// User info to use for book constructor
const bookTitle = document.querySelector('[data-book-title');
const bookAuthor = document.querySelector('[data-book-author');
const bookPageNumber = document.querySelector('[data-book-page-number');
const bookRead = document.querySelector('[data-book-read');
const bookNotRead = document.querySelector('[data-book-not-read');
const library = [];

// Show book modal
newBook.addEventListener('click', () => {
  addBookModal.showModal();
});

// Close book modal
cancelBookModal.addEventListener('click', () => {
  addBookModal.close();
});

// Function for creating a book and appending it to the page
addBook.addEventListener('click', () => {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPageNumber.value,
    bookWasReadOrNotRead()
  );

  createBook(book.title, book.author, book.numberOfPages);

  library.push(book);
  console.log(library);
});

// Function to display book deletion
removeBook.addEventListener('click', () => {
  const deleteButton = document.querySelectorAll('.delete');
  const removeEl = document.querySelectorAll('.library-book');

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].classList.remove('hidden');

    deleteButton[i].addEventListener('click', () => {
      removeEl[i].remove();
    });
  }
});

// Book constructor
function Book(title, author, numberOfPages, readOrNotRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readOrNotRead = readOrNotRead;
}

// Used to determine if a book is read or not based on the checked status of the radio buttons
function bookWasReadOrNotRead() {
  return bookRead.checked
    ? bookRead.nextElementSibling.textContent
    : bookNotRead.nextElementSibling.textContent;
}

// Takes the info gotten from the Book constructor and displays it to the user
function createBook(title, author, numberOfPages) {
  const newDiv = document.createElement('div');
  const libraryCatalog = document.querySelector('[data-library-catalog]');

  newDiv.classList.add('library-book');

  newDiv.innerHTML = `<button class="delete hidden">X</button>
  <div>
    <h3>${title}</h3>
    <p>${author}</p>
  </div>
  <p>${numberOfPages} pages</p>
  <div>
    <button>Read</button>
    <button>Not read</button>
  </div>`;
  libraryCatalog.appendChild(newDiv);
}
