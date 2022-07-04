const addBook = document.getElementById("addBook");
const submit = document.getElementById("submit");

let removeRows = [];



/////////
/////////

let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let status = document.getElementById("status");

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = myLibrary.length;
}



function removeRow2(row) {
    id = row.id;
    let removeRow = document.getElementById(`${id}`);
    removeRow.remove();
}

function renameTrIds() {
    
    let removeAll = document.querySelectorAll(".removeAll");
    let removeAllCans = document.querySelectorAll(".remove");
    let number = 0;
    removeAll.forEach(removeRow => {
        removeRow.id = number;
        number++;
    });
    number = 0;
    removeAllCans.forEach(removeCan => {
        console.log(removeCan.id)
        console.log(number)
        removeCan.id = number;
        number++;
        console.log(removeCan.id)
    });
}




let bookAuthor, bookTitle, bookPages, bookStatus;

function getBookData() {
    
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
}

function resetForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    status.value = "not-started";
}

function  redoId (removeRow) {
    let id = parseInt(removeRow.id);
    myLibrary.slice(id).forEach(Book => {
        Book.id = Book.id-1;
    })

}

function remakeRows() {
    myLibrary.forEach(Book => {
        newRow(Book);
    })
}

function removeFromLibrary(removeRow) {
    let id = parseInt(removeRow.id);
    myLibrary = myLibrary.filter(Book => {
    return (Book.id !== id)   
    });
}


let tbody = document.getElementById("tbody");
const form = document.getElementById("form");

let newTrashcan;
function newRow(myBook) {
    let row = document.createElement("tr");
    row.classList.add("removeAll");
    row.id = myBook.id;

    let newTitle = document.createElement("td");
    row.appendChild(newTitle);
    newTitle.innerText = myBook.title;
    let newAuthor = document.createElement("td");
    row.appendChild(newAuthor);
    newAuthor.innerText = myBook.author;
    let newPages = document.createElement("td");
    row.appendChild(newPages);
    newPages.innerText = myBook.pages;
    let newStatus = document.createElement("td");
    row.appendChild(newStatus);
    newStatus.innerText = myBook.status;

    newTrashcan = document.createElement("td");
    newTrashcan.classList.add("remove");
    row.appendChild(newTrashcan);
    newTrashcan.innerHTML = '<button><img src="./img/trash.png"></button>';
    newTrashcan.id = myBook.id;
    tbody.appendChild(row);
    removeRows = document.querySelectorAll(".remove");

    removeRows.forEach(removeRow => {
        if(row.id == removeRow.id)
        removeRow.addEventListener("click", () => {
            removeFromLibrary(removeRow);
            redoId(removeRow);
            removeRow2(removeRow);
            //remakeRows();
            renameTrIds();
        }) 
    })

}

let myBook = "";


//////EVENT LISTENERS

submit.addEventListener("click", (e) => {
    e.preventDefault();
    getBookData();
    if(title.value != "") {
        resetForm();
        myBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);

        myLibrary.push(myBook);
        newRow(myBook);

        myBook = "";
    }
    
})

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
/////


/////////////////////////////////////////////////////////////////////
////////////////////////NEW//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/*
newRow cand adaugi o carte 
cand stergi o carte -> myLibrary sterge cartea aia 
                    -> fiecare carte de dupa isi schimba id (id-1)
                    -> se sterg toate randurile
                    -> se adauga din nou randurile de la myLibrary

                    */