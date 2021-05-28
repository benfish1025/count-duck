
import React, {CSSProperties} from 'react'
import styled from "styled-components";

interface CardProps {
  tittle?: string,
  style?: CSSProperties
}

const CardDisplay: React.FC<CardProps> = ({style, tittle, children }) => {
  return (
      <Container style={style}>
        { tittle && <Tittle>{tittle}</Tittle>}
        {children}
      </Container>
  )
}
const Container = styled.div`
display: inline-block;
min-width: 100px;
min-height: 8.7rem;
perspective: 160rem;
-moz-perspective: 150rem;
position: relative;
`

const Tittle = styled.p`
font-size: 1.6rem;
height: 48px;
font-weight: 700;
line-height: 52px;
padding-left: 10px;
border-bottom: #e5e5e5 1px solid;
color: #4b4b4b;
`
export default CardDisplay
