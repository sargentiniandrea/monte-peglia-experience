import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Mappa(mappa) {
  let gpxParser = require("gpxparser");
  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#39;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }
  let xml_format = unEscape(mappa.mappa);
  if (xml_format) {
    var gpx = new gpxParser();
    gpx.parse(xml_format);
    const positions = gpx.tracks[0].points.map((p) => [p.lat, p.lon]);
    return (
      <>
        <p className='subtitolo-attivita'>Tracciato</p>
        <MapContainer
          center={positions[0]}
          zoom={13}
          scrollWheelZoom={false}
          doubleClickZoom={true}
          wheelDebounceTime={10}
          wheelPxPerZoomLevel={10}
          style={{ height: 300, borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Polyline
            pathOptions={{ fillColor: "red", color: "blue" }}
            positions={positions}
          />
        </MapContainer>
      </>
    );
  } else {
    return null;
  }
}

export default Mappa;
