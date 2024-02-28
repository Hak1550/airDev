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
import _ from 'loadsh';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddProjectPage from 'Components/AddProjectPage';

const AddtoProjectContent = ({
  data,
  onRightNavClose,
  isLoading,
  keys,
  metadata,
  selectedOrg,
  handleCopyObject,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [isCheck, setIsCheck] = useState([]);
  const [checked, setChecked] = useState([]);
  const [showAddNewProject, setShowAddNewProject] = useState(false);

  useEffect(() => {
    if (metadata.length === 1) {
      const colls = JSON.parse(metadata[0].metadata?.Metadata?.projects);
      const checked = _.intersectionBy(colls, data, 'id').map(item => item.id);
      setChecked(checked);
    }
  }, []);
  const handleClick = id => {
    const checked = isCheck.includes(id);
    if (checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    } else setIsCheck([...isCheck, id]);
  };

  const handleSubmit = () => {
    keys.forEach(item => {
      const findData = metadata.find(
        obj => obj?.metadata?.Metadata?.key === item,
      );
      const projects = isCheck.map(item => {
        return {
          id: item,
          name: data.find(obj => obj.id === item)?.name,
        };
      });
      const updatedMetadata = {
        ...findData?.metadata?.Metadata,
        projects: JSON.stringify(
          _.unionBy(
            projects,
            JSON.parse(findData?.metadata?.Metadata?.projects),
            'id',
          ),
        ),
      };

      handleCopyObject(
        selectedOrg.label,
        selectedOrg.label,
        item,
        updatedMetadata,
      );
    });
    onRightNavClose();
  };
  return !showAddNewProject ? (
    <AddCrewContentContainer>
      {isLoading === false ? (
        <MembersSearchList>
          {isCheck.length > 0 && (
            <AccordionTitle className="mb-3">
              {isCheck.length} Projects Selected
            </AccordionTitle>
          )}
          {data.length && data.length !== checked.length ? (
            data.map(
              item =>
                !checked.includes(item.id) && (
                  <div className="d-flex mb-3" key={item.id}>
                    <CheckBoxContainer
                      src={isCheck.includes(item.id) ? tick : CheckboxBase}
                      onClick={() => handleClick(item.id)}
                    />{' '}
                    <Badge
                      color={COLOR_CODE[Number(item.id % 11)].color}
                      bgColor={COLOR_CODE[Number(item.id % 11)].bgColor}
                      title={item.name}
                    />
                  </div>
                ),
            )
          ) : (
            <NoCrewMemberFoundCard>
              <NoUserFoundText>No Projects Found.</NoUserFoundText>
            </NoCrewMemberFoundCard>
          )}
          <Button onClick={() => setShowAddNewProject(true)}>
            + Add New Project
          </Button>
        </MembersSearchList>
      ) : (
        <Loader />
      )}

      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton className="btn btn-primary btn-sm" onClick={handleSubmit}>
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  ) : (
    <AddCrewContentContainer style={{ padding: '12px', overflow: 'auto' }}>
      <AddProjectPage handleCancel={() => setShowAddNewProject(false)} />
    </AddCrewContentContainer>
  );
};

export default AddtoProjectContent;
