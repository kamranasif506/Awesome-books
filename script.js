class BookCollection {
  constructor() {
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
    this.errorMsg = document.getElementById('error');
    this.collection = JSON.parse(localStorage.getItem('booksCollection')) || [];

    this.errorMsg.style.display = 'none';
  }

  updateBookData(collectionData) {
    localStorage.setItem('booksCollection', JSON.stringify(collectionData));
    this.title.value = '';
    this.author.value = '';
  }

  removeBook(event) {
    const parentDiv = event.target.parentElement;
    const titleSelector = parentDiv.querySelector('.title');
    const title = titleSelector.getAttribute('data-title');
    const author = titleSelector.getAttribute('data-author');

    parentDiv.remove();
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

    const bookItems = document.querySelectorAll('.remove');
    bookItems.forEach((bookItem) => {
      bookItem.addEventListener('click', this.removeBook.bind(this));
    });
  }
}

const bookCollection = new BookCollection();

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
