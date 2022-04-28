var firebaseConfig = {
  apiKey: "AIzaSyBzTz1ImOmuRkoi_2ZrAs3VWtRLQRRK7Q0",
  authDomain: "kwitterfire.firebaseapp.com",
  databaseURL: "https://kwitterfire-default-rtdb.firebaseio.com",
  projectId: "kwitterfire",
  storageBucket: "kwitterfire.appspot.com",
  messagingSenderId: "889477099527",
  appId: "1:889477099527:web:7fcf8b6bafab5929d4baa2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "Minecraft,Roblox"
  })
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      //Start code
      row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div></hr>";
      document.getElementById("output").innerHTML += row;
      //End code
    });
  });
}
getData();

function redirectToRoomName(name) {
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html"
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}