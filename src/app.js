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

  let page = urlParams.get("page");

  return page;
}

async function getBooksData() {
  let response = await fetch("./data.json");
  let json = await response.json();
  return json["books"];
}

/**
 * To get books data, you should make sure that your function is async function
 * and call `getBooksData` function with await.
 *
 * e.g.
 * async function yourFunction() {
 *      let books = await getBooksData();
 * }
 */
