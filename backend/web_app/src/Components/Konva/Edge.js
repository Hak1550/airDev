import React from 'react';
import { Arrow } from 'react-konva';

const Edge = ({ node1, node2 }) => {
  if (typeof node1 === 'undefined' || typeof node2 === 'undefined') return null;
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;
  const curvePower = 0;

  const arrowStart = {
    x: node2.x + -radius * Math.cos(angle + Math.PI),
    y: node2.y + radius * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: node1.x + -radius * Math.cos(angle),
    y: node1.y + radius * Math.sin(angle),
  };

  const arrowCurve = {
    x:
      (arrowStart.x + arrowEnd.x) / 2 +
      curvePower * Math.cos(angle + Math.PI / 2),
    y:
      (arrowStart.y + arrowEnd.y) / 2 +
      curvePower * Math.sin(angle - Math.PI / 2),
  };

  return (
    <Arrow
      tension={0.2}
      points={[
        arrowStart.x,
        arrowStart.y,
        arrowCurve.x,
        arrowCurve.y,
        arrowEnd.x,
        arrowEnd.y,
      ]}
      pointerAtBeginning={true}
      pointerAtEnding={true}
      stroke="#000"
      fill="#000"
      strokeWidth={3}
      pointerWidth={6}
    />
  );
};

export default Edge;
