function loadPi() {

    var digi = $('#floatingSelectGrid').val();
    var settings = {
        "url": "/loadPi",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "dig": digi,
          "edgeL": "10"
        }
    };
      
      $.ajax(settings).done(function (response) {
        $("#confirmBox").remove();
        $("#piButton").remove();
        $("#warning").remove();
        $("#warning2").remove();
        $("#warning3").remove();
        $("#warning4").remove();
        if (digi == "32K") {
          $("#piContainer").append(response);
        } else {
          splitRes = response.match(/.{2304}/g);
          console.log(splitRes[0]);
          for (let i = 0; i < splitRes.length; i++) {
            setTimeout(function() {
              $("#piContainer").append(splitRes[i]);
            }, 100);
          }
        }
      });
}