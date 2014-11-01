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

$(document).ready(function() {
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
//        shuffle(persons);
        loadedimage[k] = new Image();

        $(loadedimage[k]).attr('src','img/'+persons[k]+'.jpg').load(function() {
          $('#tile'+m).css('background-image','url('+this.src+')');
          $('#tile'+m).parent().attr('href','http://'+persons[m]+'.abgrasen.info');
          $('#tile'+m).animate({opacity:1},'slow');
          m++;
        });

      }


      setTimeout(function() {
        $('body').css("background","black");
        setInterval(function() {
          shuffle(persons);
          var j = Math.floor(Math.random() * 9);
          var loadedimage = new Image();
          $(loadedimage).attr('src','img/'+persons[j]+'.jpg').load(function() {
            $('#tile'+j).fadeTo('slow', 0.3, function() {
              $(this).css('background-image','url("img/'+persons[j]+'.jpg")');
            }).fadeTo('slow', 1);
          });
          $('#tile'+j).parent().attr('href','http://'+persons[j]+'.abgrasen.info');
        }, 1000);
      }, 5000);
    }
  });
});

$(window).on('resize', function(){
  $("#centeredDiv").css("top",($(window).height()-$("#centeredDiv").height())/2);
  $(".col-md-4").height($(window).height()/3);
});
