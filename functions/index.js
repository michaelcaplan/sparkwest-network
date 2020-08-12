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

// Handles all data related to user profile on deletion
exports.deleteUserProfile = functions.auth.user().onDelete((user) => {
  const UID = user.uid

  const deleteDoc = db.collection('profiles').doc(UID).delete()
  const deleteAvatar = bucket.file('profiles/' + UID + '/avatar.png').delete()

  Promise.all([deleteDoc, deleteAvatar]).catch((e) => {
    functions.logger.warn('Error deleting user profile', e)
  })
})

// Updates event document likes array when user likes event
exports.likeEvent = functions.https.onCall(async (data, context) => {
  try {
    const UID = data.uid
    const docID = data.docID

    const docRef = db.collection('events').doc(docID)
    const doc = await docRef.get()

    // Check if event doc exists
    if (doc.exists) {
      const likes = doc.data().likes || []

      // Check if user already liked event
      if (likes.includes(UID)) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'the user with UID: ' + UID + ' has already liked this event'
        )
      } else {
        likes.push(UID)

        await docRef.update({
          likes: likes,
        })

        return {
          message: 'user added to likes',
          UID: UID,
          docId: docID,
          status: 200,
          success: true,
        }
      }
    } else {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'the document with ID: ' + docID + ' does not exist'
      )
    }
  } catch (e) {
    functions.logger.log('Error adding like', e)
    throw new functions.https.HttpsError(
      'server-error',
      'there was an internal error while processing this request'
    )
  }
})

// Updates event document likes array when user unlikes event
exports.unlikeEvent = functions.https.onCall(async (data, context) => {
  try {
    const UID = data.uid
    const docID = data.docID

    const docRef = db.collection('events').doc(docID)
    const doc = await docRef.get()

    // Check if event doc exists
    if (doc.exists) {
      const likes = doc.data().likes || []

      // Check if user has liked event
      if (!likes.includes(UID)) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'the user with UID: ' + UID + " hasn't liked this event"
        )
      } else {
        const index = likes.indexOf(UID)
        likes.splice(index, 1)

        await docRef.update({
          likes: likes,
        })

        return {
          message: 'user removed from likes',
          UID: UID,
          docId: docID,
          status: 200,
          success: true,
        }
      }
    } else {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'the document with ID: ' + docID + ' does not exist'
      )
    }
  } catch (e) {
    functions.logger.log('Error adding like', e)
    throw new functions.https.HttpsError(
      'server-error',
      'there was an internal error while processing this request'
    )
  }
})
