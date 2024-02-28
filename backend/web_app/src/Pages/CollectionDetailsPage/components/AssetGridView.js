import { Col, Image, Row } from 'react-bootstrap';
import { CheckBoxContainer } from '../styles';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import { DropdownOption, MoreButton } from 'Pages/ProjectOverviewPage/styles';
import More from 'Components/Icons/More';
import GlobeIcon from 'Components/Icons/GlobeIcon';
import ConrnerUpRight from 'Components/Icons/ConrnerUpRight';
import TagsIcon from 'Components/Icons/TagsIcon';
import { Duplicate, TrashCan } from 'Components/Icons';
import Archive from 'Components/Icons/Archive';
import { useHistory } from 'react-router-dom';
import HomePageImg from '../../../Assets/images/cover.jpg';

const AssetGridView = ({ handleClick, Assets, isCheck, handleDeleteItems }) => {
  const history = useHistory();
  return (
    <Row
      sm={{ cols: 2 }}
      md={{ cols: 4 }}
      lg={{ cols: 4 }}
      xl={{ cols: 5 }}
      className="gy-3"
    >
      {Assets.map(item => (
        <Col className="gx-3 position-relative" key={item.key} role="button">
          <Image
            src={item?.thumbnail_url || HomePageImg}
            alt={item?.metadata?.Metadata?.filename}
            onError={e => {
              e.target.src = HomePageImg;
              e.target.onError = null;
            }}
            width={100}
            height={100}
            rounded
            className="w-100 shadow-sm"
            style={{ minHeight: '155px' }}
            onClick={() =>
              window.location.replace(
                `/media/asset-details/${item?.organisation?.id}?key=${item?.key}`,
              )
            }
          />
          <CheckBoxContainer
            src={isCheck.includes(item.id) ? tick : CheckboxBase}
            onClick={() => handleClick(item.id)}
            className="position-absolute"
          />
          <div
            className="dropdown me-1 position-absolute"
            style={{ top: '12px', right: '12px' }}
          >
            <MoreButton
              className="btn"
              type="button"
              data-bs-toggle="dropdown"
              style={{ width: '36px', height: '36px' }}
            >
              <More stroke="#344054" />
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
                <DropdownOption onClick={() => handleDeleteItems(item)}>
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
        </Col>
      ))}
    </Row>
  );
};

export default AssetGridView;
