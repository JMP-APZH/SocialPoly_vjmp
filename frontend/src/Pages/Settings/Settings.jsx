import React, { useState } from "react";
import { SettingsMain, FormDiv } from "./SettingsStyle";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Settings({ UserData }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  return (
    <SettingsMain>
      <FormDiv>
        <TextField
          disabled
          fullWidth
          label="Username"
          id="fullWidth"
          margin="dense"
          defaultValue={UserData.username}
        />
        <TextField
          disabled={Disabled}
          fullWidth
          label="Firstname"
          id="fullWidth"
          margin="dense"
          defaultValue={UserData.first_name}
        />
        <TextField
          disabled={Disabled}
          fullWidth
          label="Lastname"
          id="fullWidth"
          margin="dense"
          defaultValue={UserData.last_name}
        />
        <TextField
          disabled={Disabled}
          fullWidth
          label="E-Mail"
          id="fullWidth"
          margin="dense"
          defaultValue={UserData.email}
        />
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ShowPassword ? "text" : "password"}
            /* value={password} */
            /* onChange={handleChange('password')} */
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  /* onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword} */
                  edge="end"
                >
                  {ShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password confirmation
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ShowPassword ? "text" : "password"}
            /* value={password} */
            /* onChange={handleChange('password')} */
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  /* onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword} */
                  edge="end"
                >
                  {ShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </FormDiv>
    </SettingsMain>
  );
}
