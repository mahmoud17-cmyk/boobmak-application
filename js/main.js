document.getElementById("myform").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!siteName || !siteUrl) {
    alert("please fill the form");
    return false;
  }

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Invalid Url");
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  fetchBookmarks();
  e.preventDefault();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  var bookmarksResults = document.getElementById("bookmarksResults");
  bookmarksResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      `<div class="well">` +
      `<h3>` +
      name +
      '<a class="btndefault" target="_blank" href="' +
      url +
      '">visit</a>' +
      "<a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btndanger" href="#">Delete</a>' +
      `</h3>` +
      `</div>`;
  }
}
fetchBookmarks();

function validateForm(siteName, siteUrl) {}
