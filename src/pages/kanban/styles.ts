import styled from 'styled-components'

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
  `
interface DragPreviewContainerProps {
  isHidden?: boolean,
  isPreview?: boolean
}
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${props => (props.isHidden ? 0 : 1)};
  `
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #84d8ff;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 12px;
  padding: 10px 10px;
  flex-grow: 0;
  `
export const PaddingSmall = styled.div`
padding-bottom: 6px;
width: 100%;
`
export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
  `
export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 8px 12px;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: #77777770 0px 1px 0px 0px;
  `
type AddItemButtonProps = {
  dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  outline: none;
  background-color: #ffffff3d;
  border-radius: 8px;
  border: none;
  color: ${props => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:active {
    outline: none;
  }
  &:hover {
    background-color: #ffffff52;
  }
  `
export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  `
export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
  `
export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  `
export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  `
