window.onload=function() {
  var add = document.getElementById('add');
  var change = document.getElementById('change');
  var boxWrapper = document.getElementById('box-wrapper');
  var randomBox = document.getElementsByClassName('random-box');
  // 어떤 박스도 이 이상 index값을 가지지 못함 ++로 단계 상승
  var maxZindex = randomBox.length;


  // border size => 2 + a
  var limitedWidth = boxWrapper.clientWidth - randomBox[0].clientWidth - 5;

  var limitedHeight = boxWrapper.clientHeight - randomBox[0].clientHeight - 5;

  // make random color
  function makeRandomColor() {
    var hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color = '#';

    for(var i=0; i<6; i++) {
      color += hex[Math.floor(Math.random()*16)];
    }
    return color;
  }

  // set random position & random colors
  for(var i=0; i<randomBox.length; i++) {
    var widthPosition = Math.random()*limitedWidth;
    var heightPosition = Math.random()*limitedHeight;
    var zIndex = Math.floor(Math.random()*randomBox.length);
    var color = makeRandomColor();

    randomBox[i].style.top = heightPosition + 'px';
    randomBox[i].style.left = widthPosition + 'px';
    randomBox[i].style.zIndex = zIndex;
    randomBox[i].style.backgroundColor = color;
  }

  // add button
  add.addEventListener('click', function() {
    var newBox = document.createElement('div');
    var widthPosition = Math.random()*limitedWidth;
    var heightPosition = Math.random()*limitedHeight;
    var zIndex = Math.floor(Math.random()*randomBox.length);
    var color = makeRandomColor();

    newBox.style.top = heightPosition + 'px';
    newBox.style.left = widthPosition + 'px';
    newBox.style.zIndex = zIndex;
    newBox.style.backgroundColor = color;
    newBox.classList.add('random-box');

    newBox.addEventListener('dblclick', function() {
      boxWrapper.removeChild(this);
    });

    newBox.addEventListener('click', function() {
      this.style.zIndex = maxZindex++;
    });

    boxWrapper.append(newBox);
  });

  // change button
  change.addEventListener('click', function() {
    for(var i=0; i<randomBox.length; i++) {
      var color = makeRandomColor();
      randomBox[i].style.backgroundColor = color;
    }

  });

  // box click events
  for(var i=0; i<randomBox.length; i++) {
    randomBox[i].addEventListener('dblclick', function() {
      boxWrapper.removeChild(this);
    });
  }

  for(var i=0; i<randomBox.length; i++) {
    randomBox[i].addEventListener('click', function() {
      this.style.zIndex = maxZindex++;
    });
  }


}
