(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    showImage(searchField.value);
    showArticles(searchField.value);
  });

  // articles code
  function showArticles(searchText) {
    const articleRequest = new XMLHttpRequest();

    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=${keys.NYT}`);
    articleRequest.send();
  }

  function addArticles() {
    const data = JSON.parse(this.responseText)
    let artHTML = '';

    console.log(data);
    if (data.response.docs.length) {
      artHTML = `
        <h1>${data.response.docs[0].headline.main}</h1>
        <p>${data.response.docs[0].snippet}</p>
      `
    }
    else {
      artHTML = '<p>No articles found...</p>'
    }

    responseContainer.insertAdjacentHTML('beforeend', artHTML);
  }

  // Images code
  function showImage(searchText) {
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchText}`);
    unsplashRequest.setRequestHeader('Authorization', `Client-ID ${keys.PHOTOS}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.send();
  };

  function addImage() {
    const data = JSON.parse(this.responseText)
    let imgHTML = '';

    if (data.total) {
      imgHTML = `<img src="${data.results[0].urls.regular}" />`
    }
    else {
      imgHTML = '<p>No images found...</p>'
    }

    responseContainer.insertAdjacentHTML('beforeend', imgHTML);
  };

})();
