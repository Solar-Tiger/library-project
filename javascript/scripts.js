// Buttons for event listeners
const newBook = document.querySelector('[data-new-book]');
const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const cancelBook = document.querySelector('[data-cancel-book]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');
const addBookModal = document.querySelector('[data-add-book-modal]');
const addBookForm = document.querySelector('[data-book-form]');

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
  if (addBookForm.checkValidity() === true) {
    const book = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPageNumber.value,
      bookWasReadOrNotRead()
    );

    library.push(book);
    createBook(library);
    checkIfLibraryIsEmpty();
    addBookModal.close();
  }
});

// Function to display book deletion
removeBook.addEventListener('click', () => {
  const removeEl = () => document.querySelectorAll('.library-book');

  newBook.disabled = true;
  removeBook.disabled = true;

  deleteMyBooks();

  function deleteMyBooks() {
    for (let i = 0; i < library.length; i++) {
      const delBtn = document.createElement('button');

      delBtn.classList.add('delete');
      delBtn.textContent = 'X';

      removeEl()[i].insertBefore(delBtn, removeEl()[i].firstChild);

      delBtn.addEventListener('click', () => {
        removeEl()[i].remove();
        library.splice(i, 1);

        removeXButton();
        removeEl();
        deleteMyBooks();
      });
    }
  }
});

// Function to remove the "X" button
function removeXButton() {
  const deleteButton = document.querySelectorAll('.delete');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].remove();
  }
}

// Function for canceling book remove action
cancelBook.addEventListener('click', () => {
  newBook.disabled = false;
  removeXButton();
  createBook(library);
  checkIfLibraryIsEmpty();
});

// Book constructor to create a book using a title, author, page number and if it's read or not
function Book(title, author, numberOfPages, readOrNotRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readOrNotRead = readOrNotRead;
  this.info = function bookInfo() {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.readOrNotRead}`;
  };
}

// Changes color of read status buttons with green and red to know what is read or not read
Book.prototype.doThings = function (isBookRead, isBookNotRead) {
  if (isBookRead.textContent === 'Read') {
    isBookRead.style.backgroundColor = 'green';
  } else {
    isBookRead.style.backgroundColor = 'red';
  }

  isBookRead.disabled = true;
  isBookNotRead.disabled = false;
  isBookNotRead.style.backgroundColor = 'white';
};

// Used to determine if a book is read or not based on the checked status of the radio buttons
function bookWasReadOrNotRead() {
  return bookRead.checked
    ? bookRead.nextElementSibling.textContent
    : bookNotRead.nextElementSibling.textContent;
}

// Takes the info gotten from the Book constructor and displays it to the user
function createBook(bookInfo) {
  const libraryCatalog = document.querySelector('[data-library-catalog]');

  libraryCatalog.innerHTML = '';

  for (let i = 0; i < library.length; i++) {
    const newDiv = document.createElement('div');

    newDiv.classList.add('library-book');

    newDiv.innerHTML = `
  <div class="book-title">
    <h3>${bookInfo[i].title}</h3>
    <p>Written by: ${bookInfo[i].author}</p>
  </div>
  <p>Total pages: ${bookInfo[i].numberOfPages}</p>
  <div>
    <button data-read-${i}>Read</button>
    <button data-not-read-${i}>Not Read</button>
  </div>`;

    libraryCatalog.appendChild(newDiv);

    updateBookReadStatus(bookInfo, i);
  }
}

function updateBookReadStatus(bookCurrentInfo, index) {
  const readBook = document.querySelector(`[data-read-${index}]`);
  const notReadBook = document.querySelector(`[data-not-read-${index}]`);

  function currentReadStatus(isRead) {
    if (isRead === 'Read') {
      bookCurrentInfo[index].doThings(readBook, notReadBook);
      bookCurrentInfo[index].readOrNotRead = 'Read';
    } else {
      bookCurrentInfo[index].doThings(notReadBook, readBook);
      bookCurrentInfo[index].readOrNotRead = 'Not Read';
    }
  }

  readBook.addEventListener('click', () => {
    currentReadStatus('Read');
  });

  notReadBook.addEventListener('click', () => {
    currentReadStatus('Not Read');
  });

  currentReadStatus(bookCurrentInfo[index].readOrNotRead);
}

function checkIfLibraryIsEmpty() {
  if (library.length === 0) {
    removeBook.disabled = true;
  } else {
    removeBook.disabled = false;
  }
}
