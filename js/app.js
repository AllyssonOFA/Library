/* DOM ELEMENTS */
let tbody = document.querySelector('tbody');
const submitFormBtn = document.querySelector('#submitForm');
const addBtn = document.querySelector('#addBtn');
const closeModalBtn = document.querySelector('#cancelForm');

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary() {
    createBook();
    updateTable();
}

/* FORM CONTROL */
function clearForm() {
    document.querySelector('#formTitle').value = '';
    document.querySelector('#formAuthor').value = '';
    document.querySelector('#formPages').value = '';
    document.querySelector('#formReadStatus').checked = true;
}

function createBook() {
    let title = document.querySelector('#formTitle');
    let author = document.querySelector('#formAuthor');
    let pages = document.querySelector('#formPages');
    let isRead = document.querySelector('#formReadStatus');

    let book = new Book(title.value, author.value, pages.value, isRead.checked);
    myLibrary.push(book);
    
}

submitFormBtn.addEventListener('click', addBookToLibrary);

/* MODAL CONTROL */


function openModal(){
    const modal = document.querySelector('#modalForm');
    modal.showModal();
}

function closeModal(){
    const modal = document.querySelector('#modalForm');
    modal.close();
}

addBtn.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

/* TABLE CONTROL AND DISPLAY */

function createToogleReadBtnTd(book){
    let newDataCell = document.createElement('td');
    let toogleReadBtn = document.createElement('button');
    toogleReadBtn.classList.add('table-btn');
    toogleReadBtn.textContent = book.isRead ? 'Read' : 'Not Read';
    toogleReadBtn.dataset.status = book.isRead ? 'read' : 'not-read';
    toogleReadBtn.addEventListener('click', () =>{
        book.isRead = !book.isRead;
        updateTable();
    });
    newDataCell.appendChild(toogleReadBtn);
    return newDataCell;
    
}

function createDeleteBtnTd(index){
    let newDataCell = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('table-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        updateTable();
    });
    newDataCell.appendChild(deleteBtn);
    return newDataCell;
}



function createTableElements(){
    tbody.textContent = '';

    myLibrary.forEach((book, index) => {
        let row = document.createElement('tr');
        Object.keys(book).forEach(propriety => {
            if (propriety == 'isRead'){
                row.appendChild(createToogleReadBtnTd(book));
            } else {
                let newDataCell = document.createElement('td');
                newDataCell.textContent = book[propriety];
                row.appendChild(newDataCell);
            }
        });
        row.appendChild(createDeleteBtnTd(index));
        tbody.appendChild(row);
    });

    
}

function updateTable(){
    createTableElements();
    populateStorage();    
}

/* LOCAL STORAGE CONTROL */

function populateStorage(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getStorage(){
    myLibrary = JSON.parse(localStorage.getItem('library'));
    
}

/* Init */
function init() {
    clearForm();
    if(!getStorage()){
        populateStorage();
    } else {
        getStorage();
    }
    updateTable();
}

document.addEventListener('DOMContentLoaded', init());