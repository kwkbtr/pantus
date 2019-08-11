import firebase from 'firebase/app'
import 'firebase/firestore'

export default firebase
  .initializeApp({ projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID })
  .firestore()
