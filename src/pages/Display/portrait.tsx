import React from 'react'
import styled from "styled-components";

interface PortraitProps {
  name:string
}

const Portrait = ({ name }: PortraitProps)=> {
  return (
      <Container>
        <Image>{name[0]}</Image>
        <Name>{name}</Name>
      </Container>
  )
}
const Container = styled.div`
display: flex;
width: 200px;
margin: 55px auto 55px;
flex-direction: column;
align-items: center;
`

const Image = styled.div`
width: 65px;
height: 65px;
border-radius: 50%;
font-size: 2rem;
line-height: 65px;
text-align: center;
color: #ffffff;
background-color: #1cb0f6;
margin-bottom: 20px;
`
const Name = styled.p`
font-size: 2rem;
line-height: 2.5rem;
text-align: center;
white-space: nowrap;
`
export default Portrait
