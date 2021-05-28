import React, {useContext, useState} from "react";
import CardDisplay from "./card";
import styled from "styled-components";
import {HomeContext} from './home'
import Button from "../../../components/Button/button";
import {ReactComponent as GuluSvg} from '../../svg/gulu.svg'
import {ReactComponent as PlusSvg} from '../../svg/plus.svg'
import {ReactComponent as DuckSvg} from "../../svg/duck.svg";
import {ReactComponent as VectorSvg} from "../../svg/Vector.svg";
import {ReactComponent as EmptySvg} from "../../svg/empty.svg";
import Modal from "../../../components/Modal/modal";
import ShowInput from "./showInput";
import Progress from "../../../components/Progress/progress";
import {formatDate} from "../../utilities/createData";

const Content = styled.div`
  height: 100%;
  transition: all 1.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  backface-visibility: hidden;
  box-shadow: 0 0 2rem 0 rgba(136,152,170,.15)!important;
  border-radius: 16px;
  background-image: linear-gradient(to right bottom, rgba(255,255,255,.6), rgba(255,255,255,.8));
`
const Money = styled.div`
  font-size: 62px;
  font-weight: bold;
  color: ${(props: {type: 'in' | 'out'}) => props.type === 'in' ? '#ffb100' : '#1cb0f6'};
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
const MoneyTip = styled.span`
  color: ${(props: {color: string}) => props.color};
  position: absolute;
  top: 50%;
  right: 18%;
  transform: translateY(-50%);
  font-size: 16px;
`
const Data = styled.div`
  margin-top: 15px;
  line-height: 45px;
  height: 45px;
  width: 100%;
  font-size: 22px;
  font-weight: normal;
  color: #afafaf;
  text-align: center;
`
const Weekend = styled.div`
  line-height: 20px;
  height: 15px;
  width: 100%;
  font-size: 18px;
  font-weight: normal;
  color: #afafaf;
  text-align: center;
`
const ButtonContainer = styled.div`
  width: 78%;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
  top: 70%;
  display: flex;
`
const DuckContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  & svg {
    width: 50%;
    height: 45%;
  }
`
const Details = styled.div`
  width: 35%;
  text-align: left;
  font-size: 18px;
  color: #ff9600;
`
const ButtonWrapper = styled.div`
  flex-grow: 1;
  & #color-target {
  fill: ${(props: {color:string}) => props.color}
  }
`
const Account = () => {
  const [showInput, setShowInput] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [active, setActive] = useState(false)
  const [thinking, setThinking] = useState(false)
  const context = useContext(HomeContext)
const handleClickGulu = () => {
    setShowModal(!showModal)
}
  const handlePlusClick = () => {
    setShowInput(!showInput)
  }
  const handleChangeCard = () => {
    setActive(!active)
  }
  const handleClickDate = () => {
    context.onResetToday()
  }
  return (
      <div className={'account-wrapper'}>
        <CardDisplay style={{
          transform: 'translateY(-30px) translateX(-50%)',
          position: 'absolute',
          left: '50%',
          width: '78%',
          height: '70%',
        }}>
          <Content style={{transform: active ? 'rotateY(-180deg)' : 'rotateY(0)'}}>
            <Data onClick={handleClickDate}>{context.current.day === context.todayFormat ? context.current.day + '今天' : context.current.day}</Data>
            <Weekend>{context.current.date.toLocaleDateString('zh-CN', {
                    weekday: 'short'
                  })}</Weekend>

            <Money type={'out'}>
              {context.current && context.current.value ? <div style={{
                display: "inline-block",
                transform: 'translateY(28px)'
              }}>
              </div> : null }

              {context.current && context.current.value
                  ? '-' + context.current.value
                  : <EmptySvg/>}

            </Money>

          </Content>
          <Content style={{transform: active ? 'rotateY(0)' : 'rotateY(180deg)', backgroundColor: '#fff5d3'}}>
            <Data onClick={handleClickDate}>{context.current.day === context.todayFormat
                ? context.current.day + '今天'
                : context.current.day}</Data>
            <Weekend>{context.current.date.toLocaleDateString('zh-CN', {
                  weekday: 'short'
                })}
            </Weekend>
            <Money type={'in'}>
              {context.current.inValue
                  ? '+' + context.current.inValue
                  : '+0'}
            </Money>
            <DuckContainer>
              <DuckSvg/>
            </DuckContainer>
          </Content>
        </CardDisplay>
        <ButtonContainer>
          <ButtonWrapper style={{marginRight: '15px'}}  color={active ? '#ffb100' : '#1cb0f6'}>
            <Button
                onClick={handlePlusClick}
                size={"full"}
                btnType={active ? "orange" : "primary"}>
              <PlusSvg width={'45px'} height={'45px'}/>
            </Button>
          </ButtonWrapper>
          <ButtonWrapper color={active ? '#ffb100' : '#1cb0f6'}>
            <Button
                onClick={handleClickGulu}
                size={"full"}
                btnType={"default"}>
              <GuluSvg width={'45px'} height={'45px'}/>
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
        <div onClick={handleChangeCard} className="sidebar-item-fly">
          <VectorSvg/>
        </div>
        <Modal alertController={handleClickGulu} showAlert={showModal}/>
        <ShowInput activeTag={''} active={active} showInput={showInput} onClickBG={handlePlusClick}/>
      </div>
  )
}

export default Account
