class BookCollection {
  constructor() {
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
    this.addBtn = document.getElementById('add');
    this.errorMsg = document.getElementById('error');
    this.collection = JSON.parse(localStorage.getItem('booksCollection')) || [];

    this.errorMsg.style.display = 'none';

    this.addBtn.addEventListener('click', () => {
      if (this.title.value === '' || this.author.value === '') {
        this.errorMsg.style.display = 'block';
        this.errorMsg.style.color = 'red';
      } else {
        this.errorMsg.style.display = 'none';
        this.addBook(this.title.value, this.author.value);
      }
    });

    Object.values(this.collection).forEach((field) => {
      const html = `<div class="detailDiv"><p class="title">${field.title}</p>
        <p class="author">${field.author}</p>
        <button class="remove">Remove</button><hr></div>
        `;
      const prevHtml = document.getElementById('details').innerHTML;
      document.getElementById('details').innerHTML = html + prevHtml;

      const bookItems = document.querySelectorAll('.remove');
      bookItems.forEach((bookItem) => {
        bookItem.addEventListener('click', this.removeBook.bind(this));
      });
    });
  }

  updateBookData(collectionData) {
    localStorage.setItem('booksCollection', JSON.stringify(collectionData));
    this.title.value = '';
    this.author.value = '';
  }

  removeBook(event) {
    const parentDiv = event.target.parentElement;
    const title = parentDiv.querySelector('.title').textContent;
    const author = parentDiv.querySelector('.author').textContent;

    parentDiv.remove();
    const collectionFilter = this.collection.filter(
      (book) => book.title !== title || book.author !== author
    );
    this.collection = collectionFilter;
    this.updateBookData(collectionFilter);
  }

  addBook(title, author) {
    this.collection.push({ title, author });
    const html = `<div class="detailDiv"><p class="title">${title}</p>
      <p class="author">${author}</p>
      <button class="remove">Remove</button><hr></div>
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

// Create an instance of the BookCollection class
const bookCollection = new BookCollection();
