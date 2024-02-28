import { DoneButton } from 'Components/AddCollaboratorContent/styles';
import { BorderRight } from 'Components/CommonStyles';
import CustomCalendar from 'Components/CustomCalendar';
import CustomSelect from 'Components/CustomSelect';
import { OutlinedButton } from 'Components/IconButton/styles';
import { Duplicate, TrashCan } from 'Components/Icons';
import Archive from 'Components/Icons/Archive';
import ConrnerUpRight from 'Components/Icons/ConrnerUpRight';
import DownloadIcon from 'Components/Icons/DownloadIcon';
import FolderIcon from 'Components/Icons/FolderIcon';
import GlobeIcon from 'Components/Icons/GlobeIcon';
import More from 'Components/Icons/More';
import Plus from 'Components/Icons/Plus';
import TagsIcon from 'Components/Icons/TagsIcon';
import UserIcon from 'Components/Icons/UserIcon';
import { DropdownOption, MoreButton } from 'Pages/ProjectOverviewPage/styles';
import { CheckBoxContainer } from '../styles';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import SomeCheckBox from '../../../Assets/images/someCheckBox.svg';
import ListIcon from 'Components/Icons/ListIcon';
import GridIcon from 'Components/Icons/GridIcon';
import { SideNavPageType } from 'Containers/MediaContainer/constant';
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
  handleSideNavPage,
  orgList,
  handleDelete,
  selectedOrg,
  handleMediaLocation,
  totalAssets,
  handleDownload,
  projects,
  clientList,
  handleFilters,
}) => {
  return (
    <>
      {' '}
      <div
        className="d-flex justify-content-between flex-wrap mb-3"
        style={{ rowGap: '12px' }}
      >
        <div className="d-flex" style={{ columnGap: '12px', height: '40px' }}>
          <CustomSelect
            indicatorIcon={<UserIcon />}
            // defaultValue={{ value: 'All', label: 'All' }}
            options={
              [...new Set(clientList)]?.map(item => {
                return { value: item, label: item };
              }) || []
            }
            placeholder="Client"
            onChange={e => handleFilters(e.label, 'clients')}
          />
          <CustomSelect
            indicatorIcon={<FolderIcon />}
            options={
              projects?.map(item => {
                return { value: item?.id, label: item?.name };
              }) || []
            }
            placeholder="Project"
            onChange={e => handleFilters(e.label, 'projects')}
          />
          {orgList && (
            <CustomSelect
              indicatorIcon={<GlobeIcon />}
              options={orgList}
              placeholder="Media Location"
              defaultValue={selectedOrg || orgList[0]}
              onChange={handleMediaLocation}
            />
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
              <BorderRight /> {totalAssets} Assets
            </>
          )}{' '}
        </div>
        <div className="d-flex">
          {isCheck.length > 0 ? (
            <>
              {/* <OutlinedButton
                className="btn btn-sm fw-semibold"
                style={{ minWidth: '145px', color: '#344054' }}
                onClick={() =>
                  handleSideNavPage(SideNavPageType.ADD_TO_COLLECTION)
                }
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
                    <DropdownOption
                      onClick={() =>
                        handleSideNavPage(SideNavPageType.MOVE_LOCATIONS)
                      }
                    >
                      <GlobeIcon />
                      <span>Move Location</span>
                    </DropdownOption>
                    <DropdownOption
                      onClick={() =>
                        handleSideNavPage(SideNavPageType.ADD_TO_COLLECTION)
                      }
                    >
                      <ConrnerUpRight />
                      <span>Add to Collection</span>
                    </DropdownOption>
                    <DropdownOption
                      onClick={() =>
                        handleSideNavPage(SideNavPageType.ADD_TAGS)
                      }
                    >
                      <TagsIcon />
                      <span>Add Tags</span>
                    </DropdownOption>
                    {/* <DropdownOption>
                      <Duplicate />
                      <span>Duplicate</span>
                    </DropdownOption>
                    <DropdownOption>
                      <Archive width="20" height="20" />
                      <span>Archive</span>
                    </DropdownOption> */}
                    <DropdownOption onClick={() => handleDelete()}>
                      <TrashCan />
                      <span>Delete</span>
                    </DropdownOption>
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
                onChange={e => handleFilters(e.value, 'sortBy')}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterOptions;
