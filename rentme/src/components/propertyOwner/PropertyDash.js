import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class PropertyDash extends React.Component {
    state = {
        property: {
            name: '',
            address: ''
        }
    }

    // logOut = e => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     this.props.history.push("/login");
    // };

    componentDidMount() {
        axios
            .get('https://rent-me-app.herokuapp.com/api/properties')
            .then(res => {
                this.setState(() => ({ properties: res.data}))
            })
            .catch(err => {
                console.error('Server Error', err);
            })
    }

    render() {
        return (
            <>
            
                <h2>Property Owner Dashboard</h2>

                <Link to="vendor-addbook">Vendor Address Book</Link>
                <Link to="tenant-addbook">Tenant Address Book</Link>
                <Link to="add-manager">
                    <button>Add a Manager</button>
                    {/* this button should be a plus icon */}
                </Link>

                <div>
                    {this.state.properties.map(property => (
                            <div>
                              <h4>{property.property_name}</h4>
                              <p>{property.address}</p>
                            </div>
                        ))}
                </div>

            </>
        );
    }
}


export default PropertyDash