import MapScreen from "../components/Map/MapScreen.tsx";

export default function Map() {
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full pt-14 pb-20">
      <div className="flex-1 min-h-0 min-w-0 flex flex-col h-full">
        <MapScreen/>
      </div>
    </div>
  );
}
