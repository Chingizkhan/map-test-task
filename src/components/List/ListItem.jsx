import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddressAndMarker } from '../../redux/actions/map';

function ListItem({ id }) {
  const dispatch = useDispatch()
  const markers = useSelector(({ map }) => map.markers)

  console.log('ID from props', id)

  React.useEffect(() => {

  }, [markers])

  return (
    <div className="List__item">
      <div className="List__item__address">
        {markers.map((address, i) => {
          console.log('ID from markers', address.id)
          console.log('equal?', address.id === id)
          return id === address.id ? address.address : null
        })}
      </div>
      <button
        className="List__item__delete"
        onClick={() => dispatch(deleteAddressAndMarker(id))}
      >
        Удалить
      </button>
    </div>
  )
}

export default ListItem
