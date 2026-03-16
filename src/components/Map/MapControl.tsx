import { FaMoon, FaSun, FaPhoneAlt } from "react-icons/fa";
import { MdSos } from "react-icons/md";

type MapControlsProps = {
  toggleMode: () => void;
  isDark: boolean;
  sendSOS: () => void;
  makeCall: () => void;
};

const MapControls: React.FC<MapControlsProps> = ({
  toggleMode,
  isDark,
  sendSOS,
  makeCall,
}) => {
  return (
    <div className="controls">
      <button
        type="button"
        onClick={toggleMode}
        className="btn mode"
        title={isDark ? "Light mode" : "Dark mode"}
        aria-label={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      <button
        type="button"
        onClick={sendSOS}
        className="btn sos"
        title="SOS"
        aria-label="Send SOS"
      >
        <MdSos size={22} />
      </button>

      <button
        type="button"
        onClick={makeCall}
        className="btn call"
        title="Emergency call"
        aria-label="Emergency call"
      >
        <FaPhoneAlt size={18} />
      </button>
    </div>
  );
};

export default MapControls;