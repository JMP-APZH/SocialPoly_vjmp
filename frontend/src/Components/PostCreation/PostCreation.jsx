import React, { useState } from "react";
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
import TwitterPreview from "../Previews/TwitterPreview";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import axios from 'axios'

export default function PostCreation() {
  const theme = useTheme();
  const [statusTwitter, setStatusTwitter] = useState(false);
  const [statusFacebook, setStatusFacebook] = useState(false);
  const [statusInstagram, setStatusInstagram] = useState(false);
  const [statusLinkedIn, setStatusLinkedIn] = useState(false);
  const [statusTiktok, setStatusTiktok] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState("Upload Media");
  const [postText, setPostText] = useState("");

  const postTextHandler = (e) => {
    setPostText(e.target.value);
  };
  const postButtonHandler = async () => {
        const token = localStorage.getItem('token')
        const config = {headers: {Authorization: `Bearer ${token}`}}
        const response = await axios.post( `https://djpp.propulsion-learn.ch/backend/api/twitter/send/`, {
            title: 'title',
            content: postText,
            send_time: "2021-10-29T15:47:53.074Z",
            },
            config)
        console.log(response)
  }

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
              onClick={() => setStatusLinkedIn(!statusLinkedIn)}
              active={statusLinkedIn}
            >
              <img src={LinkedIn} alt="" />
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
            onChange={postTextHandler}
            rows={10}
          ></PostTextArea>
          <span>{280 - postText.length} characters left</span>
        </div>

        <div className="postControls">
          <span>Updates</span>
            <ButtonMinor sx={{boxShadow:5,border:2,borderColor:'primary.main'}}>Save Draft</ButtonMinor>
            {/* <ButtonMinor sx={{boxShadow:5,border:2,borderColor:'primary.main'}}>Schedule</ButtonMinor> */}
            <PostScheduler id="datetime-local" label="Schedule Post" type="datetime-local" sx={{backgroundColor:'white',width: 220,boxShadow:5,border:2,borderColor:'primary.dark'}} InputLabelProps={{shrink: true}} variant="filled" />
            <ButtonMain onClick={() => postButtonHandler()} sx={{boxShadow:5,border:2,borderColor:'primary.dark'}}>Post</ButtonMain>
            <ButtonMinor sx={{boxShadow:5,border:2,borderColor:'primary.main'}}>Delete</ButtonMinor>
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

      <div className="previewWrapper">
        <TwitterPreview image={filePreview} textContent={postText} />
      </div>
    </PostCreationWrapper>
  );
}
