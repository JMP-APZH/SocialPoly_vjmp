import React from 'react'
import { PostCreationWrapper, TestButton } from './PostCreationStyle'
import { ButtonMain, ButtonMinor } from '../../Components/Button/ButtonStyle';

export default function PostCreation() {
    return (
        <PostCreationWrapper>
            <div className='postWrapper'>
                <div className='postContent'>
                    <textarea name="textContent" id="" cols="50" rows="10"></textarea>
                    <TestButton variant="contained">Hello World</TestButton>
                    {/* <Button
                        variant="contained"
                        component="label"
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button> */}
                </div>

                <div className='postControls'>
                    <span>Updates</span>
                    <ButtonMinor>Save Draft</ButtonMinor>
                    <ButtonMinor>Schedual</ButtonMinor>
                    <ButtonMain>Post</ButtonMain>
                    <ButtonMinor>Delete</ButtonMinor>
                </div>
            </div>
        </PostCreationWrapper>
    )
}
