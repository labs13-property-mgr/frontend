import React, { useState, useEffect} from 'react'
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

const TrackerBar = props => {

  let { classes, progressWidth, currentStep, onButtonClick } = props

  return (
    <div className={props.classes.progressBarSection}>
    <h3>Active Service/Work Requests</h3>{" "}
    {/*ACTIVE SERVICE REQUEST SECTION */}
    <h4>Name:</h4>
    <LinearProgress
    className={classes.progressBar}
    variant="determinate"
    value={progressWidth}
    />
    <div className={classes.progressContent}>
    <Grid md={12} className={classes.progressIcons}>
    {" "}
    {/*Icon Layout */}
    <>
    {" "}
    {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
    <div
    className={`step${
      progressWidth === 0
      ? " in-progress"
      : progressWidth > 0
      ? " completed"
      : ""
    }`}
    >
    <Icon className={classes.icon}>home</Icon>
    </div>
    <div
    className={`check${
      progressWidth > 0 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>check_circle</Icon>
    </div>
    </>
    <>
    {" "}
    {/*Step 2  */}
    <div
    className={`step${
      progressWidth === 25
      ? " in-progress"
      : progressWidth > 25
      ? " completed"
      : ""
    }`}
    >
    <Icon className={classes.icon}>assignment_ind</Icon>
    </div>
    <div
    className={`check${
      progressWidth > 25 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>check_circle</Icon>
    </div>
    </>
    <>
    {" "}
    {/*Step 3 */}
    <div
    className={`step${
      progressWidth === 50
      ? " in-progress"
      : progressWidth > 50
      ? " completed"
      : ""
    }`}
    >
    <Icon className={classes.icon}>calendar_today</Icon>
    </div>
    <div
    className={`check${
      progressWidth > 50 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>check_circle</Icon>
    </div>
    </>
    <>
    {" "}
    {/*Step 4 */}
    <div
    className={`step${
      progressWidth === 75
      ? " in-progress"
      : progressWidth > 75
      ? " completed"
      : ""
    }`}
    >
    <Icon className={classes.icon}>build</Icon>
    </div>
    <div
    className={`check${
      progressWidth > 75 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>check_circle</Icon>
    </div>
    </>
    <>
    {" "}
    {/*Step 5 */}
    <div
    className={`step${
      progressWidth === 100 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>done_all</Icon>
    </div>
    <div
    className={`check${
      progressWidth === 100 ? " completed" : ""
    }`}
    >
    <Icon className={classes.icon}>check_circle</Icon>
    </div>
    </>
    </Grid>
    <Grid md={12} className={classes.progressText}>
    {" "}
    {/*Progress Step text layout */}
    <>
    {" "}
    {/*Step 1 - Beginning of tracker, no updated from owner/manager */}
    <div
    className={`step-text${
      progressWidth === 0
      ? " in-progress"
      : progressWidth > 0
      ? " completed"
      : ""
    }`}
    >
    <p>Sending Work Request...</p>
    </div>
    <div
    className={`check-text${
      progressWidth > 0 ? " completed" : ""
    }`}
    >
    <p>Work Request Received</p>
    </div>
    </>
    <>
    {" "}
    {/*Step 2 */}
    <div
    className={`step-text${
      progressWidth === 25
      ? " in-progress"
      : progressWidth > 25
      ? " completed"
      : ""
    }`}
    >
    <p>Contacting Vendor...</p>
    </div>
    <div
    className={`check-text${
      progressWidth > 25 ? " completed" : ""
    }`}
    >
    <p>Vendor Contacted</p>
    </div>
    </>
    <>
    {" "}
    {/*Step 3 */}
    <div
    className={`step-text${
      progressWidth === 50
      ? " in-progress"
      : progressWidth > 50
      ? " completed"
      : ""
    }`}
    >
    <p>Scheduling appointment...</p>
    </div>
    <div
    className={`check-text${
      progressWidth > 50 ? " completed" : ""
    }`}
    >
    <p>Appointment Scheduled</p>
    </div>
    </>
    <>
    {" "}
    {/*Step 4 */}
    <div
    className={`step-text${
      progressWidth === 75
      ? " in-progress"
      : progressWidth > 75
      ? " completed"
      : ""
    }`}
    >
    <p>Fix in progress...</p>
    </div>
    <div
    className={`check-text${
      progressWidth > 75 ? " completed" : ""
    }`}
    >
    <p>Work Complete</p>
    </div>
    </>
    <>
    {" "}
    {/*Step 5 */}
    <div
    className={`step-text${
      progressWidth === 100 ? " completed" : ""
    }`}
    >
    <p>Issue successfully resolved!</p>
    </div>
    <div
    className={`check-text${
      progressWidth === 100 ? " completed" : ""
    }`}
    >
    <p>Issue successfully resolved!</p>
    </div>
    </>
    </Grid>
    </div>
    <br />
    <button onClick={onButtonClick} />
    Current step: {currentStep}
    </div>
  )

}

export default TrackerBar
