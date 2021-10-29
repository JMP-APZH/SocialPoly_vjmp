import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
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

export default function AddAccountCardLinkedIn() {
  const [expanded, setExpanded] = React.useState(false);
  const [regExpanded, setRegExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRegExpandClick = () => {
    setRegExpanded(!regExpanded);
  };

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
          <Button variant="contained">Connect to LinkedIn</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
