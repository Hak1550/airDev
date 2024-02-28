import React from 'react';
import { Group, Image } from 'react-konva';
import useImage from 'use-image';
const RoundedImageDefault = ({
  x,
  y,
  width,
  height,
  cornerRadius,
  image,
  defaultImage,
  isOnline,
}) => {
  const parsedImage = useImage(image ? image : defaultImage);
  return (
    <Group
      clipFunc={ctx => {
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + width - cornerRadius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
        ctx.lineTo(x + width, y + height - cornerRadius);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - cornerRadius,
          y + height,
        );
        ctx.lineTo(x + cornerRadius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
      }}
    >
      <Image
        x={x}
        y={y}
        width={width}
        height={height}
        image={parsedImage[0]}
        opacity={isOnline ? 1 : 0.7}
      />
    </Group>
  );
};

export default RoundedImageDefault;
