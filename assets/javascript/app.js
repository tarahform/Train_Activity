/*--------------------
  Global Variables
  ------------------*/



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

/*--------------------
   Functions
------------------*/
$("#add-train-btn").click(function (e) {
    e.preventDefault();
    console.log("clicked");

    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var trainFirst = $('#first-train-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();
    console.log('TRAINNAME: ' + trainName);

    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirst: trainFirst,
        trainFrequency: trainFrequency
    }

    database.ref().push(newTrain);

});

/*--------------------
push userinput to table
------------------*/



// look this up!
// ref.addChildEventListener(new ChildEventListener() {
//     onChildAdded(DataSnapshot, dataSnapshot, String prevChildKey) {
//         Post newPost = dataSnapshot.getValue(Post.class);
//         System.out.println("Author: " + newPost.author);
//         System.out.println("Title: " + newPost.title);
//         System.out.println("Previous Post ID: " + prevChildKey);
//     }

// database.ref().on("value", function (snapshot) {
//     console.log(snapshot.val());
//     $("#newTrainRow").text(snapshot.val().newTrain);
//     trainAdded = snapshot.val().newTrain;
// });

// $("#add-train-btn").on("click", function() {
// database.ref().set({
//     newTrain: trainAdded
// });
// });