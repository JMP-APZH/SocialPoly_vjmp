import React from "react";
import AddAccountCardTwitter from "../../Components/AddAccountCards/AddAccountCardTwitter";
import AddAccountCardFacebook from "../../Components/AddAccountCards/AddAccountCardFacebook";
import AddAccountCardInstagram from "../../Components/AddAccountCards/AddAccountCardInstagram";
import AddAccountCardLinkedIn from "../../Components/AddAccountCards/AddAccountCardLinkedIn";
import AddAccountCardTikTok from "../../Components/AddAccountCards/AddAccountCardTikTok";
import { Grid } from "@mui/material";

export default function Accounts() {
  return (
    <Grid container direction="row" justifyContent="space-around">
      <AddAccountCardTwitter />
      <AddAccountCardFacebook />
      <AddAccountCardInstagram />
      <AddAccountCardLinkedIn />
      <AddAccountCardTikTok />
    </Grid>
  );
}
