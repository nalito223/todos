
// @flow
// import * as dataAttr from '../../src/view/data-attributes'

export function getDroppableSelector(droppableId) {
  if (droppableId) {
    return `[${dataAttr.droppable.id}="${droppableId}"]`
  }
  return `[${dataAttr.droppable.id}]`
}

export function getHandleSelector(draggableId) {
  if (draggableId) {
    return `[${dataAttr.dragHandle.draggableId}="${draggableId}"]`
  }
  return `[${dataAttr.dragHandle.draggableId}]`
}

export function getDraggableSelector(draggableId) {
  if (draggableId) {
    return `[${dataAttr.draggable.id}="${draggableId}"]`
  }
  return `[${dataAttr.draggable.id}]`
}