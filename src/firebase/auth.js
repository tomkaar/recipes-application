import store from "../store/store";
import { newMessage, removeMessage } from '../actions/messages';
import { firebase, database, googleAuthProvider } from "../firebase/Firebase";
import { userLogin } from "../actions/auth";



export function LoginWithEmail(email, password) {
    const attemptMessage = store.dispatch(newMessage("Attempting to login", "Info"));
    return new Promise(function (resolve, reject) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((snapshot) => {
                userLogin(snapshot.user);
                store.dispatch(removeMessage(attemptMessage.payload.id));
                store.dispatch(newMessage("You have successfully logged in", "Success", 3000));
                resolve(true);
            })
            .catch(error => {
                store.dispatch(removeMessage(attemptMessage.payload.id));
                store.dispatch(newMessage(error.message, "Error", 5000));
                resolve(false);
            });
    }
    )
};

export function RegisterWithEmail(email, password) {
    const attemptMessage = store.dispatch(newMessage("Attempting to login", "Info"));
    return new Promise(function (resolve, reject) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((ref) => {
                const key = ref.user.uid;
                database.ref(`users/${key}`).set({
                    uid: key,
                    email: email
                });
            })
            .then(() => {
                store.dispatch(removeMessage(attemptMessage.payload.id));
                store.dispatch(newMessage("You account has been successfully created", "Success", 5000));
                resolve(true);
            })
            .catch(error => {
                store.dispatch(removeMessage(attemptMessage.payload.id));
                store.dispatch(newMessage(error.message, "Error", 5000));
                resolve(false);
            });
    })
}

export function SignUpWithGoogle() {
    const attemptMessage = store.dispatch(newMessage("Attempting to login", "Info"));
    return new Promise(function (resolve, reject) {
        firebase.auth().signInWithPopup(googleAuthProvider).then(function (result) {
            var user = result.user;
            database.ref(`users/${user.uid}`).set({
                uid: user.uid,
                email: user.email
            });
            userLogin(user);
            store.dispatch(removeMessage(attemptMessage.payload.id));
            store.dispatch(newMessage("You have successfully logged in", "Success", 3000));
            resolve(true);
        }).catch(function (error) {
            store.dispatch(removeMessage(attemptMessage.payload.id));
            store.dispatch(newMessage(error.message, "Error"));
            resolve(false);
        });
    }
    )
}

export function Logout() {
    firebase.auth().signOut()
        .then(() => {
            store.dispatch(newMessage("You have successfully been logged out", "Success", 3000));
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Error"));
        });
}
