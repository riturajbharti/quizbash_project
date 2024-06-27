'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

type Props = {}

const data =[
  {
    text:"Mumbai",
    value:3,
  },
  {
    text:"Delhi",
    value:5,
  },
  {
    text:"Kolkata",
    value:9,
  },
  {
    text:"Chennai",
    value:4,
  }
]

const fontSizeMapper = (word :{value:number}) =>{
  return Math.log2(word.value)*5+16
}

const CustomWordCloud = (props: Props) => {
  const theme=useTheme()
  return (
    <>
        <D3WordCloud
          data={data}
          height={550}
          font="Times"
          fontSize={fontSizeMapper}
          rotate={0}
          padding={10}
          fill={theme.theme == 'dark' ? 'white':'black'}

        />
    </>
    
  )
}

export default CustomWordCloud