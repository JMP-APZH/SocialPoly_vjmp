import React from 'react'
import { TwitterPreviewWrapper } from './TwitterPreviewStyle'
import RetweetIcon from '../../assets/svgs/twitter-retweet.svg'
import CommentIcon from '../../assets/svgs/twitter-comment.svg'
import LikeIcon from '../../assets/svgs/twitter-like.svg'
import ShareIcon from '../../assets/svgs/twitter-share.svg'
import MoreIcon from '../../assets/svgs/more_horiz.svg'
import DefaultIcon from '../../assets/images/default-user-icon.png'

export default function TwitterPreview() {
    return (
        <TwitterPreviewWrapper>
            <div className='twitterPostWrapper'>
                <div className='postHeader'>
                    <img className='profileIcon' src={DefaultIcon} alt="" />
                    <div className='nameWrapper'>
                        <h6>dunkey</h6>
                        <span>@vgdunkey</span>
                    </div>
                    <button><img src={MoreIcon} alt="more" /></button>
                </div>
            </div>
        </TwitterPreviewWrapper>
    )
}
