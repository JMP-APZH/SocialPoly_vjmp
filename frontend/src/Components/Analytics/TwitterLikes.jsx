import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {CustomToolTipWrapper, GraphWrapper} from './TwitterLikesStyles'
import { useTheme } from "@mui/material/styles";


export default function TwitterLikes() {
    // const [chartType, setChartType] = useState(false)
    // const [data, setData] = useState(false)
    const theme = useTheme()
    const data = [
        {likes: 5, created_at_short: 'FAKE DATA', created_at: 'this is a date LONG', content: 'this is the tweet content1' },
        {likes: 3, created_at_short: 'FAKE DATA', created_at: 'this is a date LONG', content: 'this is the tweet content2' },
        {likes: 6, created_at_short: 'FAKE DATA', created_at: 'this is a date LONG', content: 'this is the tweet content3' },
        {likes: 1, created_at_short: 'FAKE DATA', created_at: 'this is a date LONG', content: 'this is the tweet content4' },
        {likes: 2, created_at_short: 'FAKE DATA', created_at: 'this is a date LONG', content: 'this is the tweet content5' },
    ]

    function CustomTooltip({ payload, label, active }) {
        if (active) {
          return (
            <CustomToolTipWrapper >
            <div className="customTooltip">
              <p className="label">{payload[0].payload.created_at}</p>
              <p className='likes'>Likes: {payload[0].value}</p>
              <p className='content'>{payload[0].payload.content}</p>
            </div>
            </CustomToolTipWrapper>
          );
        }
      
        return null;
      }

    // useEffect(() => {
    //     async function getData() {
    //         const token = localStorage.getItem("token");
    //         const config = { headers: { Authorization: `Bearer ${token}` } };
    //         const {data} = await axios.get(`https://socialpoly.ch/backend/api/twitter/analitycs/`, config)
    //         data.forEach(element => {
    //             element.created_at_short = element.created_at.substring(0, 10)
    //         });
    //         setData(data.slice(0, 5))
    //         console.log('~ response.data', data)
    //     }
    //     !data && getData()
    // }, [data])

    const renderLineChart = () => {
        return (
            <GraphWrapper >
            <ResponsiveContainer width='100%' aspect={2} >
            <LineChart width={100} height={400} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }} >
                <Line type="monotone" dataKey="likes" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 6 }} />
                <YAxis dataKey='likes'/>
                <XAxis dataKey="created_at_short" />
                <CartesianGrid stroke={theme.palette.grey[500]} strokeDasharray='3 3' />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
            </ResponsiveContainer>
            </GraphWrapper>
        )};

    return (
        <div>
            {data && renderLineChart()}
            {/* {data && <span>{data[0].likes}test</span> } */}
        </div>
    )
}
