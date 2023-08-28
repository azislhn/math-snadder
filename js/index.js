// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
// import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

// const appSettings = {
//   databaseURL: 'https://snadder-math-default-rtdb.asia-southeast1.firebasedatabase.app/'
// };

// const app = initializeApp(appSettings);
// const db = getDatabase(app);

// const list = ref(db, 'list');

// push(list, 'osainfoasnfin')

const firebaseConfig = {
  databaseURL: 'https://snadder-math-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const dbRef = database.ref('score');

// const newdata = dbRef.push();
// newdata.set('keybs');