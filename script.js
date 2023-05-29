const addBtn = document.getElementById('add');
const collection = JSON.parse(localStorage.getItem('booksCollection')) || [];
add.addEventListener('click',function(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    addBooks(title,author);
})

function addBooks(title,author){
    collection.push({title:title,author:author});
    var html = `<div class="detailDiv"><p class="title">${title}</p>
    <p class="author">${author}</p>
    <button class="remove">Remove</button><hr></div>
    `;
    const prevHtml = document.getElementById('details').innerHTML;
    document.getElementById('details').innerHTML = html + prevHtml;
    updateBookData(collection);
    var bookItems = document.querySelectorAll('.remove');
    bookItems.forEach(function(bookItem) {
      bookItem.addEventListener('click', removeBook);
    });
}

function removeBook(event){
    var parentDiv = event.target.parentElement;
    var title = parentDiv.querySelector('.title').textContent;
    var author = parentDiv.querySelector('.author').textContent;
    
    parentDiv.remove();
    collectionFilter = collection.filter(function(book) {
        return book.title !== title || book.author !== author;
    });
    updateBookData(collectionFilter);
}
Object.values(collection).forEach((field) => {
    var html = `<div class="detailDiv"><p class="title">${field.title}</p>
    <p class="author">${field.author}</p>
    <button class="remove">Remove</button><hr></div>
    `;
    const prevHtml = document.getElementById('details').innerHTML;
    document.getElementById('details').innerHTML = html + prevHtml;
   
    var bookItems = document.querySelectorAll('.remove');
    bookItems.forEach(function(bookItem) {
      bookItem.addEventListener('click', removeBook);
    });
  });

function updateBookData(collectionData) {
  
  localStorage.setItem('booksCollection', JSON.stringify(collectionData));
}

