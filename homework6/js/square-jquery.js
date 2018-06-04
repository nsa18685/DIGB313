$(document).ready(function() {
  var $add = $("#add");
  var $change = $("#change");
  var $boxWrapper = $("#box-wrapper");
  var $randomBox = $(".random-box");
  var currIndex = $randomBox.length;
  var maxWidth = $boxWrapper.width() - $randomBox.width() - 5;
  var maxHeight = $boxWrapper.height() - $randomBox.height() - 5;
  var dragState = false;
  var $target = null;

  displayBox($randomBox, maxWidth, maxHeight);

  initBoxEvent($boxWrapper, currIndex);

  $add.click(function() {
    var $newBox = $("<div></div>");

    displayBox($newBox, maxWidth, maxHeight);

    $newBox.addClass('random-box');

    $boxWrapper.append($newBox);

    initBoxEvent($boxWrapper, currIndex);
  });

  $change.click(function() {
    for(var i=0; i<$(".random-box").length; i++) {
      var color = getRandomColor();
      $(".random-box")[i].style.backgroundColor = color;
    }
  });

  function initBoxEvent($boxWrapper, currIndex) {
    for(var i=0; i<$(".random-box").length; i++) {
      $($(".random-box")[i]).dblclick(function(e) {
        e.stopPropagation();
        $(this).remove();
      });
    }

    for(var i=0; i<$(".random-box").length; i++) {
      $($(".random-box")[i]).click(function(e) {
        e.stopPropagation();
        $(this).css('zIndex', currIndex++);
      });
    }

    for(var i=0;i<$(".random-box").length; i++) {
      $($(".random-box")[i]).mousedown(function(e) {
        e.stopPropagation();
        dragState = true;
        $target = $(this);
        $target.mousemove(function(e) {
          if(dragState) {
            e.stopPropagation();
            var x = e.pageX - $("#box-wrapper").offset().left - $target.width()/2;
            var y = e.pageY - $("#box-wrapper").offset().top - $target.height()/2;
            $target.css({
              left: x,
              top: y
            });
          }
        });
      });
    }

    for(var i=0; i< $(".random-box").length; i++) {
      $($(".random-box")[i]).mouseup(function(e) {
        e.stopPropagation();
        dragState = false;
        $target = null;
      });
    }
  }

  function displayBox($randomBox, maxWidth, maxHeight) {
    for(var i=0; i<$randomBox.length; i++) {
      var widthPosition = Math.random()*maxWidth;
      var heightPosition = Math.random()*maxHeight;
      var zIndex = Math.floor(Math.random()*$randomBox.length);
      var color = getRandomColor();

      $($randomBox[i]).css({
        top: heightPosition + 'px',
        left: widthPosition + 'px',
        zIndex: zIndex,
        backgroundColor: color
      });
    }
  }

  function getRandomColor() {
    var hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color = '#';

    for(var i=0; i<6; i++) {
      color += hex[Math.floor(Math.random()*16)];
    }
    return color;
  }

});
