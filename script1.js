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
}



function removeRow(row) {
    id = row.id;
    let removeRow = document.getElementById(`${id}`);
    removeRow.remove();
}

function addRow(row) {
    id=row.id;
    let addRow = document.getElementById(`${id}`);
    newRow(row);
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

let tbody = document.getElementById("tbody");
const form = document.getElementById("form");

let newTrashcan;
function newRow(c) {
    let row = document.createElement("tr");

   // row.id = myLibrary.length-1;
   row.id = c;

   console.log(myLibrary[0])

    let newTitle = document.createElement("td");
    row.appendChild(newTitle);
    newTitle.innerText = myLibrary[c].title;
    let newAuthor = document.createElement("td");
    row.appendChild(newAuthor);
    newAuthor.innerText = myLibrary[c].author;
    let newPages = document.createElement("td");
    row.appendChild(newPages);
    newPages.innerText = myLibrary[c].pages;
    let newStatus = document.createElement("td");
    row.appendChild(newStatus);
    newStatus.innerText = myLibrary[c].status;
    
    function removeFromLibrary(row) {
        let id = row.id;
        myLibrary.splice(id, 1);  
    }

    newTrashcan = document.createElement("td");
    newTrashcan.classList.add("remove");
    row.appendChild(newTrashcan);
    newTrashcan.innerHTML = '<button><img src="./img/trash.png"></button>';
    newTrashcan.id = c;
    tbody.appendChild(row);
   

     removeRows = document.querySelectorAll(".remove");
for(let a = 0; a < removeRows.length; a++) {
       // if(removeRows[a].id == row.id)
          removeRows[a].addEventListener("click", () => {
            removeFromLibrary(row);     
            
            for(let b = a; b < myLibrary.length; b++) {
                removeRow(row);
           }
           for(let c = a; c < myLibrary.length; c++) {
            addRow(c);
           }
            
    })
    }

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
        newRow(myLibrary.length-1);
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
