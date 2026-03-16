export const addPOIMarkers = async (
  map: any,
  L: any,
  amenity: string,
  icon: any,
  currentPos: [number, number]
) => {
  const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${amenity}](around:2000,${currentPos[0]},${currentPos[1]});out;`;

  const res = await fetch(url);
  const data = await res.json();

  return data.elements.map((el: any) =>
    L.marker([el.lat, el.lon]).addTo(map)
  );
};

export const addTaxiMarkers = (
  map: any,
  L: any,
  currentPos: [number, number],
  count = 5
) => {
  const markers = [];
  for (let i = 0; i < count; i++) {
    const lat = currentPos[0] + (Math.random() - 0.5) * 0.01;
    const lon = currentPos[1] + (Math.random() - 0.5) * 0.01;
    markers.push(L.marker([lat, lon]).addTo(map));
  }
  return markers;
};