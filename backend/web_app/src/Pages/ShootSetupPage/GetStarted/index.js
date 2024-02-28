import React, { useRef } from 'react';
import { CenterDiv } from '../../../Components/CommonStyles';
import FeaturedMedia from '../../../Components/Icons/FeaturedMedia';
import PlusNaked from '../../../Components/Icons/PlusNaked';
import * as types from 'Config/permissionConstant';
import {
  Card,
  DescriptionText,
  GetStartedText,
  InnerContainer,
  SkipButton,
  UploadButton,
} from './styles';

const GetStarted = ({ onImageSelected, onSkip, myPermission }) => {
  const inputRef = useRef();
  const onUploadClick = () => {
    inputRef.current.click();
  };

  return (
    <CenterDiv>
      <Card>
        <InnerContainer>
          <FeaturedMedia />
          <GetStartedText>Get Started</GetStartedText>
          <DescriptionText>
            Upoad a background image or site plan to begin settin up your shoot.
          </DescriptionText>
          {myPermission?.includes(types.UPLOAD_FILE) && (
            <>
              <input
                type="file"
                id="file"
                onChange={onImageSelected}
                ref={inputRef}
                style={{ display: 'none' }}
              />
              <UploadButton onClick={onUploadClick} className="btn btn-primary">
                <PlusNaked /> Upload
              </UploadButton>
            </>
          )}
          <SkipButton onClick={onSkip}>Skip</SkipButton>
        </InnerContainer>
      </Card>
    </CenterDiv>
  );
};

export default GetStarted;
