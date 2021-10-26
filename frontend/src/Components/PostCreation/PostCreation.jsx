import React, { useState } from 'react'
import { PlatformButton, PostCreationWrapper, PostTextArea } from './PostCreationStyle'
import { ButtonMain, ButtonMinor } from '../../Components/Button/ButtonStyle';
import TwitterIcon from '../../assets/svgs/twitter-icon.svg'
import FacebookIcon from '../../assets/svgs/facebook-icon.svg'
import InstagramIcon from '../../assets/svgs/instagram-icon.svg'
import LinkedIn from '../../assets/svgs/linkedin-icon.svg'
import TiktokIcon from '../../assets/svgs/tiktok-icon.svg'
import TwitterPreview from '../Previews/TwitterPreview';

export default function PostCreation() {
    const [statusTwitter, setStatusTwitter] = useState(false)
    const [statusFacebook, setStatusFacebook] = useState(false)
    const [statusInstagram, setStatusInstagram] = useState(false)
    const [statusLinkedIn, setStatusLinkedIn] = useState(false)
    const [statusTiktok, setStatusTiktok] = useState(false)

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('Upload Media')
    const [postText, setPostText] = useState('')

    const postTextHandler = (e) => {
        setPostText(e.target.value)
    }

    const handlefileName = (e) => {
        setFileName(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    return (
        <PostCreationWrapper remainingText={280 - postText.length}>
            <div className='postWrapper'>
                <div className='postContent'>
                    <div className='platformButtons'>

                        <PlatformButton onClick={() => setStatusTwitter(!statusTwitter)} active={statusTwitter} ><img src={TwitterIcon} alt="" /></PlatformButton>
                        <PlatformButton disabled onClick={() => setStatusFacebook(!statusFacebook)} active={statusFacebook} ><img src={FacebookIcon} alt="" /></PlatformButton>
                        <PlatformButton disabled onClick={() => setStatusInstagram(!statusInstagram)} active={statusInstagram} ><img src={InstagramIcon} alt="" /></PlatformButton>
                        <PlatformButton disabled onClick={() => setStatusLinkedIn(!statusLinkedIn)} active={statusLinkedIn} ><img src={LinkedIn} alt="" /></PlatformButton>
                        <PlatformButton disabled onClick={() => setStatusTiktok(!statusTiktok)} active={statusTiktok} ><img src={TiktokIcon} alt="" /></PlatformButton>

                    </div>
                    <PostTextArea 
                    multiline 
                    label='Create new Post'
                    name="textContent"
                    value={postText}
                    onChange={postTextHandler}
                    rows={10}></PostTextArea>
                    <span>{280 - postText.length} characters left</span>
                    <ButtonMain 
                    fontSize='global.fontM'
                        variant="contained"
                        component="label"
                        texttransform='none'
                        >
                        {fileName}
                        <input
                            type="file"
                            accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm'
                            hidden
                            onChange={handlefileName}
                        />
                    </ButtonMain>
                </div>

                <div className='postControls'>
                    <span>Updates</span>
                    <ButtonMinor>Save Draft</ButtonMinor>
                    <ButtonMinor>Schedual</ButtonMinor>
                    <ButtonMain>Post</ButtonMain>
                    <ButtonMinor>Delete</ButtonMinor>
                </div>
            </div>
            <TwitterPreview />
        </PostCreationWrapper>
    )
}
