const addBook = document.querySelector('[data-add-book]');
const removeBook = document.querySelector('[data-remove-book]');
const addBookModal = document.querySelector('[data-add-book-modal]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');

console.log(addBook);
addBook.addEventListener('click', () => {
  addBookModal.showModal();
});

cancelBookModal.addEventListener('click', () => {
  addBookModal.close();
});
