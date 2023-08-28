const firebaseConfig = {
  databaseURL: 'https://snadder-math-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function getCookie (cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var gameId = getCookie('snaddermath');
if (gameId != '') {
  const dRef = database.ref(`${gameId}`);
  dRef.once('value')
    .then(snapshot => {
      const userData = snapshot.val();
      if (userData) {
        console.log('Retrieved user data from Firebase:', userData);
        // Use the retrieved user data...
      } else {
        console.log('User data not found in Firebase.');
      }
    })
    .catch(error => {
      console.error('Error retrieving user data:', error);
    });
  console.log("This app is using cookies");
} else {
  document.cookie = `snaddermath=${new Date().getTime()}; expires=${new Date(9999, 0, 1).toUTCString()}`;
  gameId = getCookie('snaddermath');
  const dRef = database.ref(`${gameId}`);
  const init = dRef.push();
  init.set('');
}

var FONT_FAMILY = 'Verdana, "Times New Roman", Tahoma, serif'; // Replace with your desired font family
var FONT_SIZE = '32px'; // Replace with your desired font size
var FONT_STYLE = {
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  fill: '#fff',
  fontStyle: 'bold'
};

var COLORS = {
  black: 0x000000,
  white: 0xffffff,
  gray: 0x808080
};

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 1200,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: 0x000000,
  scene: [MainMenuScene, PickPlayerMenu, HowtoPlayMenu, InGameScene, QuestionMenu],
  // scene: [InGameScene, QuestionScene]
};

var game = new Phaser.Game(config);