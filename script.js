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
   
}
