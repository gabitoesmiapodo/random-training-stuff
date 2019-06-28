(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  const imgContainer = document.querySelector('#imgContainer');
  const textContainer = document.querySelector('#textContainer');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    textContainer.innerHTML = '<p>Loading article...</p>';
    imgContainer.innerHTML = '<p>Loading image...</p>';

    getImage(searchField.value);
    getArticle(searchField.value);
  });

  // articles code
  function getArticle(searchText) {
    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=${keys.NYT}`)
      .then(response => response.json())
      .then(addArticle)
      .catch(e => articlesRequestError(e, searchText));
  };

  function articlesRequestError(e, part) {
    console.error(e);
    imgContainer.innerHTML = `<p>There was a problem while searching for ${part} on NYT.</p>`;
  }

  function addArticle(data) {
    let articleHTML = '';

    if (data && data.response.docs.length) {
      articleHTML = `
        <h1>${data.response.docs[0].headline.main}</h1>
        <p>${data.response.docs[0].snippet}</p>
      `
    }
    else {
      articleHTML = '<p>No articles found...</p>'
    }

    textContainer.innerHTML = articleHTML;
  }

  // Images code
  function getImage(searchText) {
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchText}`, {
      headers: {
        Authorization: `Client-ID ${keys.PHOTOS}`
      }
    }).then(response => response.json())
      .then(addImage)
      .catch(e => imgRequestError(e, searchText));
  };

  function imgRequestError(e, part) {
    console.error(e);
    imgContainer.innerHTML = `<p>There was a problem while searching for ${part} on Unsplash.</p>`;
  }

  function addImage(data) {
    let imgHTML = '';

    if (data && data.total) {
      imgHTML = `<img src="${data.results[0].urls.regular}" />`
    }
    else {
      imgHTML = '<p>No images found...</p>'
    }

    imgContainer.innerHTML = imgHTML;
  };

})();
