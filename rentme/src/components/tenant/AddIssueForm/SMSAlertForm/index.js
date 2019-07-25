import React, { Component } from "react";

class SMSAlertForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                to: '',
                body: ''
            },
            submitting: false,
            error: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        const name = e.target.getAttribute('name');
        this.setState({
            message: { ...this.state.message, [name]: e.target.value }
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ submitting: true })
        fetch('http://localhost:5000/api/message', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        error: false,
                        submitting: false,
                        message: {
                            to: '',
                            body: ''
                        }
                    })
                } else {
                    this.setState({
                        error: true,
                        submitting: false
                    })
                }
            })
    }

    render() {
        return (
            <form 
                onSubmit={this.onSubmit}
                className={this.state.error ? 'error sms-alert-form' : 'sms-alert-form'}
            >
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="tel"
                        name="to"
                        id="to"
                        value={this.state.message.to}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        name="body"
                        id="body"
                        value={this.state.message.body}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" disabled={this.state.submitting}>
                    Send Message
                </button>
            </form>
        )
    }
}

export default SMSAlertForm;