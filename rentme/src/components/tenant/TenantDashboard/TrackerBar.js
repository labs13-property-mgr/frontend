import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { CheckProgress } from './helpers'
const TrackerBar = props => {
  const [currentStep, setCurrentStep] = useState(null);
  const [progressWidth, setProgressWidth] = useState(0);

  const triggerBarChange = step => {

    if(currentStep === 5) return null

    setCurrentStep(step);
    setProgressWidth(currentStep * 25);

  };

  useEffect(() => {
    // if(request.resolved_tenant && request.resolved_owner) setCurrentStep(5)

    switch(request.status.toLowerCase()) {
      case "open":
        triggerBarChange(1)
        break;
      case "received":
        console.log("test received")
        triggerBarChange(2)
        break;
      case "vendor contacted":
        console.log("test vendor contacted")
        triggerBarChange(3)
        break;
      case "scheduled":
        console.log("test scheduled")
        triggerBarChange(4)
        break;
      case "fixing":
        console.log("test fixing")
        triggerBarChange(5)
        break;
      default:
        return null
        break;
    }
  }, [])

  let { classes, request } = props;

  console.log(request)

  return (
    <div className={props.classes.progressBarSection}>
      <h4>Name: {request.request_name}</h4>
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={progressWidth}
      />
      <div className={classes.progressContent}>
        <Grid className={classes.progressIcons}>
          <>
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

            {/**<div className={`check${progressWidth > 0 ? " completed" : ""}`}>
              <Icon className={classes.icon}>check_circle</Icon>
            </div>**/}
            <CheckProgress progressWidth={progressWidth} checkAgainst={0}/>
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
            <CheckProgress progressWidth={progressWidth} checkAgainst={25}/>

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
            <CheckProgress progressWidth={progressWidth} checkAgainst={50}/>

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
            <div className={`check${progressWidth > 75 ? " completed" : ""}`}>
              <Icon className={classes.icon}>check_circle</Icon>
            </div>
            <CheckProgress progressWidth={progressWidth} checkAgainst={75}/>

          </>
          <>
            {" "}
            {/*Step 5 */}
            <div className={`step${progressWidth === 100 ? " completed" : ""}`}>
              <Icon className={classes.icon}>done_all</Icon>
            </div>


          </>
        </Grid>
        <Grid className={classes.progressText}>
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
              <p>Request Sent</p>
            </div>
            <div
              className={`check-text${progressWidth > 0 ? " completed" : ""}`}
            >
              <p>Request Received</p>
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
              <p>Contacting Vendor</p>
            </div>
            <div
              className={`check-text${progressWidth > 25 ? " completed" : ""}`}
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
              <p>Scheduling appointment</p>
            </div>
            <div
              className={`check-text${progressWidth > 50 ? " completed" : ""}`}
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
              <p>Fix in progress</p>
            </div>
            <div
              className={`check-text${progressWidth > 75 ? " completed" : ""}`}
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
      <button onClick={() => triggerBarChange(currentStep + 1)} />
      Current step: {currentStep}
    </div>
  );
};

export default TrackerBar;
