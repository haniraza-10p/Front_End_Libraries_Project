var url = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
var quoteArray = [];
var singleQuote = [];
var quoteCount = null;
var quoteIndex = null;
var tweetQuote = "";

(function ($) {
  $(document).ready(function () {
    $.getJSON(url, getQuote, 'jsonp');
  });

  $("#new-quote").click(function () {
    $.getJSON(url, getQuote, 'jsonp');
  });
  $("#tweet-quote").click(tweetToTwitter);

})(jQuery);

var getQuote = function (data) {
  if (quoteIndex < quoteCount - 1) {
    quoteIndex = quoteCount - 1;
  }

  if (!quoteIndex && !quoteCount) {
    quoteIndex = 0;
    quoteCount = 1;
  } else {
    quoteIndex++;
    quoteCount++;
  }
  $("#text").text(data.quoteText);

  if (data.quoteAuthor === '') {
    data.quoteAuthor = 'Unknown';
  }
  $("#author").text("- " + data.quoteAuthor);

  tweetQuote = data.quoteText + " - " + data.quoteAuthor;
  singleQuote = [data.quoteText, data.quoteAuthor, quoteIndex];
  quoteArray.push(singleQuote);
};

function tweetToTwitter() {
  var encodedPhrase = encodeURIComponent(tweetQuote);
  var url = "https://twitter.com/intent/tweet?text=" + encodedPhrase;
  window.open(url);
};