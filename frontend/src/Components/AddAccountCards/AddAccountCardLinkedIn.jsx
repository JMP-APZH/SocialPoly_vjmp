import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
  LinkedIn,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AddAccountCardLinkedIn() {
  const [expanded, setExpanded] = React.useState(false);
  const [regExpanded, setRegExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRegExpandClick = () => {
    setRegExpanded(!regExpanded);
  };

  const ConnectToLinkedin = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {};
    const response = await axios.post(
      "https://djpp.propulsion-learn.ch/backend/api/linkedin/auth/",
      body,
      config
    );
    console.log(response.data.url);
    window.location.assign(response.data.url);
  };

  const handleConnect = async () => {
    await ConnectToLinkedin();
  };

  let LinkedInConnectReturnURL = window.location.href;
  const LinkedInConnectToken = LinkedInConnectReturnURL.substring(
    LinkedInConnectReturnURL.lastIndexOf("?") + 6,
    LinkedInConnectReturnURL.lastIndexOf("&")
  );

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800, margin: "5px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            N/A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="LinkedIn"
        subheader="No Account Connected"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          You must connect your LinkedIn Account before you can use it.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="LinkedIn"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          expand={regExpanded}
          onClick={handleRegExpandClick}
          aria-expanded={regExpanded}
          aria-label="register"
        >
          {regExpanded ? <HowToReg /> : <PersonAdd />}
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ marginLeft: "auto" }}
        >
          {expanded ? <KeyboardArrowUp /> : <Help />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>How to connect</Typography>
          <Typography paragraph>
            First of all, you must have a Parrot 🦜
          </Typography>
          <Typography paragraph>Please don't forget to feed him!</Typography>
          <Typography paragraph>
            Change the Newspaper in the cage, so he don't get bored.
          </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={regExpanded} timeout="auto" unmountOnExit>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography paragraph>LinkedIn API Connection</Typography>
          <LoadingButton
            variant="contained"
            loading={false}
            onClick={handleConnect}
          >
            Connect to LinkedIn
          </LoadingButton>
        </CardContent>
      </Collapse>
      {/* Alert when the connection with LinkedIn went wrong */}
      {window.location.href.includes("/accounts/linkedin/connect/?error") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
      {/* Alert when the connection with LinkedIn was successfully */}
      {window.location.href.includes("/accounts/linkedin/connect/?code") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          You connected successfully your LinkedIn Account!
          <br />
          <strong>{LinkedInConnectToken}</strong>
        </Alert>
      ) : null}
    </Card>
  );
}
