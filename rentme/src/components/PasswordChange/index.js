import React, { Component } from 'react';

class PasswordChangeForm extends Component {

    render() {
        return (
            <>
                <form>
                    <input 
                        name="passwordOne"
                        type="password"
                        placeholder="New Password"
                    />
                    <input 
                        name="passwordTwo"
                        type="password"
                        placeholder="Confirm New Password"
                    />
                    <button>
                        Reset My Password
                    </button>
                </form>
            </>
        )
    }
}

export default PasswordChangeForm