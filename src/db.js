import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDJ1E380prHfHketceWdDNeDa2CwqVSrPM',
  authDomain: 'firechatwithvue-437f1.firebaseapp.com',
  databaseURL: 'https://firechatwithvue-437f1-default-rtdb.firebaseio.com',
  projectId: 'firechatwithvue-437f1',
  storageBucket: 'firechatwithvue-437f1.appspot.com',
  messagingSenderId: '1003704824284',
  appId: '1:1003704824284:web:b6ce6ff799570e94e71f19',
}

const db = firebase.initializeApp(config)
console.log(db)
export default db
