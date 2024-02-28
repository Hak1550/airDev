import { BorderRight } from 'Components/CommonStyles';
import CustomSelect from 'Components/CustomSelect';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import SomeCheckBox from '../../../Assets/images/someCheckBox.svg';
import ListIcon from 'Components/Icons/ListIcon';
import GridIcon from 'Components/Icons/GridIcon';
import { CheckBoxContainer } from 'Pages/AllAssetsPage/styles';
import { OutlinedButton } from 'Components/IconButton/styles';
import Plus from 'Components/Icons/Plus';
import { useHistory } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';
import { SearchInput } from 'Components/SearchBar/styles';
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiAddCollectionRequest } from 'Redux/actions/media';
import { getObjectByLowestValue } from 'Utils/permissions';

const FilterOptions = ({
  isCheckAll,
  isCheck,
  handleSelectAll,
  setIsCheck,
  sortByOptions,
  count = 0,
  setOrdering,
}) => {
  const history = useHistory();
  const [collectionName, setCollectionName] = useState('');
  const [editAble, setEditAble] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);

  const organisationData = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  )?.organisation;
  const handleSubmit = () => {
    const data = {
      organisation: organisationData?.id,
      name: collectionName,
    };
    dispatch(apiAddCollectionRequest(data, auth.token));
  };
  return (
    <>
      <div
        className="d-flex justify-content-between  mb-3 flex-wrap align-items-center"
        style={{ rowGap: '12px' }}
      >
        {/* <div className="d-flex" style={{ columnGap: '0px' }}>
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
              {isCheck.length} Collections Selected <BorderRight />{' '}
              <label role="button" onClick={() => setIsCheck([])}>
                Deselect
              </label>
            </>
          ) : (
            <>
              Select All
              <BorderRight /> {count} Collections
            </>
          )}{' '}
        </div> */}
        <div className="d-flex justify-content-end w-100">
          <CustomSelect
            options={sortByOptions}
            placeholder="Sort By"
            defaultValue={sortByOptions[0]}
            onChange={e => setOrdering(e.value)}
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
              defaultChecked
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="btnradio2"
              style={{ height: '40px', padding: '7px 12px' }}
            >
              <GridIcon />
            </label>
          </div> */}
        </div>
      </div>
      <div className="d-flex mb-3 justify-content-between flex-wrap align-items-center">
        <label className="fw-semibold" style={{ fontSize: '18px' }}>
          Collections
        </label>
        {editAble ? (
          <InputGroup style={{ height: '40px', width: 'auto' }}>
            <SearchInput
              className="form-control h-100 p-2"
              placeholder={'Enter Collection Name'}
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              style={{ border: '1px solid #D0D5DD' }}
            />
            <OutlinedButton
              onClick={() => {
                setCollectionName('');
                setEditAble(false);
              }}
              className="btn btn-sm"
            >
              <Icon.XLg color="red" />
            </OutlinedButton>
            <OutlinedButton
              className="btn btn-sm"
              onClick={() => {
                setEditAble(prev => !prev);
                handleSubmit();
              }}
              disabled={
                collectionName && collectionName?.length > 0 ? false : true
              }
            >
              <Icon.CheckLg color="#6941C6" />
            </OutlinedButton>
          </InputGroup>
        ) : (
          <OutlinedButton
            className="btn btn-sm fw-semibold"
            style={{ minWidth: '145px', color: '#344054' }}
            // onClick={() => history.push('/media/collection-details/new')}
            onClick={() => setEditAble(true)}
          >
            <Plus stroke="#344054" /> Create New
          </OutlinedButton>
        )}
      </div>
    </>
  );
};

export default FilterOptions;
