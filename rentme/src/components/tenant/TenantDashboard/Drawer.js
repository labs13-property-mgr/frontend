import React from 'react'
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router"

const Drawer = props => {
  let { classes, ListItemLink } = props

  return (
    <div>
      <div className={classes.toolbar} />
      <div>
        <h2 className={classes.resourcesHeader}>Resources/Links</h2>
        <h3 className={classes.resourcesHeader}>Leasing Documents</h3>
        <List>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon>folder</Icon>
            <p className={classes.menuText}>Rent Receipts</p>
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon>folder</Icon>
            <p className={classes.menuText}>Lease Application</p>
          </ListItemLink>
          <ListItemLink className={classes.menuItem} href="/view-receipts">
            <Icon>folder</Icon>
            <p className={classes.menuText}>Lease Agreement Contract</p>
          </ListItemLink>
        </List>
        <Divider />
        <h3 className={classes.resourcesHeader}>Maintenance & Requests</h3>
        <List>
          <ListItemLink className={classes.menuItem} href="/add-work-request">
            <Icon>build</Icon>
            <p className={classes.menuText}>Submit an Issue/Work Request</p>
          </ListItemLink>
        </List>
      </div>
    </div>
  )
}

export default withRouter(Drawer)
