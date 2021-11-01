import React, { useEffect, useState } from "react";
import {
  FileDrop,
  PlatformButton,
  PostCreationWrapper,
  PostTextArea,
} from "./PostCreationStyle";
import {
  ButtonMain,
  ButtonMinor,
  PostScheduler,
} from "../../Components/Button/ButtonStyle";
import TwitterIcon from "../../assets/svgs/twitter-icon.svg";
import FacebookIcon from "../../assets/svgs/facebook-icon.svg";
import InstagramIcon from "../../assets/svgs/instagram-icon.svg";
import LinkedIn from "../../assets/svgs/linkedin-icon.svg";
import TiktokIcon from "../../assets/svgs/tiktok-icon.svg";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import DisplayPreview from '../Previews/DisplayPreview';

export default function PostCreation() {
  const theme = useTheme();
  const [statusTwitter, setStatusTwitter] = useState(false);
  const [statusFacebook, setStatusFacebook] = useState(false);
  const [statusInstagram, setStatusInstagram] = useState(false);
  const [statusLinkedIn, setStatusLinkedIn] = useState(false);
  const [statusTiktok, setStatusTiktok] = useState(false);
  const [previews, setPreviews] = useState([])
  const [dragOver, setDragOver] = useState(false);
  
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState("Upload Media");
  const [postText, setPostText] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [schedualPost, setSchedualPost] = useState(false);
  const [schedualTime, setSchedualTime] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm",
    onDrop: (acceptedFiles) => {
      setDragOver(false);
      setFileName(acceptedFiles[0].name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setFile(acceptedFiles);
    },
  });

  useEffect(() => {
      const previewsArray = []
      statusTwitter && previewsArray.push('Twitter')
      statusFacebook && previewsArray.push('Facebook')
      statusInstagram && previewsArray.push('Instagram')
      statusLinkedIn && previewsArray.push('Linked In')
      statusTiktok && previewsArray.push('Tik Tok')
      setPreviews(previewsArray)
  }, [statusTwitter, statusFacebook, statusInstagram, statusLinkedIn, statusTiktok])


  const postTwitter = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { title: draftTitle, content: postText };
    if (schedualPost && schedualTime) {
      body.send_time = schedualTime;
    }
    const response = await axios.post(
      `https://djpp.propulsion-learn.ch/backend/api/twitter/send/`,
      body,
      config
    );
    console.log(response);
  };
  const postButtonHandler = async () => {
    await postTwitter();
  };

  return (
    <PostCreationWrapper remainingText={280 - postText.length} theme={theme}>
      <div className="postWrapper">
        <div className="postContent">
          <div className="platformButtons">
            <PlatformButton
              onClick={() => setStatusTwitter(!statusTwitter)}
              active={statusTwitter}
            >
              <img src={TwitterIcon} alt="" />
            </PlatformButton>
            <PlatformButton
              onClick={() => setStatusLinkedIn(!statusLinkedIn)}
              active={statusLinkedIn}
            >
              <img src={LinkedIn} alt="" />
            </PlatformButton>
            <PlatformButton
              disabled
              onClick={() => setStatusFacebook(!statusFacebook)}
              active={statusFacebook}
            >
              <img src={FacebookIcon} alt="" />
            </PlatformButton>
            <PlatformButton
              disabled
              onClick={() => setStatusInstagram(!statusInstagram)}
              active={statusInstagram}
            >
              <img src={InstagramIcon} alt="" />
            </PlatformButton>
            <PlatformButton
              disabled
              onClick={() => setStatusTiktok(!statusTiktok)}
              active={statusTiktok}
            >
              <img src={TiktokIcon} alt="" />
            </PlatformButton>
          </div>

          <PostTextArea
            sx={{ boxShadow: 5, borderColor: "primary.dark" }}
            multiline
            label="Create new Post"
            name="textContent"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={10}
          ></PostTextArea>
          <span>{280 - postText.length} characters left</span>
        </div>

        <div className="postControls">
          <span>Updates</span>
          <TextField
            id="outlined-basic"
            label="Draft Title"
            variant="outlined"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            sx={{
              width: 220,
              boxShadow: 5,
              border: 2,
              borderColor: "primary.dark",
              borderRadius: "4px",
            }}
          />
          <ButtonMinor
            sx={{ boxShadow: 5, border: 2, borderColor: "primary.main" }}
          >
            Save Draft
          </ButtonMinor>
          <FormControlLabel
            control={
              <Switch
                checked={schedualPost}
                onChange={() => setSchedualPost(!schedualPost)}
                name="schedual"
              />
            }
            label="Schedule Post"
          />
          <PostScheduler
            value={schedualTime}
            onChange={(e) => setSchedualTime(e.target.value)}
            id="datetime-local"
            label="Schedule Post"
            type="datetime-local"
            sx={{
              width: 220,
              boxShadow: 5,
              border: 2,
              borderColor: "primary.dark",
            }}
            InputLabelProps={{ shrink: true }}
            variant="filled"
          />
          <ButtonMain
            onClick={() => postButtonHandler()}
            sx={{ boxShadow: 5, border: 2, borderColor: "primary.dark" }}
          >
            Post
          </ButtonMain>
          <ButtonMinor
            sx={{ boxShadow: 5, border: 2, borderColor: "primary.main" }}
          >
            Delete
          </ButtonMinor>
        </div>

        <div className="fileDropWrapper">
          <FileDrop className="test" dragover={dragOver}>
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
        </div>
      </div>

    { previews.length >= 1 &&
      // a key value is only needed here to force a re-render when the props change
      <DisplayPreview key={previews.length} image={filePreview} textContent={postText} previews={previews} />
    }
    </PostCreationWrapper>
  );
}
