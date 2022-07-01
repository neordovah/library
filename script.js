const addBook = document.getElementById("addBook");
const submit = document.getElementById("submit");
const form = document.getElementById("form");

let toggleAddBook = 0;

function checkToggleBook(toggle) {
    if(toggleAddBook % 2 == 1) {
        addBook.innerHTML = "-";
    }
    else {
        addBook.innerHTML = "+";
    }
}

addBook.addEventListener("click", () => {
    form.classList.toggle("showForm");
    toggleAddBook++;
    checkToggleBook(toggleAddBook);
})

/////////
/////////

let tbody = document.getElementById("tbody");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let status = document.getElementById("status");

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    
}

function getBookData() {
    let bookAuthor, bookTitle, bookPages, bookStatus;
    if(title.value === "") return;
    bookTitle = title.value;
    if(author.value != "") {
        bookAuthor = author.value;
    }
    else {
        bookAuthor = "-"
    }
    if(pages.value != "") {
        bookPages = pages.value;
    }
    else {
        bookPages = "-"
    }
    if(status.value == "not-started") {
        bookStatus = "not-started";
    } else if(status.value == "on-going") {
        bookStatus = "on-going";
    } else if(status.value == "finished") {
        bookStatus = "finished";
    }
    console.log(bookAuthor, bookPages, bookStatus, bookTitle)
}

function resetForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    status.value = "not-started";
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    getBookData();
    if(title.value != "") resetForm();
})
