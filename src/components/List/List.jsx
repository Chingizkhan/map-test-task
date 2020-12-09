import React from 'react'
import './List.scss'
import ListItem from './ListItem'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { swapPlaces } from '../../redux/actions/map'


function List() {
  const markers = useSelector(({ map }) => map.markers)
  const dispatch = useDispatch()

  return (
    <DragDropContext onDragEnd={(result) => dispatch(swapPlaces(result))}>
      <Droppable droppableId={"List"}>
        {(provided) => (
          <ul className="List" {...provided.droppableProps} ref={provided.innerRef}>
            {markers.length !== 0
              ? markers.map((marker, i) => {
                return (
                  <Draggable key={`${marker.lat}-${i}`} draggableId={marker.id} index={i}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <ListItem id={marker.id} />
                      </li>
                    )}
                  </Draggable>
                )
              })
              : 'Для добавления пункта воспользуйтесь строкой поиска или нажмите на карту'
            }
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
