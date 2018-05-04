/*--------------------
connect to firebase
------------------*/
var config = {
    apiKey: "AIzaSyDEao6uz6YVp7yIMsjhbgQK1fhqYmPBxZY",
    authDomain: "train-schedule-6d543.firebaseapp.com",
    databaseURL: "https://train-schedule-6d543.firebaseio.com",
    projectId: "train-schedule-6d543",
    storageBucket: "train-schedule-6d543.appspot.com",
    messagingSenderId: "364126499963"
};
firebase.initializeApp(config);

var database = firebase.database();
// end of firbase //

// create on click for add-train-btn
$("#add-train-btn").click(function (e) {
    e.preventDefault();
    // console.log("clicked");

    // create variables for userinput
    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var trainFirst = $('#first-train-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();


    // turn user input to an object
    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirst: trainFirst,
        trainFrequency: trainFrequency
    }


    var trainAdded = $("#newTrainRow").val().trim();

    database.ref().push(newTrain);

});

// get keys and values from firebase and push to document
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var train = snapshot.val();
    var stupidTrainMath = stupidTrain(train.trainFrequency, train.trainFirst);
    var tr = $("<tr>")
    var tdName = $("<td>").text(train.trainName);
    var tdDest = $("<td>").text(train.trainDestination);
    var tdFreq = $("<td>").text(train.trainFrequency);
    var tdArr = $("<td>").text(stupidTrainMath.trainMathFormatted);
    var tdAway = $("<td>").text(stupidTrainMath.trainAway);
    tr.append(tdName);
    tr.append(tdDest);
    tr.append(tdFreq);
    tr.append(tdArr);
    tr.append(tdAway);
    $("#newTrainRow").append(tr);
});

function stupidTrain(trainFrequency, trainFirst) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainFirstConverted = moment(trainFirst, "HH:mm A").subtract(1, "years");
    console.log(trainFirstConverted);

    // current time
    var currenttime = moment();
    console.log("Ticking " + moment(currenttime).format("hh:mm A"));

    // Difference between the times
    var diffTime = currenttime.diff(moment(trainFirstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var trainAway = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainAway);

    // Next Train
    var trainArrival = currenttime.add(trainAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainArrival).format("hh:mm"));

    var trainMathFormatted = moment(trainArrival).format("LLL");

    return {trainMathFormatted, trainAway};
};

