import React from 'react';
import { ToolButton, ToolContainer } from './styles';
import PlusNaked from '../../Components/Icons/PlusNaked';
import Minus from '../Icons/Minus';
import Center from '../../Assets/images/center.png';
import Center2 from '../../Assets/images/center2.jpeg';

import Add from '../../Assets/images/addBtn.png';
import Minuss from '../../Assets/images/minus.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ZoomTool = ({ onZoomIn, onZoomOut, centered, handleImageSize }) => {
  return (
    <ToolContainer>
      <OverlayTrigger
        key={'zoom-tool1'}
        placement={'left'}
        overlay={<Tooltip id={`tooltip-zoom-tool1`}>Zoom In</Tooltip>}
      >
        <ToolButton onClick={onZoomIn}>
          <img
            src={Add}
            style={{ width: '25px', height: '25px', opacity: 0.5 }}
          />
        </ToolButton>
      </OverlayTrigger>
      <OverlayTrigger
        key={'zoom-tool2'}
        placement={'left'}
        overlay={<Tooltip id={`tooltip-zoom-tool2`}>Zoom Out</Tooltip>}
      >
        <ToolButton onClick={onZoomOut}>
          {/* <Minus /> */}
          <img
            src={Minuss}
            style={{ width: '20px', height: '25px', opacity: 0.5 }}
          />
        </ToolButton>
      </OverlayTrigger>
      <OverlayTrigger
        key={'zoom-tool3'}
        placement={'left'}
        overlay={<Tooltip id={`tooltip-zoom-tool3`}>Center</Tooltip>}
      >
        <ToolButton onClick={centered}>
          <img
            src={Center}
            style={{ width: '25px', height: '25px', opacity: 0.5 }}
          />
        </ToolButton>
      </OverlayTrigger>
      <OverlayTrigger
        key={'zoom-tool4'}
        placement={'left'}
        overlay={<Tooltip id={`tooltip-zoom-tool4`}>Image Size</Tooltip>}
      >
        <ToolButton onClick={handleImageSize}>
          <img
            src={Center2}
            style={{ width: '25px', height: '25px', opacity: 0.8 }}
          />
        </ToolButton>
      </OverlayTrigger>
    </ToolContainer>
  );
};

export default ZoomTool;
