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
import DisplayPreview from "../Previews/DisplayPreview";
import PostError from "./PostError";

export default function PostCreation() {
  const theme = useTheme();
  const [statusTwitter, setStatusTwitter] = useState(false);
  const [statusFacebook, setStatusFacebook] = useState(false);
  const [statusInstagram, setStatusInstagram] = useState(false);
  const [statusLinkedIn, setStatusLinkedIn] = useState(false);
  const [statusTiktok, setStatusTiktok] = useState(false);

  const [errorTime, setErrorTime] = useState(false);
  const [errorPlatform, setErrorPlatform] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false)

  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState("Upload Media");
  const [postText, setPostText] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [schedualPost, setSchedualPost] = useState(false);
  const [schedualTime, setSchedualTime] = useState("");
  const [link, setLink] = useState('');

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

  useEffect(() => {
    const previewsArray = [];
    statusTwitter && previewsArray.push("Twitter");
    statusFacebook && previewsArray.push("Facebook");
    statusInstagram && previewsArray.push("Instagram");
    statusLinkedIn && previewsArray.push("Linked In");
    statusTiktok && previewsArray.push("Tik Tok");
    setPreviews(previewsArray);
  }, [
    statusTwitter,
    statusFacebook,
    statusInstagram,
    statusLinkedIn,
    statusTiktok,
  ]);

  const postTwitter = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = new FormData();
    body.append("title", draftTitle);
    body.append("content", postText);
    if (schedualPost) {
      if (schedualTime) {
        let timeString = schedualTime;
        timeString = timeString.replace("T", " ");
        timeString += ":00";
        body.append("send_time", timeString);
      } else {
        setErrorTime(true);
        return null;
      }
    } else {
      body.append("send_time", "");
    }
    if (file) {
      body.append("images", file);
    }

    const response = await axios
      .post(`https://socialpoly.ch/backend/api/twitter/send/`, body, config, {
        validateStatus: (status) => {
          return true; // Always give return status
        },
      })
      .catch(function (error) {
        //   console.log(error.response)
        if (error.response) {return error.response} else {return {status: 413}}
      });
    if (response.status >= 200 && response.status < 300) {
      setSuccessAlert(true);
    } else if (response.status === 413) {
      setErrorSize(true);
    } else {
      setErrorAlert(true);
    }
  };

  const postLinkedIn = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = new FormData();
    // body.append("title", draftTitle);
    body.append("content", postText);
    body.append('link', link)
    if (schedualPost) {
      if (schedualTime) {
        let timeString = schedualTime;
        timeString = timeString.replace("T", " ");
        timeString += ":00";
        body.append("post_date_time", timeString);
      } else {
        setErrorTime(true);
        return null;
      }
    } else {
      body.append("post_date_time", "");
    } 
    if (file) {
      body.append("image", file);
    }

    const response = await axios
      .post(`https://socialpoly.ch/backend/api/linkedin/posts/`, body, config, {
        validateStatus: (status) => {
          return true; // Always give return status
        },
      })
      .catch(function (error) {
          console.log(error.response)
        if (error.response) {return error.response} else {return {status: 413}}
      });
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      setSuccessAlert(true);
    } else if (response.status === 413) {
      setErrorSize(true);
    } else {
      setErrorAlert(true);
    }
  };

  const postButtonHandler = async () => {
    if (
      !statusTwitter &&
      !statusFacebook &&
      !statusInstagram &&
      !statusLinkedIn &&
      !statusTiktok
    ) {
      setErrorPlatform(true);
    } else if (!postText.replace(/\s/g, "")) {
      setErrorContent(true);
    } else if (!draftTitle.replace(/\s/g, "")) {
      setErrorTitle(true);
    } else {
      statusTwitter && (await postTwitter());
      statusLinkedIn && (await postLinkedIn());
    }
  };

  const closeErrors = () => {
    setErrorTime(false);
    setErrorPlatform(false);
    setSuccessAlert(false);
    setErrorAlert(false);
    setErrorSize(false);
    setErrorContent(false);
    setErrorTitle(false)
  };

  return (
    <PostCreationWrapper remainingText={280 - postText.length} theme={theme}>
      {errorTitle && <PostError closeErrors={closeErrors} type='title' /> }
      {errorSize && <PostError closeErrors={closeErrors} type="size" />}
      {successAlert && <PostError closeErrors={closeErrors} type="success" />}
      {errorTime && <PostError closeErrors={closeErrors} type="time" />}
      {errorPlatform && <PostError closeErrors={closeErrors} type="platform" />}
      {errorContent && <PostError closeErrors={closeErrors} type="content" />}
      {errorAlert && <PostError closeErrors={closeErrors} type="error" />}
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
          {statusLinkedIn && <TextField id="outlined-basic" label="Link" placeholder='Linked in only' variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} sx={{margin: '10px', boxShadow: 5}} />}
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
              outlineColor: "primary.dark",
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
            disabled={!schedualPost}
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

      {previews.length >= 1 && (
        // a key value is only needed here to force a re-render when the props change
        <DisplayPreview
          key={previews.length}
          image={filePreview}
          textContent={postText}
          previews={previews}
        />
      )}
    </PostCreationWrapper>
  );
}
