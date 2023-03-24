const searchForm = document.getElementById("search-form");
const searchList = document.getElementById("search-list");
const bookContainer = document.getElementById("bookContainer");

async function getBooksData() {
  let response = await fetch("./data.json");
  let json = await response.json();
  return json["books"];
}

function toggleMenuButton() {
  const menu = document.getElementById("m-menu");
  const buttonChildren = document.getElementById("m-menu-button").children;

  if (menu.classList.contains("hidden")) {
    menu.classList.replace("hidden", "block");
    buttonChildren[1].classList.replace("block", "hidden");
    buttonChildren[2].classList.replace("hidden", "block");
  } else {
    menu.classList.replace("block", "hidden");
    buttonChildren[1].classList.replace("hidden", "block");
    buttonChildren[2].classList.replace("block", "hidden");
  }
}

function getPageFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let page = Number(urlParams.get("Page"));

  return page;
}

async function searchBooks(e) {
  e.preventDefault();

  const books = await getBooksData();
  const value = document.getElementById("search").value.toLowerCase();

  if (value.length < 2) {
    searchList.innerHTML = "";
    searchList.classList.add("hidden");
  } else {
    searchList.innerHTML = "";
    searchList.classList.remove("hidden");
  
    books.forEach((book) => {
      const title = book.title.toLowerCase();
      const authors = book.authors.join(", ").toLowerCase();
      const subjects = book.subjects.join(", ").toLowerCase();
  
      if (title.includes(value) || authors.includes(value) || subjects.includes(value)) {
        let htmlData = `
          <div class="rounded-lg border border-gray-700 transition-all hover:bg-gray-700">
            <a href="#" class="flex flex-col items-center p-4 md:flex-row">
              <img class="h-72 object-cover object-center mb-4 rounded-lg md:h-40 md:w-24 lg:h-48 lg:w-32" src="${book.image}" alt="${book.title}" />
              <div class="p-5 text-center sm:text-left">
                <h4 class="mb-2 text-2xl font-bold text-white cursor-pointer">${book.title}</h4>
                <p class="mb-2 text-gray-500">
                  <strong>Author(s): </strong>
                  ${book.authors.join(", ")}
                </p>
              </div>
            </a>
          </div>
        `;
        searchList.innerHTML += htmlData;
      }
    });
  }
}

async function loadBooks() {
  const books = await getBooksData();
  let urlPage = getPageFromUrl();

  if (urlPage === 0) {
    urlPage = 1;
  }

  books.slice(12 * (urlPage - 1), 12 * urlPage).forEach((book) => {
    let htmlData = `
      <div class="flex flex-col items-center border rounded-lg border-gray-700 group transition-all hover:bg-slate-700 hover:scale-105 hover:shadow-xl">
        <img class="h-72 object-contain object-center cursor-pointer rounded-lg" src="${
          book.image
        }" alt="${book.title}" />
        <div class="p-5 text-center">
          <h4 class="mb-2 text-2xl font-bold text-white cursor-pointer">${
            book.title
          }</h4>
          <p class="mb-2 text-gray-500">
            <strong>Author(s): </strong>
            ${book.authors.join(", ")}
          </p>
        </div>
      </div>
    `;
    bookContainer.innerHTML += htmlData;
  });
}

function previousPage() {
  let urlPage = getPageFromUrl();

  if (urlPage === 0) {
    urlPage = 1;
  }

  if (urlPage === 2) {
    window.location.replace("?Page=1");
  } else {
    window.location.reload();
  }
}

function nextPage() {
  let urlPage = getPageFromUrl();

  if (urlPage === 0) {
    urlPage = 1;
  }

  if (urlPage === 1) {
    window.location.replace("?Page=2");
  } else {
    window.location.reload();
  }
}

searchForm.addEventListener("submit", searchBooks);
