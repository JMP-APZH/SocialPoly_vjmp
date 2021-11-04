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
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
  Twitter,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AddAccountCardTwitter() {
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
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRegExpandClick = () => {
    setRegExpanded(!regExpanded);
  };

  const ConnectToTwitter = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(
      "https://socialpoly.ch/backend/api/twitter/auth/",
      config
    );
    window.location.assign(response.data.message);
  };

  let TwitterConnectReturnURL = window.location.href;

  const TwitterAccessToken = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("?") + 13,
    TwitterConnectReturnURL.lastIndexOf("&")
  );

  const TwitterAccessTokenSecret = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("=") + 1
  );
  const GetTwitterToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      twitter_access_token: TwitterAccessToken,
      twitter_access_token_secret: TwitterAccessTokenSecret,
    };
    await axios.patch(
      "https://socialpoly.ch/backend/api/users/me/",
      body,
      config
    );
    await window.location.assign("/accounts/twitter/success");
  };

  const handleConnect = async () => {
    setLoading(true);
    await ConnectToTwitter();
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
        title="Twitter"
        subheader="No Account Connected"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          You must connect your Twitter Account before you can use it.
          <strong>TEST {UserData.first_name}</strong>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Twitter"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
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
            1. Click on the Connect to Twitter Button
          </Typography>
          <Typography paragraph>
            2. You will be redirected to Twitter
          </Typography>
          <Typography paragraph>3. Grant Access to our App</Typography>
          <Typography paragraph>
            4. You will be redirected to Us again
          </Typography>
          <Typography paragraph>5. Click on Save Twitter Token</Typography>
          <Typography paragraph>6. Your Twitter is now Connected</Typography>
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
          <Typography paragraph>Twitter API Connection</Typography>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleConnect}
          >
            Connect to Twitter
          </LoadingButton>
        </CardContent>
      </Collapse>
      {/* Alert when the connection with Twitter was successfully */}
      {window.location.href.includes("/accounts/twitter/?oauth_token") ? (
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={GetTwitterToken}
          style={{ width: "100%" }}
        >
          Save Twitter Token
        </LoadingButton>
      ) : null}
      {window.location.href.includes("/accounts/twitter/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Twitter account was successfully connected.
        </Alert>
      ) : null}
    </Card>
  );
}
