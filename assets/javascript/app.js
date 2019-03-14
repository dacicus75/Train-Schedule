
//var trainArrival="";
//var trainMinutesAway="";

//var newTrainName =$("#train-name");
//var newTrainDestination = $("#train-destination");

//var newTrainTime = $("#train-time");//.mask("00");
//var newTimeFrequency =$("#time-frequency");//.mask("00");


  var config = {
    apiKey: "AIzaSyAMVNp3qqNJ9o40W-PodglEkmYyxMB6q9U",
    authDomain: "train-scheduler-d830b.firebaseapp.com",
    databaseURL: "https://train-scheduler-d830b.firebaseio.com",
    projectId: "train-scheduler-d830b",
    storageBucket: "train-scheduler-d830b.appspot.com",
    messagingSenderId: "156324044849"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

    var currentTime = moment().format();
        console.log("Current Time:" +currentTime);

    $("#click-button").on("click",function() {
        event.preventDefault();

        var trainName= $("#train-name").val().trim();  
            console.log(trainName);
        var trainDestination= $("#train-destination").val().trim(); 
            console.log(trainDestination); ;
        var trainTime= moment($("#train-time").val().trim(),"HH:mm").format("HH:mm");
            console.log(trainTime);
        var trainFrequency= moment($("#train-frequency").val().trim()).format("mm");
            console.log(trainFrequency);
        var trainFrequency= $("#train-frequency").val().trim();
            console.log(trainFrequency);

        var newTrainName = {
            name: trainName,
            destination: trainDestination,
            time:trainTime,
            frequency: trainFrequency 
        };
//pushing values into firebase
        database.ref().push(newTrainName);

//logging to see if values stored into firebase
        console.log(newTrainName.name);
        console.log(newTrainName.destination);
        console.log(newTrainName.time);
        console.log(newTrainName.frequency);

// Clear inputs
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");
        
        database.ref().on("child_added",function(childSnapshot){
            console.log(childSnapshot.val());

            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var trainTime = childSnapshot.val().time;
            var trainFrequency = childSnapshot.val().frequency;

            var trainTimeConvert = moment(trainTime,"HH:mm");

            var trainTimeDifference= moment().diff(moment(trainTimeConvert),"minutes");
                console.log(trainTimeDifference);

            var frequencyTime = childSnapshot.val().frequency;
                console.log("Frequency (min):" + frequencyTime);

            var minutesUntilTrainArrival= Math.abs(trainTimeDifference % trainTimeDifference);
                console.log("Minutes Away:" + minutesUntilTrainArrival);

            var nextTrainTime = moment().add(minutesUntilTrainArrival,"minutes").format("hh:mm A");
                console.log("Next Arrival" + nextTrainTime);
    

    $("#train-data >tbody").append(
        "<tr><td>" + trainName+ "</td>" +
        "<td>" + trainDestination + "</td>" +
        "<td>" + trainFrequency+ "</td>" +
        "<td>" + minutesUntilTrainArrival  +"</td>" +
        "<td>" + nextTrainTime + "" + "</td></tr>"
        );
    });
       
        // Link to open the modal 
        //<p><a href="#addedTrain" rel="modal:open">Open Modal</a></p>

    })
    
   

