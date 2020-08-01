// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin')
const serviceAccount = require('./keys/serviceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sparkwest-network.appspot.com',
  databaseURL: 'https://sparkwest-network.firebaseio.com',
})

const bucket = admin.storage().bucket()
const db = admin.firestore()

exports.deleteUserProfile = functions.auth.user().onDelete((user) => {
  const UID = user.uid

  const deleteDoc = db.collection('profiles').doc(UID).delete()
  const deleteAvatar = bucket.file('profiles/' + UID + '/avatar.png').delete()

  Promise.all([deleteDoc, deleteAvatar]).catch((e) => {
    functions.logger.warn('Error deleting user profile', error)
  })
})
