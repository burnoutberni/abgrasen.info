'use strict';

$(document).ready(function() {
  var hashString = $(location).attr('hash').substring(1, $(location).attr('hash').length);
  if (window.location.href.indexOf('https://') >= 0) {
    var domainString = window.location.href.split('https://')[1];
  } else {
    var domainString = window.location.href.split('http://')[1];
  }
  if (domainString.split('.')[1] == 'abgrasen') {
    $.ajax({
      url:'img/'+domainString.split('.')[0]+'.jpg',
      type:'HEAD',
      success: function() {
        $('.site-wrapper').css("background", "url('img/"+domainString.split('.')[0]+".jpg') no-repeat center");
        $('.site-wrapper').css("background-size", "cover");
      }
    });
    switch (domainString.split('.')[0]) {
      case 'juli':
        $('#cc').html('CC-BY <a href="http://silsha.me">silsha</a>');
        $('#cc').show();
        break;
      case 'bennet':
        $('h1.cover-heading').html('BENNET, HOLEN!');
        $('#cc').html('CC-BY <a href="http://lutoma.org">lutoma</a>');
        $('#cc').show();
        break;
      case 'leo':
        $('h1.cover-heading').html('LEO, DU ALTER MANN!');
        $('#cc').html('Dein Geburtstag ist vorbei, bau jetzt endlich!');
        $('#cc').show();
        break;
      case 'kajsa':
        $('h1.cover-heading').html('Ach Kajsa! <3');
        break;
      case 'nini':
        $('#clickname').html('nini');
        $('#cc').html('CC-BY <a href="http://lutoma.org">lutoma</a>');
        $('#cc').show();
        break;
      default:
        $('#clickname').html(escape(domainString.split('.')[0]));
    }
  } else if (hashString.length > 1) {
    $('#clickname').html(escape(hashString));
  } else {
    $('.site-wrapper').css("background", "url('img/juli.jpg') no-repeat center");
    $('.site-wrapper').css("background-size", "cover");
    $('#cc').html('CC-BY <a href="http://silsha.me">silsha</a>');
    $('#cc').show();
  }
});
      
$('#clickname').click(function() {
  nameValue = $('#clickname').html();
  $('#nameinput').show().focus().css('width',$('#clickname').width()).val(nameValue);
  $('#clickname').hide();
  $('#nameinput').focusout(function() {
    if ($('#nameinput').val() !== '') {
      $('#clickname').html(escape($('#nameinput').val()));
      window.location.hash = escape($('#nameinput').val());
    }
    $('#copyinput input').val('http://'+window.location.hash.split('#')[1]+'.abgrasen.info');
    $('#nameinput').hide();
    $('#clickname').show();
    $('#copyinput').show();
  });

  $('#nameinput').keypress(function(e){
    if(e.keyCode==13) {
      if ($('#nameinput').val() !== '') {
        $('#clickname').html(escape($('#nameinput').val()));
        window.location.hash = escape($('#nameinput').val());
      }
      $('#copyinput input').val('http://abgrasen.info'+window.location.hash);
      $('#nameinput').hide();
      $('#clickname').show();
      $('#copyinput').show();
    }
  });
});