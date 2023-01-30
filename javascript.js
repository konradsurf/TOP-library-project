let myLibrary = [];

//--------- test data --------------
myLibrary[0] = new Book("Outliers", "Malcolm Gladwell", 234, true);
myLibrary[1] = new Book("Sermont on the Mount", "Emmet Fox", 148, true);
myLibrary[2] = new Book(
  "A brief History of Time",
  "Stephen Hawking",
  492,
  false
);
myLibrary[3] = new Book("Talking to Strangers", "Malcolm Gladwell", 284, false);

// display pre-populated books
displayBooks(myLibrary); // new list with above book added

// form submit listener
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  // validation - turn this into a separate function once it's working
  if (title == "" || author == "" || pages == "") {
    alert("Please fill out all required fields");
    return;
  } else {
    addBookToLibrary(title, author, pages, read);
    clearInputs();
  }
});



//---------FUNCTIONS------------------

// book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.readStatus = function () {
    return `${this.read ? "Has been read" : "Not read yet"}`;
  };
}

/* receive array of book objects and call functions that display 
them in tiles on the screen (for now it just console logs them) */
function displayBooks(libraryArray) {
  removeCards();
  libraryArray.forEach((element, i) => displayBookInUI(element, i));
  addDeleteBtnListener(libraryArray);
  addReadBtnListener(libraryArray);
}

/* receive data for one book and display it in a list 
will then update to a table or cards */
function displayBookInUI(bookInfo, i) {
  // create div for container
  let bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.setAttribute("id", i);
  document.getElementById("libraryList").appendChild(bookCard);
  // create card content elements
  let titleLabel = document.createElement("p");
  let bookCardTitle = document.createElement("p");
  let authorLabel = document.createElement("p");
  let bookCardAuthor = document.createElement("p");
  let pagesLabel = document.createElement("p");
  let bookCardPages = document.createElement("p");
  let readLabel = document.createElement("p");
  let bookCardRead = document.createElement("p");
  let deleteButton = document.createElement("button");
  let readButton = document.createElement("button");
  //title label and title info
  titleLabel.classList.add("title-label");
  bookCard.appendChild(titleLabel);
  titleLabel.textContent = "Title:";
  bookCardTitle.classList.add("card-title");
  bookCard.appendChild(bookCardTitle);
  bookCardTitle.textContent = bookInfo.title;
  //author label and author info
  authorLabel.classList.add("author-label");
  bookCard.appendChild(authorLabel);
  authorLabel.textContent = "Author:";
  bookCard.appendChild(bookCardAuthor);
  bookCardAuthor.textContent = bookInfo.author;
  // pages label and pages info
  pagesLabel.classList.add("pages-label");
  bookCard.appendChild(pagesLabel);
  pagesLabel.textContent = "Pages:";
  bookCard.appendChild(bookCardPages);
  bookCardPages.textContent = bookInfo.pages;
  // read status label and status info
  readLabel.classList.add("read-label");
  bookCard.appendChild(readLabel);
  readLabel.textContent = "Read status:";
  bookCard.appendChild(bookCardRead);
  bookCardRead.textContent = bookInfo.readStatus(); 
  // add delete button
  deleteButton.classList.add("delete-btn");
  bookCard.appendChild(deleteButton);
  deleteButton.textContent = "Delete Book";
  deleteButton.setAttribute("id", i);
  // add read status change button
  readButton.classList.add("read-btn");
  bookCard.appendChild(readButton);
  readButton.textContent = "Change Read Status";
  readButton.setAttribute("id", i);
}

// receive book data and add it to the myLibrary array as an object
/* submit button hit, data in input boxes provided, 
add it to the end of the array
to start, we're just gonna have it receive info from one input box 
and console log it, then we'll have it return it to a cons*/
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks(myLibrary);
}

/* clears the input boxes */
function clearInputs() {
  document.getElementById("title").value = null;
  document.getElementById("author").value = null;
  document.getElementById("pages").value = null;
  document.getElementById("read").checked = false;
}

// each card's delete button listener
function addDeleteBtnListener(array) {
  let deleteBtns = document.getElementsByClassName("delete-btn");
  Array.from(deleteBtns).forEach((btn) => {
    btn.addEventListener("click", () => removeBook(btn.id, array));
  });
}

// each card's change-read-status button listener
function addReadBtnListener(array) {
  let readBtns = document.getElementsByClassName("read-btn");
  Array.from(readBtns).forEach((btn) => {
    btn.addEventListener("click", () => toggleReadStatus(btn.id, array));
  });
}

/* removes list/cards of books from user view - 
primarily used when refreshing the view after adding
or deleting a book from myLibrary */
function removeCards() {
  document.querySelectorAll(".card").forEach((element) => element.remove());
}

// remove i'th element from array, delete list in UI and redisplay it
function removeBook(i, libraryArray) {
  libraryArray.splice(i, 1);
  displayBooks(libraryArray);
}

function toggleReadStatus(i, libraryArray) {
  libraryArray[i].read ? libraryArray[i].read = false : libraryArray[i].read = true;
  displayBooks(libraryArray);
}
