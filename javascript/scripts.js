const newBook = document.querySelector('[data-new-book]');
const removeBook = document.querySelector('[data-remove-book]');
const addBookModal = document.querySelector('[data-add-book-modal]');
const cancelBookModal = document.querySelector('[data-cancel-book-modal]');

console.log(newBook);
newBook.addEventListener('click', () => {
  addBookModal.showModal();
});

cancelBookModal.addEventListener('click', () => {
  addBookModal.close();
});
