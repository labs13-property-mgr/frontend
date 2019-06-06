import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = props => {
    return (
        <>

           <h3>Property PropertyCard</h3>
           <Link to="/tenant-form"><button>Add a Tenant</button></Link>


        </>
    )
}

export default PropertyCard