class BookCollection {
  constructor() {
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
    this.errorMsg = document.getElementById('error');
    this.collection = JSON.parse(localStorage.getItem('booksCollection')) || [];
    this.detailsDiv = document.getElementById('details');

    this.errorMsg.style.display = 'none';
  }

  updateBookData(collectionData) {
    localStorage.setItem('booksCollection', JSON.stringify(collectionData));
    this.title.value = '';
    this.author.value = '';
  }

  showBookData() {
    Object.values(this.collection).forEach((field) => {
      const html = `<div class="detailDiv"><p class="title" data-title="${field.title}" data-author="${field.author}">"${field.title}" by ${field.author}</p>
        <button class="remove">Remove</button></div>
        `;
      const prevHtml = document.getElementById('details').innerHTML;
      document.getElementById('details').innerHTML = html + prevHtml;

      const bookItems = document.querySelectorAll('.remove');
      bookItems.forEach((bookItem) => {
        bookItem.addEventListener('click', this.removeBook.bind(this));
      });
    });
    if (this.detailsDiv.childElementCount === 0) {
      this.detailsDiv.style.border = 'none';
    } else {
      this.detailsDiv.style.border = '4px solid black';
    }
  }

  removeBook(event) {
    const parentDiv = event.target.parentElement;
    const titleSelector = parentDiv.querySelector('.title');
    const title = titleSelector.getAttribute('data-title');
    const author = titleSelector.getAttribute('data-author');

    parentDiv.remove();
    if (this.detailsDiv.childElementCount === 0) {
      this.detailsDiv.style.border = 'none';
    } else {
      this.detailsDiv.style.border = '4px solid black';
    }
    const collectionFilter = this.collection.filter(
      (book) => book.title !== title || book.author !== author,
    );
    this.collection = collectionFilter;
    this.updateBookData(collectionFilter);
  }

  addBook(title, author) {
    this.collection.push({ title, author });
    const html = `<div class="detailDiv"><p class="title" data-title="${title}" data-author="${author}">"${title}" by ${author}</p>
      <button class="remove">Remove</button></div>
      `;
    const prevHtml = document.getElementById('details').innerHTML;
    document.getElementById('details').innerHTML = html + prevHtml;
    this.updateBookData(this.collection);
    this.detailsDiv.style.border = '4px solid black';
    const bookItems = document.querySelectorAll('.remove');
    bookItems.forEach((bookItem) => {
      bookItem.addEventListener('click', this.removeBook.bind(this));
    });
  }
}

const bookCollection = new BookCollection();
bookCollection.showBookData();
const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
  if (bookCollection.title.value === '' || bookCollection.author.value === '') {
    bookCollection.errorMsg.style.display = 'block';
    bookCollection.errorMsg.style.color = 'red';
  } else {
    bookCollection.errorMsg.style.display = 'none';
    bookCollection.addBook(bookCollection.title.value, bookCollection.author.value);
  }
});
