import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GraphWrapper} from './AnalyticsStyles'


export default function TwitterPercentages() {
    const [data, setData] = useState(false)

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const {data} = await axios.get(`https://socialpoly.ch/backend/api/twitter/analitycs/`, config)
            let likes = 0
            let retweets = 0
            let total = 0
            data.forEach(element => {
                likes += element.likes
                retweets += element.retweet_count
                total += 1
            });
            const newData = {likes, retweets, total}
            setData(newData)
        }
        !data && getData()
    }, [data])


    return (
        <div >
        {data && 
            <GraphWrapper >
                <div className='percentWrapper'>
                    <span>Tweet Like percent</span>
                    <h5>{(100 / data.total * data.likes).toFixed(0)}%</h5>
                </div>
                <div className='percentWrapper'>
                    <span>Retweet percent</span>
                    <h5>{(100 / data.total * data.retweets).toFixed(0)}%</h5>
                </div>
            </GraphWrapper>
        }
        </div>
    )
}
