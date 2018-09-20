import firebase from 'firebase/app'
import 'firebase/auth'
import store from "../store/store";
import { newMessage, removeMessage } from './messages';

export const userLogin = (user) => ({
    type: "USER_LOGIN",
    user: user
});

export const userLogout = () => ({
    type: "USER_LOGIN",
    user: ""
});

export function Login(email, password) {
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
)};

export function Logout() {
    firebase.auth().signOut()
        .then(() => {
            store.dispatch(userLogout());
            store.dispatch(newMessage("You have successfully been logged out", "Success", 3000));
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Danger"));
        });
}
