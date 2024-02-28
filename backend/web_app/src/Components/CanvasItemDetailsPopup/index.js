import React, { useCallback } from 'react';
import { PopupContainer } from './styles';
import EditSquare from '../Icons/EditSquare';
import TrashCan from '../Icons/TrashCan';

const CanvasItemDetailsPopup = ({
  x,
  y,
  show,
  data,
  type = 'GEAR',
  onClose,
  onCameraDetails,
  onCameraEditMembers,
  onDelete,
}) => {
  const handleDelete = useCallback(
    e => {
      onDelete(type, data.id);
    },
    [type, data.id],
  );

  return (
    <PopupContainer x={x} y={y} show={show}>
      {type === 'GEAR' ? (
        <>
          <li>
            <span
              style={{ cursor: 'pointer' }}
              className="dropdown-item"
              onClick={() => onCameraDetails(data)}
            >
              <span className="dropdown-item-icon">
                <EditSquare />
              </span>
              <span className="dropdown-item-text-custom">
                View Camera Details
              </span>
            </span>
          </li>
          <li>
            <span
              style={{ cursor: 'pointer' }}
              className="dropdown-item"
              onClick={() => onCameraEditMembers(data)}
            >
              <span className="dropdown-item-icon">
                <EditSquare />
              </span>
              <span className="dropdown-item-text-custom">Edit Crew</span>
            </span>
          </li>
        </>
      ) : null}

      <li>
        <span
          style={{ cursor: 'pointer' }}
          className="dropdown-item"
          onClick={handleDelete}
        >
          <span className="dropdown-item-icon">
            <TrashCan />
          </span>
          <span className="dropdown-item-text-custom">Delete</span>
        </span>
      </li>
    </PopupContainer>
  );
  // return <PopupContainer x={x} y={y} show={show}>
  //     <InnerContainer>
  //         <CloseIcon onClick={onClose}><X /></CloseIcon>
  //         <Title>{data.name}</Title>
  //         {type === 'GEAR' ?
  //             <InfoContainer>
  //                 <InfoRecord>
  //                     <InfoTitle>Owner:</InfoTitle>
  //                     <InfoValue>{data.owner_name}</InfoValue>
  //                 </InfoRecord>
  //                 <InfoRecord>
  //                     <InfoTitle>Nickname:</InfoTitle>
  //                     <InfoValue>{data.nick_name}</InfoValue>
  //                 </InfoRecord>
  //                 <InfoRecord>
  //                     <InfoTitle>LAN IP:</InfoTitle>
  //                     <InfoValue>{data.lan_ip}</InfoValue>
  //                 </InfoRecord>
  //                 <InfoRecord>
  //                     <InfoTitle>Public IP:</InfoTitle>
  //                     <InfoValue>{data.public_ip}</InfoValue>
  //                 </InfoRecord>
  //                 <InfoRecord>
  //                     <InfoTitle>AIR ID:</InfoTitle>
  //                     <InfoValue>{data.air_id}</InfoValue>
  //                 </InfoRecord>
  //             </InfoContainer>
  //             :
  //             <InfoContainer>

  //             </InfoContainer>
  //         }

  //         <div className="d-grid">
  //             <button onClick={handleDelete} className="btn btn-primary btn-sm" type="button">Delete</button>
  //         </div>

  //     </InnerContainer>
  // </PopupContainer>
};

export default CanvasItemDetailsPopup;
