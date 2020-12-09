import React from 'react'
import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api'
import '@reach/combobox/styles.css'
import './reset.css'
import './App.scss'
import Search from './components/Search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchChangeLatLng, dispatchMarkers, getCoordinates } from './redux/actions/map'
import List from './components/List/List'

const libraries = ["places"]
const mapContainerStyle = {
  width: '1200px',
  height: '100vh'
}
const center = {
  lat: 53.208778,
  lng: 63.618408
}

export default function App() {
  const dispatch = useDispatch()
  const markers = useSelector(({ map }) => map.markers)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const pathPolyline = markers.map(marker => {
    return {
      lat: marker.lat,
      lng: marker.lng
    }
  })

  const onMapClick = React.useCallback((e) => {
    dispatch(dispatchMarkers(e))
  }, [])

  const mapRef = React.useRef()

  // By saving these references to the map to out useRef. We can access it anywhere we were in the code and it won't cause any rerenders or anything like that
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])
  // You use state when you want it to cause rerenders
  // You use Ref when you want to retain state without causing rerenders

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  const onMarkerDragEnd = (e) => {
    dispatch(dispatchChangeLatLng(e))
  }

  const onMarkerMouseDown = (e) => {
    dispatch(getCoordinates(e))
  }

  if (loadError) return "Не получилось загрузить карту"
  if (!isLoaded) return "Загружаю карту"

  return (
    <div className="App">
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Polyline path={pathPolyline} options={{ strokeColor: '#FF0000' }} />
        {markers.map((marker, i) => {
          return <Marker key={i} draggable={true} onDragEnd={onMarkerDragEnd} onMouseDown={onMarkerMouseDown} position={{ lat: marker.lat, lng: marker.lng }} />
        })}
      </GoogleMap>
      <List />
    </div>
  );
}
