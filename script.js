const addBtn = document.getElementById('add');
const collection = JSON.parse(localStorage.getItem('booksCollection')) || [];

function updateBookData(collectionData) {
  localStorage.setItem('booksCollection', JSON.stringify(collectionData));
}

function removeBook(event) {
  const parentDiv = event.target.parentElement;
  const title = parentDiv.querySelector('.title').textContent;
  const author = parentDiv.querySelector('.author').textContent;

  parentDiv.remove();
  const collectionFilter = collection.filter(
    (book) => book.title !== title || book.author !== author,
  );
  updateBookData(collectionFilter);
}
function addBooks(title, author) {
  collection.push({ title, author });
  const html = `<div class="detailDiv"><p class="title">${title}</p>
      <p class="author">${author}</p>
      <button class="remove">Remove</button><hr></div>
      `;
  const prevHtml = document.getElementById('details').innerHTML;
  document.getElementById('details').innerHTML = html + prevHtml;
  updateBookData(collection);
  const bookItems = document.querySelectorAll('.remove');
  bookItems.forEach((bookItem) => {
    bookItem.addEventListener('click', removeBook);
  });
}
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBooks(title, author);
});

Object.values(collection).forEach((field) => {
  const html = `<div class="detailDiv"><p class="title">${field.title}</p>
    <p class="author">${field.author}</p>
    <button class="remove">Remove</button><hr></div>
    `;
  const prevHtml = document.getElementById('details').innerHTML;
  document.getElementById('details').innerHTML = html + prevHtml;

  const bookItems = document.querySelectorAll('.remove');
  bookItems.forEach((bookItem) => {
    bookItem.addEventListener('click', removeBook);
  });
});
