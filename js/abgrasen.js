'use strict';

$('#pause').click(function() {
  $('.audiocontrol').toggle();
  $('audio').trigger('pause');
  return false;
});
$('#play').click(function() {
  $('.audiocontrol').toggle();
  $('audio').trigger('play');
  return false;
});

var people = {
  'juli': {'cc': 'CC-BY <a href="http://silsha.me">silsha</a>'},
  'bennet': {'text': 'BACK MAL, BENNET!', 'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'kajsa': {'text': 'Ach Kajsa! <3', 'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'leo': {'text': 'LEO, DU ALTER MANN!', 'cc': 'Dein Geburtstag ist vorbei, bau jetzt endlich!'},
  'nini': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'paul': {'cc': 'CC-BY <a href="http://lutoma.org">lutoma</a>'},
  'eliška': {'cc': 'CC-BY <a href="http://nini.su">nini</a>'}
};

function checkBg() {
  if ($('#tile0').css('background-image') == $('#tile1').css('background-image') && $('#tile1').css('background-image') == $('#tile2').css('background-image')) {
    $('h1').html('GMAHDE WIESN');
  }
}

function pong() {
    // vary size for fun
    var divsize = ((Math.random()*100) + 50).toFixed();
    var newdiv = $('<div/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
        'font-size': '60px'
    }).html('pong');

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

    newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).fadeIn(100).delay(1000).fadeOut(500, function(){
      $(this).remove();
      pong();
    });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

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
        var jj = 3;
        var j = Math.floor(Math.random() * 3);
        setInterval(function() {
          while (j === jj) {
            j = Math.floor(Math.random() * 3)
          }
          jj = j;

          if(!allUsed) {
            var loadedimage = new Image();
            $(loadedimage).attr('src','img/'+persons[m]+'.jpg').load(function() {
              $('#tile'+j).fadeTo('slow', 0.3, function() {
                $(this).css('background-image','url("img/'+persons[m]+'.jpg")');
                $('#tile'+j).parent().attr('href','http://'+persons[m]+'.abgrasen.info');
              }).fadeTo('slow', 1);
            });
            m++;
            if(m+1 == persons.length) {
              allUsed = true;
            }
          } else {
            shuffle(persons);
            $('#tile'+j).fadeTo('slow', 0.3, function() {
              if ($(this).css('background-image') == 'url("http://abgrasen.info/img/'+persons[0]+'.jpg")') {
                $(this).css('background-image','url("img/'+persons[1]+'.jpg")');
              } else {
                $(this).css('background-image','url("img/'+persons[0]+'.jpg")');
              }
              checkBg();
              $('#tile'+j).parent().attr('href','http://'+persons[0]+'.abgrasen.info');
            }).fadeTo('slow', 1);
          }
        }, 3000);
      }, 5000);
    }
  });
};

$(document).ready(function() {
  var ssl = (window.location.href.indexOf('https://') >= 0);
  var domainString = punycode.decode(window.location.href.split(ssl ? 'https://' : 'http://')[1].split('.'));

  if (domainString.length < 3) {
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

  setTimeout(function() {
    setInterval(function() {
      $('#mainh1').toggle();
      $('#chopchop').toggle();
    }, 5000);
    setTimeout(function() {
      pong();
    }, 10000);
  }, 30000);

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
