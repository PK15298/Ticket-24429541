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
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        namefire = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4> " + namefire + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_button = "</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'>";

                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes)
      firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes
	 });
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0,
      });
      document.getElementById("msg").value = "";
}