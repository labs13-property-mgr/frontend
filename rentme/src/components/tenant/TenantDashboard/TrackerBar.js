import React, { useState, useEffect } from "react";
import IssueResolvedText from "./IssueResolvedText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { CheckProgress, isGreaterOrIsEqual } from "./helpers";
import DeleteButton from "./DeleteButton";

const TrackerBar = props => {
  const [currentStep, setCurrentStep] = useState(null);
  const [progressWidth, setProgressWidth] = useState(null);
  const [isResolved, setIsResolved] = useState(false);

  const triggerBarChange = step => {
    if (currentStep >= 5) return null;

    setCurrentStep(step);
    setProgressWidth(step * 25);
  };

  let {
    classes,
    request,
    handleDeleteRequest,
    //handleHideRequest,
    handleSetResolvedRequest,
    handleGetServicesRequest
  } = props;
  let {
    body,
    received,
    resolved_tenant,
    resolved_owner,
    id,
    appointment
  } = request;

  const updateTrackerBar = () => {
    if (resolved_tenant && resolved_owner) {
      return triggerBarChange(4);
    }

    switch (request.status.toLowerCase()) {
      case "open":
        triggerBarChange(0);
        break;
      case "vendor contacted":
        triggerBarChange(1);
        break;
      case "scheduled":
        triggerBarChange(2);
        break;
      case "fixing":
        triggerBarChange(3);
        break;
      default:
        return null;
        break;
    }
  };

  useEffect(() => {
    updateTrackerBar();
  }, [request]);

  return (
    <div className={props.classes.progressBarSection}>
      <h4 style={{ display: "inline-block" }}>Request Name: {body}</h4>
      <DeleteButton
       request={request}
       handleDeleteRequest={handleDeleteRequest}
       //handleHideRequest={handleHideRequest}
      />
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={progressWidth}
      />

      <div className={classes.progressContent}>
        <Grid className={classes.progressIcons}>
          <>
            <div className={isGreaterOrIsEqual(progressWidth, 0)}>
              <Icon className={classes.icon}>home</Icon>
            </div>
            <CheckProgress progressWidth={progressWidth} checkAgainst={0} />
          </>

          <>
            {" "}
            {/*Step 2  */}
            <div className={isGreaterOrIsEqual(progressWidth, 25)}>
              <Icon className={classes.icon}>assignment_ind</Icon>
            </div>
            <CheckProgress progressWidth={progressWidth} checkAgainst={25} />
          </>
          <>
            {" "}
            {/*Step 3 */}
            <div className={isGreaterOrIsEqual(progressWidth, 50)}>
              <Icon className={classes.icon}>calendar_today</Icon>
            </div>
            <CheckProgress progressWidth={progressWidth} checkAgainst={50} />
          </>
          <>
            {" "}
            {/*Step 4 */}
            <div className={isGreaterOrIsEqual(progressWidth, 75)}>
              <Icon className={classes.icon}>build</Icon>
            </div>
            <div className={`check${progressWidth > 75 ? " completed" : ""}`}>
              <Icon className={classes.icon}>check_circle</Icon>
            </div>
            <CheckProgress progressWidth={progressWidth} checkAgainst={75} />
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
            <div className={isGreaterOrIsEqual(progressWidth, 0, "step-text")}>
              <p>{received ? "Request received" : "Request sent"}</p>
            </div>
          </>
          <>
            {" "}
            {/*Step 2 */}
            <div className={isGreaterOrIsEqual(progressWidth, 25, "step-text")}>
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
            <Tooltip title={`Scheduled Date: ${appointment}`}>
              <div
                className={isGreaterOrIsEqual(progressWidth, 50, "step-text")}
              >
                <p>Scheduling appointment</p>
              </div>
            </Tooltip>
            <Tooltip title={`Scheduled Date: ${appointment}`}>
              <div
                className={`check-text${
                  progressWidth > 50 ? " completed" : ""
                }`}
              >
                <p>Appointment Scheduled</p>
              </div>
            </Tooltip>
          </>
          <>
            {" "}
            {/*Step 4 */}
            <div className={isGreaterOrIsEqual(progressWidth, 75, "step-text")}>
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
              {!resolved_tenant ? (
                <Button style={{
                  background: "DeepSkyBlue",
                  color: "white"
                }} onClick={() => handleSetResolvedRequest(id)}>
                  Issue resolved?
                </Button>
              ) : (
                ""
              )}
            </div>
          </>
        </Grid>
        <IssueResolvedText request={request} />
      </div>
    </div>
  );
};

export default TrackerBar;
