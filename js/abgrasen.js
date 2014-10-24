'use strict';

var people = {
  'juli': {'cc': 'CC-BY <a href="http://silsha.me">silsha</a>'},
  'bennet': {'text': 'BENNET, HOLEN!', 'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'kajsa': {'text': 'Ach Kajsa! <3'},
  'leo': {'text': 'LEO, DU ALTER MANN!', 'cc': 'Dein Geburtstag ist vorbei, bau jetzt endlich!'},
  'nini': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'}
};

$(document).ready(function() {

  var hashString = $(location).attr('hash').substring(1, $(location).attr('hash').length);
  var ssl = (window.location.href.indexOf('https://') >= 0);
  var domainString = window.location.href.split(ssl ? 'https://' : 'http://')[1].split('.');

  // Default person name
  var personName = 'juli';

  if (domainString.length > 2) {
    // We have a name subdomain.
    personName = domainString[0];
  }

  $('h1.cover-heading').html(personName);

  // Only continue if more details on person available
  if (!personName in people) {
    return;
  }

  // Try loading image
  $.ajax({
    url:'img/' + personName + '.jpg',
    type:'HEAD',
    success: function() {
      $('.site-wrapper').css("background-image", "url('img/" + personName + ".jpg')");
      $('.site-wrapper').addClass('has-image');
    }
  });

  var person = people[domainString[0]];

  if ('text' in person) {
    $('h1.cover-heading').html(person['text']);
  }

  if ('cc' in person) {
    $('#cc').html(person['cc']);
    $('#cc').show();
  }  
});
