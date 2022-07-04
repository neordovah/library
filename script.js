const addBook = document.getElementById("addBook");
const submit = document.getElementById("submit");

let removeRows = [];
let changeStatus = [];
let changeStatusTd = [];

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
    let removeAllStatus = document.querySelectorAll(".status");
    let changeStatusTd = document.querySelectorAll(".statusTd");

    let number = 0;
    removeAll.forEach(removeRow => {
        removeRow.id = number;
        number++;
    });
    number = 0;
    removeAllCans.forEach(removeCan => {
        removeCan.id = number;
        number++;
    });
    number = 0;
    removeAllStatus.forEach(removeStatus => {
        removeStatus.id = number;
        number++;
    });
    number = 0;
    changeStatusTd.forEach(changeStatus => {
        changeStatus.id = number;
        number++;
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
        bookStatus = 0;
    } else if(status.value == "on-going") {
        bookStatus = 1;
    } else if(status.value == "finished") {
        bookStatus = 2;
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

function changeImage2(newStatus) {
    let id = newStatus.id;
    if(myLibrary[id].status == 0) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<img src="./img/x.png" width="30">';
    }
    else if(myLibrary[id].status == 1) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<img src="./img/arrow.png" width="30">';
    }
    else if(myLibrary[id].status == 2) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<img src="./img/v.png" width="30">';
    }
}

function changeImage(newStatus) {
    let id = newStatus.id;
    if(myLibrary[id].status == 0) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<button class="status" id="'+myLibrary[id].id+'"><img src="./img/x.png" width="30"></button>';
    }
    else if(myLibrary[id].status == 1) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<button class="status" id="'+myLibrary[id].id+'"><img src="./img/arrow.png" width="30"></button>';
    }
    else if(myLibrary[id].status == 2) {
        newStatus.innerHTML = "";
        newStatus.innerHTML = '<button class="status" id="'+myLibrary[id].id+'"><img src="./img/v.png" width="30"></button>';
    }
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
    newStatus.classList.add("statusTd");
    newStatus.id = myBook.id;
    changeImage(newStatus);
    row.appendChild(newStatus);


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
                renameTrIds();
            }) 
        })

        changeStatusTd = document.querySelectorAll(".statusTd");
        changeStatus = document.querySelectorAll(".status");

    changeStatus.forEach(oneStatus => {
        if(row.id == oneStatus.id) {
            oneStatus.addEventListener("click", () => {
                myLibrary[oneStatus.id].status++;
                if(myLibrary[oneStatus.id].status > 2) {
                    myLibrary[oneStatus.id].status = 0;
                }
                changeImage2(oneStatus);
            })
        }
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
