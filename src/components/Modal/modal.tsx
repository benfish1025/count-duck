import React, {useRef} from 'react'
import ReactDOM from 'react-dom'
import ClassNames from 'classnames'
import Transition from '../Transition/transition'
import useDebounce from "../../hooks/useDebounce";

interface AlertProps {
    alertController: () => void,
    showAlert: boolean,
    children?: React.ReactNode,
    className?: string,
    tittle?: string,
    section?: string,
    detail?: string
}

const Modal: React.FC<AlertProps> = (props) => {
    const {
        children,
        tittle,
        section,
        detail,
        showAlert,
        alertController,
        className } = props
    const ani = useRef<HTMLDivElement>(null)
    const helpAppear = () => {
        if (showAlert) {
            return debouncAppear
        } else {
            return showAlert
        }
    }
    const debouncAppear = useDebounce(showAlert, 200)
    const classes = ClassNames('alert-fullscreen',className,
        {
            [`alert-${showAlert}`]: showAlert
        })
    const renderModal = () => {
        return (
            <>
                <Transition in={showAlert} timeout={300} classNames={'alert-background'}>
                    <div ref={ani} className={classes}>

                    </div>
                </Transition>
                <Transition in={helpAppear()} timeout={200} classNames={'alert-background'}>
                    <div className={'alert-container'}>
                        <div className="alert-container__closer" onClick={alertController}>
                            <img src="//duolingo-forum-web.duolingo.com/images/x.svg" />
                        </div>
                        <div className="alert-content">
                            {tittle && <h1 className={'alert-content__tittle'}>{tittle}</h1>}
                            {section && <div className={'alert-content__section'}>{section}</div>}
                            {detail && <div className={'alert-content__detail'}>{detail}</div>}
                            {children}
                        </div>
                    </div>
                </Transition>
            </>
        )
    }
     return ReactDOM.createPortal(renderModal(), document.getElementById('dialog-container') as Element)

}
export default Modal
