import React from 'react'

export default function Structures() {

    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    
    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);

  return (
      <>
          <div>Structures</div>
      <div ref={ref} />
      </>
  )
}
