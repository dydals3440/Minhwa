import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

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
        // isAdmin이 admin일려면, 우리가 받아온 admins라는 배열안에 user.uid가 있는지 확인해주고
        const isAdmin = admins.includes(user.uid);
        // 사용자에있는 모든 정보를 낱개로 풀어서, isAdmin이란 정보도 전달해줄 것입니다.
        return { ...user, isAdmin };
      }
      // admin이라는 데이터가 존재하지 않는경우, 네트워크 통신을 못한 경우는 user 정보 return(admin이라는 데이터가 없기 때문에 isAdmin이 False가 될 것이다.)
      return user;
    });
}

// 새로운 제품 등록
export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  // 제품마다 고유한 id 추가 (uuid 라이브러리 활용)
  // firebase에서 data를 읽을떄는 get, 쓸떄는 set을 활용합니다.
  // 다 되면 결과를 알 수 있게 return 사용 비동기라 가능!
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(','),
  });
}
// ref는 기존의 database를 사용!, `products`에 추가 /id라는 키에다가 우리의 제품 정보를 저장!
// 고유한 아이디를 받아와서 고유한 아이디 안에다가 제품의 정보를 등록!
// 기존의 받아온 product의 모든 key와 value를 받아오고, 고유한 id에 제품의 정보를 등록! 그릐고 product안에도 id라는 정보가 들어갈 수 있도록 만듬!
// 제품의 price는 문자열 형태로 받았기 때문에 number타입으로 저장해주기 위해 parseInt활용!
// 그 후 image라는 키에 전달받은 imageUrl을 전달해줄꺼임 인자를 image로 바꾸고 image: image이므로 image라고만 저겅줘도됨.
// option들 또한 쉼표 형태로 구분받기 때문에 split활용

// firebase는 소켓 통신이므로 네트워크 통신에서 확인할 수 없음, 직접 firebase Realtime Database에 들어가서 확인해보아야 합니다.

// 14-19강
export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      // JS에서 제공해주는 Object.values를 이용해서 value들만 갖고옴
      return Object.values(snapshot.val());
    } 
    return []; // snapshot이 없으면 텅텅빈 배열
  });
}
