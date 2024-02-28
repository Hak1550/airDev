import React from 'react';
import {
  BottomSection,
  CardContainer,
  FileIconImg,
  FileName,
  FileNameContainer,
  FileType,
  ModifiedDate,
  TopSection,
  TopSectionRow,
} from './styles';
import fileIcon from '../../Assets/images/fileIcon.png';

const DocumentCard = ({
  btnTitle = 'View',
  title = 'Project Notes',
  subTitle,
  image = fileIcon,
  description = 'Modified: Jan 02, 2022 at 12:00 PM',
  url,
  deleteAction = '',
  editAction = '',
}) => {
  return (
    <CardContainer>
      <TopSection>
        <TopSectionRow>
          <FileIconImg src={image} alt="" />
          <FileNameContainer>
            <FileName>{title}</FileName>
            <FileType>{subTitle}</FileType>
          </FileNameContainer>
        </TopSectionRow>
        <ModifiedDate>{description}</ModifiedDate>
      </TopSection>
      <BottomSection>
        {editAction}
        {deleteAction}
        {url && (
          <a
            className="btn btn-link text-decoration-none"
            href={`${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {btnTitle}
          </a>
        )}
      </BottomSection>
    </CardContainer>
  );
};

export default DocumentCard;
