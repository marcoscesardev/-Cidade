import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import ComplaintForm from "../Form";

export const ComplaintCreate = () => {
  const [position, setPosition] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);

  useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      setPosition({ lat, lng });
    },
  });

  useEffect(() => {
    if (position.lat && position.lng) {
      setOpenDrawer(true);
    }
  }, [position]);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setPosition({});

    const event = new Event('complaintRefresh')
    window.dispatchEvent(event);
  };

  return (
    <>
      {openDrawer && (
        <Drawer
          title="Adicionar um marcador"
          placement="right"
          onClose={handleCloseDrawer}
          open={openDrawer}
        >
          <ComplaintForm
            latitude={position.lat}
            longitude={position.lng}
            onSuccess={handleCloseDrawer}
          />
        </Drawer>
      )}
      {position.lat && position.lng && <Marker position={position} />}
    </>
  );
};
