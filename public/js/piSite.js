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
        $("#piContainer").append(response);
        $("#confirmBox").remove();
        $("#piButton").remove();
        $("#warning").remove();
      });
}