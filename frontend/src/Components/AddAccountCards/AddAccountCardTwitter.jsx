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
        `https://socialpoly.ch/backend/api/users/me/twitter/`,
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
    window.location.assign(response.data.url);
  };

  let TwitterConnectReturnURL = window.location.href;

  const OauthToken = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("?") + 13,
    TwitterConnectReturnURL.lastIndexOf("&")
  );

  const OauthVerifier = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("=") + 1
  );
  const GetTwitterToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      oauth_token: OauthToken,
      oauth_verifier: OauthVerifier,
    };
    await axios.post(
      "https://socialpoly.ch/backend/api/twitter/verify/",
      body,
      config
    );
    await window.location.assign("/accounts/twitter/success");
  };

  const handleConnect = async () => {
    setLoading(true);
    await ConnectToTwitter();
  };

  const DisconnectFromTwitter = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      twitter_access_token: null,
      twitter_access_token_secret: null,
    };
    await axios.patch(
      "https://socialpoly.ch/backend/api/users/me/",
      body,
      config
    );
    await window.location.assign("/accounts/twitter/disconnectsuccess");
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await DisconnectFromTwitter();
  };

  return (
    <Card sx={{ maxWidth: 400, maxHeight: 800, margin: "5px" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            alt="Avatar"
            src={UserData.profile_image_url_https}
          >
            N/A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Twitter"
        subheader={
          UserData.screen_name ? UserData.screen_name : "No Account Connected"
        }
      />
      <CardContent>
        {UserData.screen_name ? (
          <span>
            <Typography sx={{ color: "primary.main" }}>
              <strong>Information about your connected Account:</strong>
            </Typography>

            <Typography>
              <strong>Username:</strong> {UserData.screen_name}
            </Typography>
            <Typography>
              <strong>Name:</strong> {UserData.name}
            </Typography>
            <Typography>
              <strong>Bio:</strong> {UserData.description}
            </Typography>
            <Typography>
              <strong>Followers:</strong> {UserData.followers_count}
            </Typography>
            <Typography>
              <strong>Following:</strong> {UserData.friends_count}
            </Typography>
            <Typography>
              <strong>Tweets:</strong> {UserData.statuses_count}
            </Typography>
          </span>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You must connect your Twitter Account before you can use it.
          </Typography>
        )}
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
          {UserData.screen_name ? (
            <HowToReg sx={{ color: "primary.main" }} />
          ) : (
            <PersonAdd />
          )}
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
          {UserData.screen_name ? (
            <span style={{ display: "flex", flexDirection: "column" }}>
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleConnect}
              >
                Change Connected Twitter Account
              </LoadingButton>
              <divider />
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleDisconnect}
                sx={{ bgcolor: red[500], mt: 1 }}
              >
                Remove Connected Twitter Account
              </LoadingButton>
            </span>
          ) : (
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleConnect}
            >
              Connect to Twitter
            </LoadingButton>
          )}
        </CardContent>
      </Collapse>
      {/* Alert when the connection with LinkedIn went wrong */}
      {window.location.href.includes("/accounts/twitter/?denied") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
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
      {/* Alert when the connection with Twitter was successfully */}
      {window.location.href.includes("/accounts/twitter/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Twitter account was successfully connected.
        </Alert>
      ) : null}
      {/* Alert when the disconnection with Twitter was successfully */}
      {window.location.href.includes("/accounts/twitter/disconnectsuccess") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Twitter account was successfully disconnected.
        </Alert>
      ) : null}
    </Card>
  );
}
