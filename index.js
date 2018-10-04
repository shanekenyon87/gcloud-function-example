const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.uploadFile = (req, res) => {
  
  admin.initializeApp(functions.config().firebase);

  var db = admin.firestore();
  var message = '';
  const listOfAsyncJobs = [];

  // var docRef = db.collection('users').doc('alovelace');

  // var setAda = docRef.set({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // })
  // .catch((err) => {
  //   console.log('Error writing document', err);
  // });

  // var aTuringRef = db.collection('users').doc('aturing');

  // var setAlan = aTuringRef.set({
  //   'first': 'Alan',
  //   'middle': 'Mathison',
  //   'last': 'Turing',
  //   'born': 1912
  // })
  // .catch((err) => {
  //   console.log('Error writing document', err);
  // });

  // return Promise.all(listOfAsyncJobs);
  
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        message += doc.id + '=>' + doc.data();
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  res.status(200).send('Database content:\n' + message);
};