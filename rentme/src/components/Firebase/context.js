import React from 'react';

const FirebaseContext = React.createContext(null)
/*creates two components:
    FirebaseContext.Provider - provides Firebase instance once at the top-level of component tree
    FirebaseContext.Consumer - retrieves Firebase instance if it is needed in the component*/

export default FirebaseContext