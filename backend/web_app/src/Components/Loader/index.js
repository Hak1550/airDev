import React from 'react';
import styled from 'styled-components';
import loadingSvg from '../../Assets/images/loader.svg';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SVGImage = styled.img`
  width: 100px;
  display: block;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <SVGImage src={loadingSvg} alt="Loading..." />
    </LoaderContainer>
  );
};

export default Loader;
