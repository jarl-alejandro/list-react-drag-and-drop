import React, { Component } from 'react'
import {
  DragSource,
  DropTarget,
} from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { ItemTypes } from './Constants'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.item.id,
      index: props.index
    }
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop)
      props.moveCard(droppedId, originalIndex)
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
}

class Item extends Component {

  render () {
    let { item, connectDragSource, isDragging, connectDropTarget } = this.props
    let dnd = isDragging ? 'Card-dnd' : ''

    return connectDragSource(
      connectDropTarget(
        <article className={`Card ${dnd}`}>
          <div className='CardDnd'>
            <p>{ item.text }</p>
          </div>
        </article>
      )
    )
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(Item)
)
