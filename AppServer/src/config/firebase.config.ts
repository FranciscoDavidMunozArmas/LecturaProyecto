import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { CONSTANTS } from '../lib/utils';

const firebaseConfig = {
  apiKey: CONSTANTS.apiKey,
  authDomain: CONSTANTS.authDomain,
  projectId: CONSTANTS.projectId,
  storageBucket: CONSTANTS.storageBucket,
  messagingSenderId: CONSTANTS.messagingSenderId,
  appId: CONSTANTS.appId
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
