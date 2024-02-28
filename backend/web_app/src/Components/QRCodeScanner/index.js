import { AccordionTitle } from 'Components/Accordion/styles';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetRelatedGear } from 'Redux/actions/shoot';

export const QRCodeRightNavView = ({ air_id }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const shoot = useSelector(state => state.shoot);
  const [data, setData] = useState(false);

  useEffect(() => {
    // dispatch(apiGetRelatedGear(air_id, auth.token));
    setData(true);
  }, [air_id]);
  const value = 'hi';
  return (
    <div
      style={{
        width: '100%',
        marginLeft: '15px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <AccordionTitle>QR Code</AccordionTitle>
      <div
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 100,
          width: '100%',
        }}
      >
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={shoot?.relatedGearId}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};
