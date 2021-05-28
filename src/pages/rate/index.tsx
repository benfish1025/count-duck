import React from "react";
import styled from "styled-components";
import CardDisplay from "../Display/Home/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const RatePage = ()=> {
  return (
      <Container>
        <Row>
          <CardDisplay tittle={'读书效率'}>
            <ChartsWrapper width={500} height={300}>
              <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis hide={true} dataKey="name" />
                <YAxis hide={true} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    strokeWidth={6}
                    dot={false}
                  activeDot={{ r: 8 }} />
                <Line
                    dot={false}
                    strokeWidth={6}
                    type="monotone"
                    dataKey="uv"
                    stroke="#82ca9d" />
              </LineChart>
            </ChartsWrapper>
          </CardDisplay>
          <CardDisplay tittle={'每日成果'}> </CardDisplay>
          <CardDisplay tittle={'每月效率'}> </CardDisplay>
        </Row>
      </Container>
  )
}

const Container = styled.div`
padding: 25px;
background-color: #f7f7f7;
height: 790px;
width: 100%;
`
const Row = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
`
interface ChartsWrapperProps {
  width: number,
  height: number
}
const ChartsWrapper = styled.div`
width: ${(props: ChartsWrapperProps) => props.width + 'px'};
height: ${(props: ChartsWrapperProps) => props.height + 'px'};
`
export default RatePage
