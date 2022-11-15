const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can add other admins.' };
  }

  if (context.auth.token.email?.trim() === data.email?.trim()) {
    return { error: 'You cannot add yourself as an admin.' };
  }

  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return { message: `Success! ${data.email} has been made an admin.` };
    })
    .catch((err) => {
      return err;
    });
});

exports.removeAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can remove other admins.' };
  }

  if (context.auth.token.email?.trim() === data.email?.trim()) {
    return { error: 'You cannot remove yourself from admin.' };
  }

  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false,
      });
    })
    .then(() => {
      return { message: `Success! ${data.email} has been removed from admin.` };
    })
    .catch((err) => {
      return err;
    });
});
