import { reactive } from 'vue'
import { map, marker, featureGroup, tileLayer } from 'leaflet'

export const businesses = reactive({
  error: '',
  loading: false,
  data: [],
})

export const fetchBusinesses = async () => {
  try {
    businesses.loading = true

    const { items } = await fetch('/participating-businesses?format=json').then(
      (r) => r.json()
    )

    businesses.data = items
  } catch (error) {
    businesses.error = error.message
  } finally {
    businesses.loading = true
  }
}

export const createMap = async (el) => {
  await fetchBusinesses()

  let leafletMap = map(el, {
    attributionControl: false,
  })

  tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
  ).addTo(leafletMap)

  let markers = []

  businesses.data.forEach(({ id, location, body }) => {
    const locationMarker = marker({
      lat: location.mapLat,
      lng: location.mapLng,
    }).bindPopup(
      `<strong>${location.addressTitle}</strong> <p>${[
        location.addressLine1,
        location.addressLine2,
      ].join(', ')}</p> <small>${body}</small>`
    )

    const image = document.querySelector(`[data-image-id="${id}"]`)
    image.onclick = () => {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })

      locationMarker.openPopup()
    }

    markers.push(locationMarker)
    const group = featureGroup(markers).addTo(leafletMap)
    leafletMap.fitBounds(group.getBounds())
  })
}
