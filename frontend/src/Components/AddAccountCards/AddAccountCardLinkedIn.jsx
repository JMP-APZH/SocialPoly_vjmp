import React, { useEffect } from "react";
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
  Button,
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
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [regExpanded, setRegExpanded] = React.useState(false);
  const [UserData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/`,
        config
      );
      if (response.data) {
        setUserData(response.data);
      }
    }
    getUserData();
  });

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
      "/backend/api/linkedin/auth/",
      body,
      config
    );
    window.location.assign(response.data.url);
  };

  let LinkedInConnectReturnURL = window.location.href;
  const LinkedInConnectCode = LinkedInConnectReturnURL.substring(
    LinkedInConnectReturnURL.lastIndexOf("?") + 6,
    LinkedInConnectReturnURL.lastIndexOf("&")
  );

  const GetLinkedInToken = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { linked_in_auth_code: LinkedInConnectCode };
    await axios
      .patch("/backend/api/users/me/linkedin/", body, config)
      .then(window.location.assign("/accounts/linkedin/success"));
  };

  const handleConnect = async () => {
    setLoading(true);
    await ConnectToLinkedin();
  };

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800, margin: "5px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} alt="Avatar" src={UserData.avatar}>
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
          <strong>TEST {UserData.first_name}</strong>
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
            1. Click on the Connect to LinkedIn Button
          </Typography>
          <Typography paragraph>
            2. You will be redirected to LinkedIn
          </Typography>
          <Typography paragraph>3. Grant Access to our App</Typography>
          <Typography paragraph>
            4. You will be redirected to Us again
          </Typography>
          <Typography paragraph>5. Click on Save LinkedIn Token</Typography>
          <Typography paragraph>6. Your LinkedIn is now Connected</Typography>
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
            loading={loading}
            onClick={handleConnect}
          >
            Connect to LinkedIn
          </LoadingButton>
        </CardContent>
      </Collapse>
      {/* Alert when the connection with LinkedIn went wrong */}
      {window.location.href.includes("/accounts/linkedin/?error") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
      {/* Alert when the connection with LinkedIn was successfully */}
      {window.location.href.includes("/accounts/linkedin/?code") ? (
        <Button
          variant="contained"
          onClick={GetLinkedInToken}
          style={{ width: "100%" }}
        >
          Save LinkedIn Token
        </Button>
      ) : null}
      {window.location.href.includes("/accounts/linkedin/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your LinkedIn account was successfully connected.
        </Alert>
      ) : null}
    </Card>
  );
}
