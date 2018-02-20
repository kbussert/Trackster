var Trackster = {};
var resultList = [];
const API_KEY = 'ddbd4a3a6b3ba37ab383fea36e10b68c';
$(document).ready(function() {
  $('#searchMusic').keydown(function(event){
    if (event.which == 13) {
        Trackster.searchTracksByTitle($('#searchMusic').val());
     }
  });

  $('#search').click(function(){
    Trackster.searchTracksByTitle($('#searchMusic').val());
  });

  $('#artist').click(function(){
    sortResults('artist', true);
  });

  $('#song-header').click(function(){
    sortResults('name', true);
  });

  $('#listeners').click(function(){
    sortNumResults('listeners', true);
  });

  function sortResults(prop, asc) {
    resultList = resultList.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
    Trackster.renderTracks(resultList);
  };

  function sortNumResults(prop, asc) {
    resultList = resultList.sort(function(a, b) {
        if (asc) {
            return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : ((parseInt(a[prop]) < parseInt(b[prop])) ? -1 : 0);
        } else {
            return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : (parseInt((b[prop]) < parseInt(a[prop])) ? -1 : 0);
        }
    });
    Trackster.renderTracks(resultList);
  };

});
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  resultList = tracks;
  // var trackDetails;
  $('#track-list').empty();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    var mediumAlbumArt = track.image[1]["#text"];
    var trackHtml =
      '<div class="row col-sm-12" id="track-list-row">' +
        '<p class="col-sm-1 col-sm-offset-1 col-xs-1">' +
          '<a target="_blank" href=' + track.url + '>' +
            '<i class="far fa-play-circle fa-2x" id="play-icon"></i>' +
          '</a>' +
        '</p>' +
        '<p class="col-sm-4 col-xs-4">' + track.name + '</p>' +
        '<p class="col-sm-2 col-xs-4">' + track.artist + '</p>' +
        '<div class="col-sm-2 col-xs-2" id="album-art"><img src="' + mediumAlbumArt + '"/></div>' +
        '<p class="col-sm-2 col-xs-3">' + numeral(track.listeners).format(0,0) + '</p>' +
      '</div>';

    $('#track-list').append(trackHtml);

  }
}

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  setTimeout(function(){
      $('#titleText').addClass('shimmer');
  }, 1);

  $.ajax({
      url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
      success: function(response) {
              setTimeout(function(){
                $('#titleText').removeClass('shimmer');
                Trackster.renderTracks(response.results.trackmatches.track);
             }, 650);
            }
          })
};
