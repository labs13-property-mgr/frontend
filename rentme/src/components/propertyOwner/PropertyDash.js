import React from "react";
import { Link } from "react-router-dom";

class PropertyDash extends React.Component {
    state = {};

    // logOut = e => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     this.props.history.push("/login");
    // };

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

            </>
        );
    }
}

export default PropertyDash