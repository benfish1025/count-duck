import React, {useContext, useState} from "react";
import Message from "../../../components/Message/message";
import styled from "styled-components";
import {ReactComponent as YuleSvg} from '../../svg/yule.svg'
import Input from "../../../components/Input/input";
import RadioGroup from "../../../components/Radio/radioGroup";
import Radio from "../../../components/Radio/radio";
import Button from "../../../components/Button/button";
import {HomeContext} from "./home";
interface ShowInputProps {
  showInput: boolean,
  onClickBG: () => void,
  activeTag: string,
  active: boolean
}
const TagField = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 38px 32px 58px 32px;
  width: 100%;
  background-color: #E9EBF0;
`

const TagCard = styled.div`
  padding: 15px;
  border-radius: 12px;
  background-color: ${(props:{active: boolean}) => props.active ? '#fff5d3' : '#ddf4ff'};
  display: inline-flex;
  align-items: center;
  margin-bottom: 15px;
  white-space: nowrap;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props:{active: boolean}) => props.active ? '#ffc800' : '#84d8ff'};
  overflow: hidden;
`

const TittleWrapper = styled.div`
  text-align: center;
  height: 100%;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`
const NumberField = styled.div`
  padding: 38px 32px 58px 32px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const NumberInput = styled.div`
  width: 100%;
  padding: 8px 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  color: ${(props:{active: boolean}) => props.active ? '#ff9600' : '#1899d6'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 95px;
  font-size: 33px;
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
`
const FieldName = styled.h1`
  color: rgba(0,0,0,.2);
  margin-bottom: 10px;
`
const ShowInput = ({activeTag, showInput, onClickBG, active}: ShowInputProps) => {
  const [value, setValue] = useState<string>('0')
  const context = useContext(HomeContext)
    const labels = ['吃饭', '娱乐', '衣服', '日用品', '投资', '个人成长']
    const [tag, setTag] = useState<string>(activeTag)
  const handleExited = () => {
    if (!context.current.moneyIn && context.dispatch) {
      context.dispatch({type: active ? "ADD_DATE_MONEY_IN" : "ADD_DATE_MONEY_OUT",
        payload: {
          tag: tag,
          value: Number(value)
        }})
    } else if (context.current.moneyIn && context.dispatch) {
      context.dispatch({type: active ? "ADD_MONEY_IN" : "ADD_MONEY_OUT",
        payload: {
          day: context.todayFormat,
          tag: tag,
          value: Number(value)
        }})
    }
    setTag('')
    setValue('0')
  }
  const handleClickTag = (tag: string) => {
      setTag(tag)
  }
  const handleClickInputTag = () => {
    setTag('')
  }
 const helpValueLength = () => {
    return value.substr(-3)[0] === '.' || value.includes('.') && value.length >= 8 || !value.includes('.') && value.length >= 5
 }
  const handleKeyBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    switch (target.innerText) {
      case '清空': {
        setValue('0')
        break
      }
      case '确认': {
        onClickBG()
        break
      }
      case '删除': {
        if (value.length === 1) {
          setValue('0')
        } else {
          setValue(value.slice(0, value.length-1))
        }
        break
      }
      // case '0': {
      //   if (value.includes('.') && value[value.length - 1] === '0') {
      //     setValue(`${Number(value)}`)
      //   } else {
      //     setValue(value.concat(target.innerText))
      //   }
      //   break
      // }
      case '.': {
        if (!value || value === '.') {
          setValue(0 + '.')
        } else if (value.includes('.')) {
          break
        } else {
          setValue(value.concat('.'))
        }
        break
      }
      default: {
        if (helpValueLength()) {
          break
        } else if (value.length === 1 && value === '0') {
          setValue(target.innerText)
        } else {
          setValue(value.concat(target.innerText))
        }

        break
      }
    }
  }
  const renderTagField = () => {
      return (
          <TagField>
            <FieldName>选择标签</FieldName>
            <div style={{
              display: "flex",
              flexWrap: 'wrap',
              flexDirection: 'row'
            }}>
              <RadioGroup radioStyle={"button"} onChange={handleClickTag}>
                {labels.map((item, index) => {
                return (
                      <Radio key={index} value={item}>{item}</Radio>
                )
              })}
              </RadioGroup>
            </div>

          </TagField>
      )
  }

  const renderNumberField = () => {
      return (
          <NumberField>
            <FieldName>键入数额</FieldName>
            <TagCard style={{width: '45%'}} active={active} onClick={handleClickInputTag}>
              <div style={{
                width: '6px',
                height: '80%',
                borderRadius: '8px',
                backgroundColor: active ? '#ff9600' : '#1cb0f6'
              }}/>
              <div style={{
                flexGrow: 1,
                marginLeft: '15px',
                color: active ? '#ff9600' : '#1899d6',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>{tag}</div>
            </TagCard>

            <NumberInput active={active}>{value}</NumberInput>

            <div className="count-input-container" onClick={handleKeyBoardClick}>
              <div className="count-input-item count-input-item--1">1</div>
              <div className="count-input-item count-input-item--2">2</div>
              <div className="count-input-item count-input-item--3">3</div>
              <div className="count-input-item count-input-item--4">4</div>
              <div className="count-input-item count-input-item--5">5</div>
              <div className="count-input-item count-input-item--6">6</div>
              <div className="count-input-item count-input-item--7">7</div>
              <div className="count-input-item count-input-item--8">8</div>
              <div className="count-input-item count-input-item--9">9</div>
              <div className="count-input-item count-input-item--10">0</div>
              <div className="count-input-item count-input-item--11">.</div>
              <div className="count-input-item count-input-item--12">删除</div>
              <div className="count-input-item count-input-item--13">清空</div>
              <div className="count-input-item count-input-item--14">确认</div>
            </div>
          </NumberField>
      )
  }
    return (
      <Message onExited={handleExited} onClickBG={onClickBG} showMessage={showInput}>
        {
          tag ? renderNumberField() : renderTagField()
        }
      </Message>
    )
}



export default ShowInput
