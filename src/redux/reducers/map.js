import {
  CHANGE_LAT_LNG_ON_DRAG_END,
  DELETE_ADDRESS_AND_MARKER,
  GET_COORDINATES,
  SET_MARKERS,
  SET_MARKER_PAN_TO,
  SWAP_PLACES
} from "../actions/actionTypes"

const initialState = {
  markers: [],
  chosenMarker: null,
}

export default function map(state = initialState, action) {
  switch (action.type) {

    case SET_MARKERS:
      const markersCopy1 = state.markers.concat()
      markersCopy1.push(action.payload)
      return {
        ...state,
        markers: markersCopy1
      }

    case SET_MARKER_PAN_TO:
      const markersCopy2 = state.markers.concat()
      markersCopy2.push(action.payload)
      return {
        ...state,
        markers: markersCopy2
      }

    case DELETE_ADDRESS_AND_MARKER:
      const markersCopy3 = state.markers.concat()
      console.log(markersCopy3)
      const foundIndex = markersCopy3.findIndex((marker) => marker.id === action.payload)
      console.log(foundIndex)
      markersCopy3.splice(foundIndex, 1)
      return {
        ...state,
        markers: markersCopy3
      }

    case CHANGE_LAT_LNG_ON_DRAG_END:
      const markersCopy4 = state.markers.concat()
      let foundMarker = markersCopy4.find((marker) => marker.id === state.chosenMarker.id)
      let indexOfFoundMarker = markersCopy4.findIndex((marker) => marker.id === state.chosenMarker.id)
      foundMarker = {
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
        id: action.payload.id
      }
      markersCopy4[indexOfFoundMarker] = foundMarker
      return {
        ...state,
        markers: markersCopy4
      }

    case GET_COORDINATES:
      return {
        ...state,
        chosenMarker: action.payload
      }

    case SWAP_PLACES:
      const markersCopy5 = state.markers.concat()
      const [reorderedItem] = markersCopy5.splice(action.payload.source.index, 1)
      markersCopy5.splice(action.payload.destination.index, 0, reorderedItem)
      return {
        ...state,
        markers: markersCopy5
      }

    default:
      return state
  }
}