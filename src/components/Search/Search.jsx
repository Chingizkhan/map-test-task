import React from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover, ComboboxList } from '@reach/combobox'
import { useDispatch } from 'react-redux'
import './Search.scss'
import { dispatchMarkersPanTo } from '../../redux/actions/map'

function Search({ panTo }) {
  const dispatch = useDispatch()
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 53.208778, lng: () => 63.618408 },
      radius: 1000 * 1000
    }
  })
  return (
    <div className='Search'>
      <Combobox onSelect={async (address) => {
        setValue('')
        clearSuggestions()
        try {
          const result = await getGeocode({ address })
          const { lat, lng } = await getLatLng(result[0])
          panTo({ lat, lng })
          dispatch(dispatchMarkersPanTo(lat, lng))
        } catch (e) {
          console.log('Error', e)
        }
      }}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Введите адрес..."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' && data.map(({ id, description }) => (
              <ComboboxOption value={description} key={`${id}-${description}`} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default Search
