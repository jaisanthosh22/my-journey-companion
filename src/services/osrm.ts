export const getRoute = async (
  start: [number, number],
  end: [number, number]
) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes || data.routes.length === 0) return [];

  return data.routes[0].geometry.coordinates.map(
    (c: any) => [c[1], c[0]] // reverse for Leaflet
  );
};