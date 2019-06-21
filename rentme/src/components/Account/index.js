import React, { Component } from 'react';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";


const LOG_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    }
]

const Account = () => (
    <AuthUserContext.Consumer>
        {authUser => (
                <>
                <h4>Account: </h4><p>{authUser.email}</p>
                <PasswordChangeForm />
                <LoginManagement />
            </>
        )}
    </AuthUserContext.Consumer>
)



class LoginManagementBase extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activeSignInMethods: [],
            error: null,
        }
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }
    
    fetchSignInMethods = () => {          //fetches all the methods an email has been used to sign in
        this.props.firebase.auth
        .fetchSignInMethodsForEmail(this.props.authUser.email)
        .then(activeSignInMethods =>
            this.setState({ activeSignInMethods, error: null })
        )
        .catch(error => this.setState({ error }))
    }

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
        .linkWithPopup(this.props.firebase[provider])
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }))
    }

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
        .unlink(providerId)
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }))
    }

    onDefaultLoginLink = () => {

    }

    render() {
        const { activeSignInMethods, error } = this.state

        return (
            <>
                <h4>Sign In Methods: </h4>
                <ul>
                    {LOG_IN_METHODS.map(signInMethod => {
                        const oneLeft = activeSignInMethods.length === 1      //avoids getting locked out - only one active method = disable all deactivation buttons
                        const isEnabled = activeSignInMethods.includes(
                            signInMethod.id,
                        );

                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        oneLeft={oneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onUnlink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        oneLeft={oneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        )
                    })}
                </ul>
                {error && error.message}
            </>
        )
    }
}


const SocialLoginToggle = ({
    oneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink
}) => isEnabled ? (
    <button
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={oneLeft}
    >
        Deactivate {signInMethod.id}
    </button>
) : (
    <button
        type="button"
        onClick={() => onLink(signInMethod.provider)}
    >
        Link {signInMethod.id}
    </button>
)

const LoginManagement = withFirebase(LoginManagementBase)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);