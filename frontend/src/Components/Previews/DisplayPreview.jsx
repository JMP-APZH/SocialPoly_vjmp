import React, { useState } from 'react'
import LinkedInPreview from './LinkedInPreview'
import TwitterPreview from './TwitterPreview'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';

export default function DisplayPreview(props) {
    const [previews, setPreviews] = useState(props.previews)
    const [activePreview, setActivePreview] = useState(0)

    const previewToDisplay = () => {
        if (previews[activePreview] === 'Twitter') {return (
            <TwitterPreview image={props.image} textContent={props.textContent} />
        )} else if (previews[activePreview] === 'Linked In') {return (
            <LinkedInPreview image={props.image} textContent={props.textContent} />
        )} else {return (
            <h1>Preview ERROR!</h1>
        )}
    }

    const backArrowHandler = () => {
        if ((activePreview - 1) < 0) {setActivePreview(previews.length - 1)}
        else {setActivePreview(activePreview - 1)}
    }
    const forwardArrowHandler = () => {
        if ((activePreview + 1) >= previews.length) {setActivePreview(0)}
        else {setActivePreview(activePreview + 1)}
    }

    return (
        <div className='previewWrapper'>
            <div className='previewTitle'>
                    <h3>{props.previews[activePreview]}</h3>
            </div>
            <div className="previewDisplay">
                <Button sx={{backgroundColor: '#1565c030', boxShadow: 5, borderColor: "primary.dark" }} className='backArrowButton' onClick={backArrowHandler} disabled={previews.length > 1 ? false : true} ><ArrowBackIosNewIcon /></Button>
                {previewToDisplay()}
                <Button sx={{ boxShadow: 5, borderColor: "primary.dark" }} className='forwardArrowButton' onClick={forwardArrowHandler} disabled={previews.length > 1 ? false : true} ><ArrowForwardIosIcon /></Button>
            </div>
        </div>
    )
}