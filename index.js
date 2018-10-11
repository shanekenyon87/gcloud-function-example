const admin = require('firebase-admin');
const functions = require('firebase-functions');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.uploadFile = async (req, res) => {
  
  // Check if firebase is already initialized, per: https://maxrohde.com/2016/09/21/test-if-firebase-is-initialized-on-node-js-lambda/
  if (admin.apps.length === 0) {
    admin.initializeApp(functions.config().firebase);
  }

  var db = admin.firestore();
  var message = '';
  
  createUsers(db);
  message = await getUsers(db);

  res.status(200).send('Database content:\n' + message);
};

function createUsers(db) {
  var docRef = db.collection('users').doc('alovelace');

  var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  })
  .catch((err) => {
    console.log('Error writing document', err);
  });

  var aTuringRef = db.collection('users').doc('aturing');

  var setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  })
  .catch((err) => {
    console.log('Error writing document', err);
  });

  return Promise.all([setAda, setAlan]);
}

async function getUsers(db) {
  var message = '';
  await db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        message += '\n' + doc.id + '=>' + JSON.stringify(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    return message;
}