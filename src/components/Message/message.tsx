import React, {ReactNode} from 'react'
import ReactDOM from 'react-dom'
import Button, {ButtonSize} from "../Button/button";
import Transition from '../Transition/transition'
import ClassNames from 'classnames'


export type MessageType = 'success' | 'primary' | 'error'
export interface MessageProps {
  type?: MessageType,
  btnText?: string,
  btnSize?: ButtonSize,
  tittle?: string,
  info?: string,
  onClickButton?: () => void,
  onClickBG?: () => void,
  onClose?: () => void,
  onExited?: () => void,
  duration?: number,
  showButton?: boolean,
  showMessage?: boolean
  bgSvg?: ReactNode
}

const Message: React.FC<MessageProps> = (props) => {
  const {onExited, bgSvg, children, onClickBG, showMessage, type = 'success', } = props
  const messageTypeClasses = ClassNames('message-wrapper', {
    [`is-${type}`]: type
  })
  const handleClickBG = () => {
    if (onClickBG) {
      onClickBG()
    }
  }
  const renderMessage = () => {

      return (
          <>
            <Transition in={showMessage} timeout={300} classNames={'alert-background'}>
              <div onClick={handleClickBG} className={'alert-fullscreen'}>
                <div style={{width: "100%", height: "15%"}}>
                  {bgSvg}
                </div>
              </div>
            </Transition>

            <Transition onExited={onExited} timeout={300} in={showMessage} classNames={'spread'}>
              <div className={messageTypeClasses}>
                {children}
              </div>
            </Transition>

          </>
      )

  }
   return ReactDOM.createPortal(renderMessage(), document.getElementById('dialog-container') as Element)
}
export default Message
