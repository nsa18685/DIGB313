$(document).ready(function() {
  var str = 'Semi Data Analyst';
  var idx = 0;
  var title = '';
  setInterval(function() {
    title += str.charAt(idx) + '_';
    idx++;
    $("#main-title").html(title);
    title = title.substr(0, title.length-1);
    if(idx === str.length) {
      idx = 0;
      title = '';
    }
  }, 300);

  var maxHeight = 0;
  $(window).scroll(function() {
    var scrollHeight = $(window).scrollTop();
    var scrollPoint = $("#scroll-target").offset().top;
    if(scrollHeight >= scrollPoint - 450 && scrollHeight > maxHeight) {
      maxHeight = 100000;
      return countUp();
    }
  });

  function countUp() {
    var age = 0;
    var sal = 0;
    var date = 1460;

    var timer1 = setInterval(function() {
      if(age===24) {
        return clearInterval(timer1);
      }
      age += 1;
      $("#age").html(age);
    }, 30);

    var timer2 = setInterval(function() {
      if(sal>=4500) {
        clearInterval(timer2);
        return $("#sal").html(4500);
      }
      sal += parseInt(Math.random()*80);
      $("#sal").html(sal);
    }, 10);

    var timer3 = setInterval(function() {
      if(date <= 150) {
        clearInterval(timer3);
        return $("#date").html(150);
      }
      date -= parseInt(Math.random()*50);
      $("#date").html(date);
	  }, 20);
  }

  document.querySelector("#requestData").addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        var obj = JSON.parse(xhr.responseText);
        var title = obj.title;
        var contents = obj.contents;
        var heading = '<h1>' + title + '</h1>'
        var bodies = '';
        for(var item of contents) {
          bodies += '<p>' + item + '</p>';
        }
        document.querySelector('#response-title').innerHTML = heading + bodies;
      }
    }
    xhr.open('GET', '../html/resumeData.json', true);
    xhr.send()
    // $.ajax({
    // 	url: '../html/resumeData.json',
    // 	success: function(data) {
    // 		$("#response-title > h1").remove();
    // 		$("#res-contents").html('');
    // 		$("#response-title").prepend(data.heading);
    // 		var body = data.body;
    // 		for(var i in body) {
    // 				$("#res-contents").append(body[i]);
    // 			}
    // 	},
    // 	error: function(err){
    // 		console.log(err);
    // 	}
    // })
  });

  var resArr = [];
  $("#movieBtn").click(function() {
    var date = $("#searchDate").val();
    date = date.substr(0,4)+date.substr(5,2)+date.substr(8,2);
    $.ajax({
      url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json',
      data: {
        key: '5b2d0599ab25be304afb9a67caf40190',
        targetDt: date,
        weekGb: '0',
        itemPerPage: 3,
        repNationCd: 'K'
      },
      async: false,
      success:function(data) {
        var lists = data.boxOfficeResult.weeklyBoxOfficeList;
        for(var item of lists) {
          $("#rank").append('<p class="media-fs">'+item.rank+'</p>');
          $("#movieNm").append('<p class="media-fs">'+item.movieNm+'</p>');
          $("#acc").append('<p class="media-fs">'+item.audiAcc+'</p>');
          $("#openDt").append('<p class="media-fs">'+item.openDt+'</p>');
        }
      }
    });
  
  });
});
