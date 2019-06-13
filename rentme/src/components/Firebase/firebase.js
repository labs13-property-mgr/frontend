import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appID: process.env.REACT_APP_APP_ID,
}

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()

        this.googleProvider = new app.auth.GoogleAuthProvider()
        this.facebookProvider = new app.auth.FacebookAuthProvider()
    }

    // Auth API

    doCreateUserWithEmailAndPassword = (email, password) =>             // Sign Up Function
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>                 // Log in Function
        this.auth.signInWithEmailAndPassword(email, password)

    doSignInWithGoogle = () =>                                          // Google Login Function
        this.auth.signInWithPopup(this.googleProvider)

    doSignInWithFacebook = () =>                                        // Facebook Login Function
        this.auth.signInWithPopup(this.facebookProvider)

    doSignOut = () => this.auth.signOut()                               // Sign Out Function

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)  // Password Reset Function
    
    doPasswordUpdate = password =>                                      // Change Password Function
        this.auth.currentUser.updatePassword(password)
}

export default Firebase