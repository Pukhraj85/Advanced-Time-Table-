import React, { useState, useEffect } from "react";
import "../css/Timetable.css";
import batch1 from "../timetable/batch1.json";
import batch2 from "../timetable/batch2.json";
import common from "../timetable/common.json";
import peb from "../timetable/professionalelectives.json";
import ped from "../timetable/professionalelectives.json";
import oe from "../timetable/openelectives.json";

import ChooseBatch from "./ChooseBatch";
import ChooseProfessionalElectiveB from "./ChooseProfessionalElectiveB";
import ChooseProfessionalElectiveD from "./ChooseProfessionalElectiveD";
import ChooseOpenElective from "./ChooseOpenElective";
import AnimatedComponent from "./AnimatedComponent";

import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 800,
  },

  title: {
    fontSize: 14,
  },
  teacher: {
    marginBottom: 12,
  },
  space: {
    marginLeft: 5,
  },
});
const Timetable = () => {
  let location = useLocation();
  const [timetable, setTimeTable] = useState([]);
  const showTimetable = () => {
    const bslot = localStorage.getItem("currPE1") || "18CSE355T";
    const dslot = localStorage.getItem("currPE2") || "18CSE352T";
    const gslot = localStorage.getItem("currOE") || "18MBO401T";
    const pe1 = peb.filter((p) => p.subjectCode === bslot);
    const pe2 = ped.filter((p) => p.subjectCode === dslot);
    const oe1 = oe.filter((o) => o.subjectCode === gslot);
    const batch = parseInt(localStorage.getItem("batch")) || 1;
    const dayOrder = parseInt(location.pathname[1]) || 1;
    if (batch === 1) {
      const Timetable = batch1[dayOrder - 1].concat();
      Timetable.forEach((e, index) => {
        if (e.subjectSlot === "B") {
          const updatedSlot = { ...e, ...pe1[0] };
          Timetable[index] = updatedSlot;
        } else if (e.subjectSlot === "D") {
          const updatedSlot = { ...e, ...pe2[0] };
          Timetable[index] = updatedSlot;
        } else if (e.subjectSlot === "G") {
          const updatedSlot = { ...e, ...oe1[0] };
          Timetable[index] = updatedSlot;
        } else {
          const subject = common.filter((c) => c.subjectSlot === e.subjectSlot);
          const updatedSlot = { ...e, ...subject[0] };
          Timetable[index] = updatedSlot;
        }
      });
      setTimeTable(Timetable);
    } else {
      const Timetable = batch2[dayOrder - 1].concat();
      Timetable.forEach((e, index) => {
        if (e.subjectSlot === "B") {
          const updatedSlot = { ...e, ...pe1[0] };
          Timetable[index] = updatedSlot;
        } else if (e.subjectSlot === "D") {
          const updatedSlot = { ...e, ...pe2[0] };
          Timetable[index] = updatedSlot;
        } else if (e.subjectSlot === "G") {
          const updatedSlot = { ...e, ...oe1[0] };
          Timetable[index] = updatedSlot;
        } else {
          const subject = common.filter((c) => c.subjectSlot === e.subjectSlot);
          const updatedSlot = { ...e, ...subject[0] };
          Timetable[index] = updatedSlot;
        }
      });
      setTimeTable(Timetable);
    }
  };
  useEffect(() => {
    showTimetable();
  }, [location]);

  const classes = useStyles();
  return (
    <div className="timetable">
      <div className="container">
        <div className="options">
          <ChooseBatch showTimetable={showTimetable} />
          <ChooseProfessionalElectiveB showTimetable={showTimetable} />
          <ChooseProfessionalElectiveD showTimetable={showTimetable} />
          <ChooseOpenElective showTimetable={showTimetable} />
        </div>
        <div className="github">
          <a href="https://github.com/mmuazam98/mytimetable2.0" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
        </div>

        <AnimatedComponent>
          {timetable.map((tt, index) => {
            return (
              <Card className={classes.root} variant="outlined" key={index}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Slot: {tt.slot}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {tt.subjectName}
                    <span className={classes.space}>({tt.subjectCode})</span>
                  </Typography>
                  <Typography className={classes.teacher} color="textSecondary">
                    {tt.teacher}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <span className="subject-details">{tt.category}</span>
                    <span className="subject-details">{tt.type}</span>
                  </Typography>
                  <div className="slot">
                    <span>{tt.subjectSlot}</span>
                  </div>
                </CardContent>
                <CardActions>
                  {tt.link2 ? (
                    <Button variant="contained" onClick={() => window.open(tt.link2, "_blank")}>
                      Join Meeting
                    </Button>
                  ) : (
                    <Tooltip describeChild title="Link not available.">
                      <span>
                        <Button variant="contained" disabled={true}>
                          Join Meeting
                        </Button>
                      </span>
                     
                    </Tooltip>
                  )}
                  {tt.link ? (
                    <Button variant="contained" onClick={() => window.open(tt.link, "_blank")}>
                      Watch Playlist
                    </Button>
                  ) : (
                    <Tooltip describeChild title="Link not available.">
                      <span>
                        <Button variant="contained" disabled={true}>
                          Watch Playlist
                        </Button>
                      </span>
                     
                    </Tooltip>
                  )}
                </CardActions>
                {!tt.link && (
                  <span className="small not-available">
                    <BugReportRoundedIcon />
                    Link not available.
                  </span>
                )}
              </Card>
            );
          })}
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default Timetable;
