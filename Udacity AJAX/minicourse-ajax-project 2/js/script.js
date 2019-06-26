function loadData() {
  const $body = $('body');
  const $wikiElem = $('#wikipedia-links');
  const $nytElem = $('#nytimes-articles');

  // clear out old data before new request
  $nytElem.html('<p>Loading...</p>');
  $wikiElem.html('<p>Loading...</p>');

  const streetStr = $('#street').val();
  const cityStr = $('#city').val();
  const address = streetStr + ', ' + cityStr;

  // load streetview
  const googleMapsAPIKey = 'AIzaSyALgP7REDUiQRE4X0FSiqfB4B7HBEEVA7U';
  const googleMapsAPI = 'https://maps.googleapis.com/maps/api/staticmap?';
  const googleMapsURL = `${googleMapsAPI}key=${googleMapsAPIKey}&size=600x400&location=${address}&center=51.477222,0&zoom=10`;

  // Won't work, you have to pay, I won't pay
  $body.append('<img class="bgimg" src="' + googleMapsURL + '">');

  // load nytimes
  const nytAPI = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  const nytAPIKey = 'P3A7Alf0eJIb1ezPF2zeoLm3MaKERo3x';
  const nytAPIQuery = `${nytAPI}q=${cityStr}&api-key=${nytAPIKey}`;

  $.getJSON(
    nytAPIQuery
    , () => {})
  .done((data) => {
    const articles = data.response.docs.map((item, index) => {
      return `
        <li class="article"><a href="${item.web_url}" target="_blank">${item.headline.main}</a></li>
      `;
    });

    $nytElem.html(articles);
  })
  .fail((e) => {
    $nytElem.html('NYT Error!: ' + e.statusText);
  })
  .error((e) => {
    console.error('NYT Error!');
  });

  // wikipedia
  const wikiAPI = 'https://www.mediawiki.org/w/api.php';
  const wikiAPIQuery = `${wikiAPI}`;

  $.ajax(wikiAPIQuery, {
    dataType: "jsonp",
    data: {
      format: "json",
      action: "query",
      list: "search",
      srlimit: 10,
      srsearch: cityStr,
  },
    success: (data) => {
      const articles = data.query.search.map((item, index) => {
        return `
          <li class="article"><a href="https://es.wikipedia.org/w/index.php?oldid=${item.pageid}" target="_blank">${item.title}</a></li>
        `;
      });

      $wikiElem.html(articles);
    },
    error: (e) => {
      console.log("Wikie ERROR!")
      console.dir(e);
    }
  });

  return false;
}

$('#form-container').submit(loadData);
