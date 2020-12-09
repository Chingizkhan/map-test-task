import {
  CHANGE_LAT_LNG_ON_DRAG_END,
  DELETE_ADDRESS_AND_MARKER,
  SET_MARKERS,
  SET_MARKER_PAN_TO,
  GET_COORDINATES,
  SWAP_PLACES
} from "./actionTypes";
import Geocode from "react-geocode"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.setLanguage("ru");

export function dispatchMarkers(marker) {
  return dispatch => {
    Geocode.fromLatLng(marker.latLng.lat(), marker.latLng.lng()).then(
      response => {
        const address = response.results[0].formatted_address;
        /* dispatch(setAddresses(address)) */
        dispatch(setMarkers(marker, address))
      },
      error => {
        console.error(error);
      }
    )
  }
}

export function setMarkers(marker, address) {
  return {
    type: SET_MARKERS,
    payload: {
      lat: marker.latLng.lat(),
      lng: marker.latLng.lng(),
      address,
      id: `${marker.latLng.lat()}-${marker.latLng.lng()}`
    }
  }
}

export function dispatchChangeLatLng(marker) {
  return dispatch => {
    Geocode.fromLatLng(marker.latLng.lat(), marker.latLng.lng()).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address)
        dispatch(changeLatLngOnDragEnd(marker, address))
      },
      error => {
        console.error(error);
      }
    )
  }
}

export function changeLatLngOnDragEnd(marker, address) {
  return {
    type: CHANGE_LAT_LNG_ON_DRAG_END,
    payload: {
      lat: marker.latLng.lat(),
      lng: marker.latLng.lng(),
      address,
      id: `${marker.latLng.lat()}-${marker.latLng.lng()}`
    }
  }
}

export function getCoordinates(e) {
  return {
    type: GET_COORDINATES,
    payload: {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      id: `${e.latLng.lat()}-${e.latLng.lng()}`
    }
  }
}

export function dispatchMarkersPanTo(lat, lng) {
  return dispatch => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        dispatch(setMarkerPanTo(lat, lng, address))
      },
      error => {
        console.error(error);
      }
    )
  }
}

export function setMarkerPanTo(lat, lng, address) {
  return {
    type: SET_MARKER_PAN_TO,
    payload: {
      lat: lat,
      lng: lng,
      address,
      id: `${lat}-${lng}`
    }
  }
}

export function deleteAddressAndMarker(id) {
  return {
    type: DELETE_ADDRESS_AND_MARKER,
    payload: id
  }
}

export function swapPlaces(result) {
  return {
    type: SWAP_PLACES,
    payload: result
  }
}