import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  return (
    signInWithPopup(auth, provider)
      // .then((result) => {
      //   const user = result.user;
      //   console.log(user);
      //   return user;
      // })
      // .catch(error => console.error)
      .catch(console.error)
  );
}

export function logout() {
  // return signOut(auth).then(() => null);
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우 (로그인한 경우)
    // admin이라는 정보는 firebase database에서 갖고있을 것임. admins라는 배열안에 admin인 사용자의 id를 갖고 있을 것이다. 사용자가 로그인 한 다음에 admin이 누구인지 정보를 firebase에서 갖고와서 지금 로그인 한 사용자의 id가 admin에 있는지 없는지 확인하면 됨!
    // 코드 중간 점검: 사용자가 있는 경우에 adminUser 호출
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// 사용자를 전달받음. 네트워크 통신을 하므로 async
async function adminUser(user) {
  // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
  // 3. {...user, isAdmin: true/false}
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
