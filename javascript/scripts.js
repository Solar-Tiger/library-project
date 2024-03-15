// Buttons for event listeners
const newBook = document.querySelector('[data-new-book]');
const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const cancelBook = document.querySelector('[data-cancel-book]');
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
addBook.addEventListener('click', (event) => {
  event.preventDefault();
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
});

// Function to display book deletion
removeBook.addEventListener('click', () => {
  const removeEl = () => document.querySelectorAll('.library-book');

  // const removeEl2 = document.querySelectorAll(".library-book")
  // console.log(removeEl2);
  // removeEl2.forEach((removedEl, index) => {
  //   console.log(removedEl.lastElementChild.querySelector(`button[data-read-${index}]`));
  // })

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

// Book constructor
function Book(title, author, numberOfPages, readOrNotRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readOrNotRead = readOrNotRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readOrNotRead}`;
  };
}

Book.prototype.doThings = function (isBookRead, isBookNotRead) {
  if (isBookRead.textContent === 'Read') {
    isBookRead.style.backgroundColor = 'green';
    isBookRead.disabled = true;

    isBookNotRead.disabled = false;
    isBookNotRead.style.backgroundColor = 'white';
  } else if (isBookRead.textContent === 'Not Read') {
    isBookRead.style.backgroundColor = 'red';
    isBookRead.disabled = true;

    isBookNotRead.disabled = false;
    isBookNotRead.style.backgroundColor = 'white';
  }
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
    <p>${bookInfo[i].author}</p>
  </div>
  <p>${bookInfo[i].numberOfPages} pages</p>
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

  readBook.addEventListener('click', () => {
    bookCurrentInfo[index].doThings(readBook, notReadBook);
    bookCurrentInfo[index].readOrNotRead = 'Read';
  });

  notReadBook.addEventListener('click', () => {
    bookCurrentInfo[index].doThings(notReadBook, readBook);
    bookCurrentInfo[index].readOrNotRead = 'Not Read';
  });

  if (bookCurrentInfo[index].readOrNotRead === 'Read') {
    bookCurrentInfo[index].doThings(readBook, notReadBook);
  } else if (bookCurrentInfo[index].readOrNotRead === 'Not Read') {
    bookCurrentInfo[index].doThings(notReadBook, readBook);
  }
}

function checkIfLibraryIsEmpty() {
  if (library.length === 0) {
    removeBook.disabled = true;
  } else {
    removeBook.disabled = false;
  }
}
