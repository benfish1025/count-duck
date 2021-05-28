import React from "react"
import { Column } from "./Column"
import { Card } from "./Card"
import { CustomDragLayerContainer } from "./styles"
import { DragItem } from "./DragItem"
import { XYCoord, useDragLayer } from "react-dnd"


export const CustomDragLayer = () => {
  const { isDragging, currentOffset, item } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
    item: monitor.getItem() as DragItem,
  }))
  function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
    if (!currentOffset) {
      return {
        display: "none"
      }
    }
    const { x, y } = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    return {
      transform,
      WebkitTransform: transform
    }
  }
  return isDragging ? (
      <CustomDragLayerContainer>
        <div  style={getItemStyles(currentOffset)}>
          {item.type === "COLUMN" ? (
              <Column
                  id={item.id}
                  text={item.text}
                  index={item.index}
                  isPreview={true}
              />
          ) : (
              <Card
                  columnId={item.columnId}
                  isPreview={true}
                  index={0}
                  id={item.id}
                  text={item.text}
              />
          )}
        </div>
      </CustomDragLayerContainer>
  ) : null
}
