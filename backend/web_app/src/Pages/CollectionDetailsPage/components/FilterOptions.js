import { DoneButton } from 'Components/AddCollaboratorContent/styles';
import { BorderBottom, BorderRight } from 'Components/CommonStyles';
import CustomCalendar from 'Components/CustomCalendar';
import CustomSelect from 'Components/CustomSelect';
import { OutlinedButton } from 'Components/IconButton/styles';
import { TrashCan } from 'Components/Icons';
import DownloadIcon from 'Components/Icons/DownloadIcon';
import More from 'Components/Icons/More';
import { DropdownOption, MoreButton } from 'Pages/ProjectOverviewPage/styles';
import { CheckBoxContainer, CollectionName } from '../styles';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import SomeCheckBox from '../../../Assets/images/someCheckBox.svg';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { SearchInput } from 'Components/SearchBar/styles';
import * as Icon from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiAddCollectionRequest } from 'Redux/actions/media';
import { useSelector } from 'react-redux';
import { getObjectByLowestValue } from 'Utils/permissions';
import moment from 'moment';

const FilterOptions = ({
  isCheckAll,
  dateOptions,
  onDateChange,
  initialState,
  setState,
  isCheck,
  handleSelectAll,
  setIsCheck,
  sortByOptions,
  collectionDetails,
  count,
  handleDeleteItems,
  handleDownload,
  handleFilters,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [collectionName, setCollectionName] = useState(collectionDetails?.name);
  const [editable, setEditAble] = useState(false);
  const auth = useSelector(state => state.auth);
  const media = useSelector(state => state.media);
  const userInformation = useSelector(state => state.userInformation);

  console.log('details : ', collectionDetails, ' name : ', collectionName);
  const organisationData = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  )?.organisation;

  const handleSubmit = () => {
    const data = {
      organisation: organisationData?.id,
      name: collectionName,
    };
    if (id === 'new') dispatch(apiAddCollectionRequest(data, auth.token));
    else {
      data['id'] = id;
      dispatch(apiAddCollectionRequest(data, auth.token, true));
    }
  };
  useEffect(() => {
    if (id === 'new') {
      setEditAble(true);
    }
  }, [id]);
  useEffect(() => {
    if (collectionDetails) setCollectionName(collectionDetails?.name);
  }, [collectionDetails]);

  return (
    <>
      <div
        className="d-flex justify-content-between flex-wrap mb-3"
        style={{ rowGap: '12px' }}
      >
        <div
          className="d-flex"
          style={{ columnGap: '12px', width: '70%', height: '40px' }}
        >
          {!editable && (
            <div className="d-flex flex-column w-100">
              <CollectionName onClick={() => setEditAble(prev => !prev)}>
                {collectionName}
              </CollectionName>
              <BorderBottom style={{ margin: '16px 0px 0px' }} />
            </div>
          )}

          {editable && (
            <InputGroup
              className="mb-3"
              style={{ height: '40px', width: '100%' }}
            >
              <SearchInput
                className="form-control h-100 p-2"
                placeholder={'Enter Collection Name'}
                value={collectionName}
                onChange={e => setCollectionName(e.target.value)}
                style={{ border: '1px solid #D0D5DD' }}
              />
              <OutlinedButton
                onClick={() => setCollectionName(collectionDetails?.name || '')}
                className="btn btn-sm"
                disabled={
                  collectionName && collectionName?.length > 0 ? false : true
                }
              >
                <Icon.XLg />
              </OutlinedButton>
              <OutlinedButton
                className="btn btn-sm"
                onClick={() => {
                  setEditAble(prev => !prev);
                  if (collectionName !== collectionDetails?.name)
                    handleSubmit();
                }}
                disabled={
                  collectionName && collectionName?.length > 0 ? false : true
                }
              >
                <Icon.CheckLg />
              </OutlinedButton>
            </InputGroup>
          )}
        </div>
        <CustomCalendar
          isAuthorized={true}
          dateOptions={dateOptions}
          onDateChange={onDateChange}
          state={initialState}
          setState={setState}
          clearable={true}
          maxDate={moment().toDate()}
        />
      </div>
      <div className="d-flex mb-3 justify-content-between flex-wrap align-items-center">
        <div className="d-flex">
          <CheckBoxContainer
            src={
              isCheckAll
                ? tick
                : isCheck.length > 0
                ? SomeCheckBox
                : CheckboxBase
            }
            onClick={handleSelectAll}
          />
          {isCheck.length > 0 ? (
            <>
              {isCheck.length} Assets Selected <BorderRight />{' '}
              <label role="button" onClick={() => setIsCheck([])}>
                Deselect
              </label>
            </>
          ) : (
            <>
              Select All
              <BorderRight /> {count} Assets
            </>
          )}{' '}
        </div>
        <div className="d-flex">
          {isCheck.length > 0 ? (
            <>
              {/* <OutlinedButton
                className="btn btn-sm fw-semibold"
                style={{ minWidth: '145px', color: '#344054' }}
              >
                <Plus stroke="#344054" /> Add to Collection
              </OutlinedButton> */}
              <DoneButton
                className="btn btn-primary btn-sm fw-semibold"
                style={{ minWidth: '145px' }}
                onClick={handleDownload}
              >
                <DownloadIcon /> Download
              </DoneButton>
              <div className="dropdown ms-2">
                <MoreButton
                  className="btn"
                  type="button"
                  style={{ background: '#7F56D9' }}
                  data-bs-toggle="dropdown"
                >
                  <More stroke="#FFF" />
                </MoreButton>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuOffset"
                  style={{ paddingTop: '4px', paddingBottom: '4px' }}
                >
                  <>
                    {/* <DropdownOption>
                      <GlobeIcon />
                      <span>Move Location</span>
                    </DropdownOption> */}
                    <DropdownOption onClick={handleDeleteItems}>
                      <TrashCan />
                      <span>Delete from Collection</span>
                    </DropdownOption>
                    {/* <DropdownOption>
                      <TagsIcon />
                      <span>Add Tags</span>
                    </DropdownOption> */}
                    {/* <DropdownOption>
                      <Duplicate />
                      <span>Duplicate</span>
                    </DropdownOption>
                    <DropdownOption>
                      <Archive width="20" height="20" />
                      <span>Archive</span>
                    </DropdownOption> */}
                    {/* <DropdownOption>
                      <TrashCan />
                      <span>Delete</span>
                    </DropdownOption> */}
                  </>
                </ul>
              </div>
            </>
          ) : (
            <>
              {' '}
              <CustomSelect
                options={sortByOptions}
                placeholder="Sort By"
                defaultValue={sortByOptions[0]}
                onChange={e => handleFilters(e.value, 'ordering')}
              />
              {/* <div
                className="btn-group ms-2"
                role="group"
                aria-label="Basic radio toggle button group"
                style={{ height: '40px' }}
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-secondary"
                  htmlFor="btnradio1"
                  style={{ height: '40px', padding: '7px 12px' }}
                >
                  <ListIcon />
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  checked
                />
                <label
                  className="btn btn-outline-secondary"
                  htmlFor="btnradio2"
                  style={{ height: '40px', padding: '7px 12px' }}
                >
                  <GridIcon />
                </label>
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterOptions;
