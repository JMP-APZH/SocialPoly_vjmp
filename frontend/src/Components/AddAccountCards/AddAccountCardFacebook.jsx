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
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
  Facebook,
} from "@mui/icons-material";

export default function AddAccountCardFacebook() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        title="Facebook"
        subheader="No Account Connected"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          You must connect your Facebook Account before you can use it.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Facebook"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </IconButton>
        <IconButton aria-label="register">
          {expanded ? <HowToReg /> : <PersonAdd />}
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
    </Card>
  );
}
