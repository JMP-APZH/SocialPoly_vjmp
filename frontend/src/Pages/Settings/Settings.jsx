import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDropzone } from "react-dropzone";
import { SettingsMain, FormDiv, FileDrop } from "./SettingsStyle";
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  ButtonGroup,
  Button,
  Card,
  RadioGroup,
  Radio,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Visibility,
  VisibilityOff,
  Save,
  Edit,
  FormatColorFill,
} from "@mui/icons-material";
/* import { setToLS, getFromLS } from "./utils/storage"; */

export default function Settings({
  UserData,
  UserAvatar,
  CustomUserTheme,
  SaveCustomUserTheme,
}) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Disabled, setDisabled] = useState(false);

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState(null);
  const [RadioValue, setRadioValue] = React.useState("PrimaryLightColor");

  const [PrimaryLightColor, setPrimaryLightColor] = useState(
    CustomUserTheme.PrimaryLightColor
  );
  const [SecondaryLightColor, setSecondaryLightColor] = useState(
    CustomUserTheme.SecondaryLightColor
  );
  const [BackgroundLightColor, setBackgroundLightColor] = useState(
    CustomUserTheme.BackgroundLightColor
  );
  const [PrimaryDarkColor, setPrimaryDarkColor] = useState(
    CustomUserTheme.PrimaryDarkColor
  );
  const [SecondaryDarkColor, setSecondaryDarkColor] = useState(
    CustomUserTheme.SecondaryDarkColor
  );
  const [BackgroundDarkColor, setBackgroundDarkColor] = useState(
    CustomUserTheme.BackgroundDarkColor
  );

  const CustomTheme = {
    PrimaryLightColor: PrimaryLightColor,
    SecondaryLightColor: SecondaryLightColor,
    BackgroundLightColor: BackgroundLightColor,
    PrimaryDarkColor: PrimaryDarkColor,
    SecondaryDarkColor: SecondaryDarkColor,
    BackgroundDarkColor: BackgroundDarkColor,
  };

  const PresetColors = [
    { color: "#1976d2", title: "Primary Light default" },
    { color: "#90caf9", title: "Primary Dark default" },
    { color: "#f44336", title: "Secondary Light default" },
    { color: "#ce93d8", title: "Secondary Dark default" },
    { color: "#f44336", title: "error" },
    { color: "#ffa726", title: "warning" },
    { color: "#29b6f6", title: "info" },
    { color: "#66bb6a", title: "success" },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm",
    onDrop: (acceptedFiles) => {
      setDragOver(false);
      setFileName(acceptedFiles[0].name);
      setFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handlePLColorChange = (color) => {
    setPrimaryLightColor(color.hex);
  };
  const handleSLColorChange = (color) => {
    setSecondaryLightColor(color.hex);
  };
  const handleBLColorChange = (color) => {
    setBackgroundLightColor(color.hex);
  };
  const handlePDColorChange = (color) => {
    setPrimaryDarkColor(color.hex);
  };
  const handleSDColorChange = (color) => {
    setSecondaryDarkColor(color.hex);
  };
  const handleBDColorChange = (color) => {
    setBackgroundDarkColor(color.hex);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    return event.target.value;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Settings</h1>
      <h2>Change your Profile Settings</h2>
      <SettingsMain style={{ marginBottom: "30px" }}>
        <FormDiv>
          <FileDrop
            className="test"
            dragover={dragOver}
            style={{
              backgroundImage: `url(${UserAvatar})`,
            }}
          >
            <div
              className="fileDrop"
              {...getRootProps()}
              onDragEnter={() => setDragOver(true)}
            >
              <input {...getInputProps()} />
              <p>{fileName}</p>
            </div>

            <div
              className="dragOverlay"
              {...getRootProps()}
              onDragLeave={() => setDragOver(false)}
            >
              <input {...getInputProps()} />
            </div>
          </FileDrop>
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
          {/* <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={ShowPassword ? "text" : "password"}
              value={password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
              value={password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {ShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            color="primary"
            onClick={handleClick}
        loading={loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="contained"
          >
            Save
          </LoadingButton> */}
          <span
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h3>Customize the Theme Colors</h3>
            <FormatColorFill />
          </span>
          <h4>Light Theme (most bright Background and bright colors)</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "10px",
            }}
          >
            <Card
              sx={{
                backgroundColor: BackgroundLightColor,
                width: "100%",
                boxShadow: "-1px -2px 6px 0px",
                "&:hover": {
                  boxShadow: "0px 0px 20px 0px",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: PrimaryLightColor,
                  width: "40%",
                  m: "5%",
                  color: "white",
                }}
              >
                Primary Light
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: SecondaryLightColor,
                  width: "40%",
                  m: "5%",
                  color: "white",
                }}
              >
                Secondary Light
              </Button>
            </Card>
          </div>
          <h4>Dark Theme (most dark background and soft colors)</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "10px",
            }}
          >
            <Card
              sx={{
                backgroundColor: BackgroundDarkColor,
                width: "100%",
                boxShadow: "-1px -2px 6px 0px",
                "&:hover": {
                  boxShadow: "0px 0px 20px 0px",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: PrimaryDarkColor,
                  width: "40%",
                  m: "5%",
                  color: "black",
                }}
              >
                Primary Dark
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: SecondaryDarkColor,
                  width: "40%",
                  m: "5%",
                  color: "black",
                }}
              >
                Secondary Dark
              </Button>
            </Card>
          </div>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ textAlign: "center", color: "inherit" }}
              >
                Which Component would you like to change?
              </FormLabel>
              <RadioGroup
                row
                aria-label="Component"
                name="row-radio-buttons-group"
                value={RadioValue}
                onChange={handleRadioChange}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="PrimaryLightColor"
                  control={<Radio />}
                  label="Primary Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="SecondaryLightColor"
                  control={<Radio />}
                  label="Secondary Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="BackgroundLightColor"
                  control={<Radio />}
                  label="Background Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="PrimaryDarkColor"
                  control={<Radio />}
                  label="Primary Dark"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="SecondaryDarkColor"
                  control={<Radio />}
                  label="Secondary Dark"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="BackgroundDarkColor"
                  control={<Radio />}
                  label="Background Dark"
                  sx={{ width: "30%" }}
                />
              </RadioGroup>
            </FormControl>
            {RadioValue === "PrimaryLightColor" ? (
              <SketchPicker
                color={PrimaryLightColor}
                onChange={handlePLColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            {RadioValue === "SecondaryLightColor" ? (
              <SketchPicker
                color={SecondaryLightColor}
                onChange={handleSLColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            {RadioValue === "BackgroundLightColor" ? (
              <SketchPicker
                color={BackgroundLightColor}
                onChange={handleBLColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            {RadioValue === "PrimaryDarkColor" ? (
              <SketchPicker
                color={PrimaryDarkColor}
                onChange={handlePDColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            {RadioValue === "SecondaryDarkColor" ? (
              <SketchPicker
                color={SecondaryDarkColor}
                onChange={handleSDColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            {RadioValue === "BackgroundDarkColor" ? (
              <SketchPicker
                color={BackgroundDarkColor}
                onChange={handleBDColorChange}
                presetColors={PresetColors}
              />
            ) : null}
            <Button
              variant="contained"
              onClick={() => SaveCustomUserTheme(CustomTheme)}
            >
              Save
            </Button>
          </span>
        </FormDiv>
      </SettingsMain>
    </div>
  );
}
