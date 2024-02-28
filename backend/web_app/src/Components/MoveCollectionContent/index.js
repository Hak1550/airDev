import Loader from 'Components/Loader';
import { CheckBoxContainer } from 'Pages/CollectionDetailsPage/styles';
import React from 'react';
import { useState } from 'react';
import { OutlinedButton } from '../IconButton/styles';
import tick from 'Assets/images/tick-square.png';
import CheckboxBase from 'Assets/images/checkboxBase.png';
import {
  AddCrewContentContainer,
  DoneButton,
  MembersSearchList,
  NavFooter,
  NoCrewMemberFoundCard,
  NoUserFoundText,
} from './styles';
import Badge from 'Components/Badge';
import { COLOR_CODE } from 'Config/colors';
import { AccordionTitle } from 'Components/Accordion/styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiAddCollectionItemsRequest } from 'Redux/actions/media';

const MoveCollectionContent = ({
  data,
  onRightNavClose,
  isLoading,
  keys,
  srcBucket,
  handleCopyObject,
}) => {
  const [isCheck, setIsCheck] = useState([]);
  const handleClick = label => {
    const checked = isCheck.includes(label);
    if (checked) {
      setIsCheck(isCheck.filter(item => item !== label));
    } else setIsCheck([...isCheck, label]);
  };

  const handleSubmit = () => {
    console.log('key : ', isCheck, ' des : ', keys);
    isCheck.forEach(destBucket => {
      keys.map(item => handleCopyObject(srcBucket, destBucket, item));
    });
    onRightNavClose();
  };
  return (
    <AddCrewContentContainer>
      {isLoading === false ? (
        <MembersSearchList>
          {isCheck.length > 0 && (
            <AccordionTitle className="mb-3">
              {isCheck.length} Locations Selected
            </AccordionTitle>
          )}
          {data.length ? (
            data.map(item => {
              return (
                <div className="d-flex mb-3" key={item.label}>
                  <CheckBoxContainer
                    src={isCheck.includes(item.label) ? tick : CheckboxBase}
                    onClick={() => handleClick(item.label)}
                  />{' '}
                  <Badge
                    color={COLOR_CODE[Number(item.value % 11)].color}
                    bgColor={COLOR_CODE[Number(item.value % 11)].bgColor}
                    title={item.label}
                  />
                </div>
              );
            })
          ) : (
            <NoCrewMemberFoundCard>
              <NoUserFoundText>No Locations Found.</NoUserFoundText>
            </NoCrewMemberFoundCard>
          )}
        </MembersSearchList>
      ) : (
        <Loader />
      )}

      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
          disabled={isCheck.length === 0}
        >
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default MoveCollectionContent;
