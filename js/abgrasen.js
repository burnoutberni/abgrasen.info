'use strict';

var people = {
  'juli': {'cc': 'CC-BY <a href="http://silsha.me">silsha</a>'},
  'bennet': {'text': 'BENNET, HOLEN!', 'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'kajsa': {'text': 'Ach Kajsa! <3', 'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'leo': {'text': 'LEO, DU ALTER MANN!', 'cc': 'Dein Geburtstag ist vorbei, bau jetzt endlich!'},
  'nini': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'else': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'paul': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'}
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var showOverview = function() {
  $('#bauen').hide();
  $('#overview').show();
  $('#centeredDiv').show();
  $('.site-wrapper').animate({opacity: 1}, { duration: 600, queue: false });

  $("#centeredDiv").css("top",($(window).height()-$("#centeredDiv").height())/2);
  $(".col-md-4").height($(window).height()/3);

  var persons = [];

  //Find all img-files with Apaches index site
  $.ajax({
    url: "img/",
    success: function(data){
      var i = 0;
      $(data).find("td > a").each(function(){
        if($(this).attr("href").indexOf(".jpg") >= 0) {
          var newPerson = $(this).attr("href").split('.jpg')[0];
          persons.push(newPerson);
          i++;
        }
      });
    },
    complete: function() {
      var loadedimage = [];
      var m = 0;
      for(var k=0; k < 9; k++) {
        loadedimage[k] = new Image();

        $(loadedimage[k]).attr('src','img/'+persons[k]+'.jpg').load(function() {
          $('#tile'+m).css('background-image','url('+this.src+')');
          $('#tile'+m).parent().attr('href','http://'+persons[m]+'.abgrasen.info');
          $('#tile'+m).animate({opacity:1},'slow');
          m++;
        });

      }

      var allUsed = false;

      setTimeout(function() {
        $('body').css("background","black");
        setInterval(function() {
          var j = Math.floor(Math.random() * 9);
          if(!allUsed) {
            var loadedimage = new Image();
            $(loadedimage).attr('src','img/'+persons[m]+'.jpg').load(function() {
              $('#tile'+j).fadeTo('slow', 0.3, function() {
                $(this).css('background-image','url("img/'+persons[m]+'.jpg")');
                $('#tile'+j).parent().attr('href','http://'+persons[m]+'.abgrasen.info');
              }).fadeTo('slow', 1);
            });
            console.log(m+'/'+persons.length+': '+persons[m]);
            m++;
            if(m+1 == persons.length) {
              allUsed = true;
            }
          } else {
            shuffle(persons);
            $('#tile'+j).fadeTo('slow', 0.3, function() {
              $(this).css('background-image','url("img/'+persons[0]+'.jpg")');
              $('#tile'+j).parent().attr('href','http://'+persons[0]+'.abgrasen.info');
            }).fadeTo('slow', 1);
            console.log(m+'x/'+persons.length+': '+persons[0]);
          }
        }, 3000);
      }, 5000);
    }
  });
};

$(document).ready(function() {
  var hashString = $(location).attr('hash').substring(1, $(location).attr('hash').length);
  var ssl = (window.location.href.indexOf('https://') >= 0);
  var domainString = window.location.href.split(ssl ? 'https://' : 'http://')[1].split('.');

  if (domainString.length < 3) {
    // We don't have a name subdomain, redirect to default
    //window.location.replace('http://juli.abgrasen.info');
    showOverview();
    return;
  }

  var personName = domainString[0];
  $('#name').html(personName);

  // Try loading image
  $.ajax({
    url:'img/' + personName + '.jpg',
    type:'HEAD',
    success: function() {
      $('.site-wrapper').css("background-image", "url('img/" + personName + ".jpg')");
      $('.site-wrapper').addClass('has-image');
    },
    complete: function() {
      $('.site-wrapper').animate({opacity: 1}, { duration: 600, queue: false });
    }
  });

  setInterval(function() {
    $('#mainh1').toggle();
    $('#chopchop').toggle();
  }
  , 5000);

  // Only continue if more details on person available
  if (!(personName in people)) {
    $('title').html(personName.toUpperCase()+', BAUEN!!!');
    return;
  }

  var person = people[personName];

  if ('text' in person) {
    $('h1.cover-heading').html(person['text']);
    $('title').html(person['text']);
  } else {
    $('title').html(personName.toUpperCase()+', BAUEN!!!');
  }

  if ('cc' in person) {
    $('#cc').html(person['cc']);
    $('#cc').show();
  }  
});

$(window).on('resize', function(){
  $("#centeredDiv").css("top",($(window).height()-$("#centeredDiv").height())/2);
  $(".col-md-4").height($(window).height()/3);
});
