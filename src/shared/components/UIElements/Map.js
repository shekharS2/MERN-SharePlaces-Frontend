import React, { useRef, useEffect, useState } from 'react';
 
import './Map.css';
 
const Map = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;

  const [map, setMap] = useState(null);

  
  useEffect(() => {
    let mapObj = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        zoom: zoom,
        center: window.ol.proj.fromLonLat([center.lng, center.lat])
      })
    });

    setMap(mapObj);

    return () => mapObj.setTarget(undefined);
    console.log(map);
    
  }, [center, zoom]);


  // // zoom change handler
  // useEffect(() => {
  //   if (!map) return;
  //   map.getView().setZoom(zoom);
  // }, [zoom]);
  
  // // center change handler
  // useEffect(() => {
  //   if (!map) return;
  //   map.getView().setCenter(center)
  // }, [center]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};
 
export default Map;
