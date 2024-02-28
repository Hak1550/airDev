import { Col, Image, Row } from 'react-bootstrap';
import { CheckBoxContainer } from '../styles';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import { DropdownOption, MoreButton } from 'Pages/ProjectOverviewPage/styles';
import More from 'Components/Icons/More';
import GlobeIcon from 'Components/Icons/GlobeIcon';
import ConrnerUpRight from 'Components/Icons/ConrnerUpRight';
import TagsIcon from 'Components/Icons/TagsIcon';
import { TrashCan } from 'Components/Icons';
import { useHistory } from 'react-router-dom';
import HomePageImg from '../../../Assets/images/cover.jpg';
import { SideNavPageType } from 'Containers/MediaContainer/constant';

const AssetGridView = ({
  handleClick,
  Assets,
  isCheck,
  handleSideNavPage,
  handleDelete,
  selectedOrg,
}) => {
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
        <Col
          className="gx-3 position-relative"
          key={item?.metadata?.Metadata?.key}
        >
          <Image
            src={item?.metadata?.Metadata?.thumbnail || HomePageImg}
            alt={item?.metadata?.Metadata?.filename}
            onError={e => {
              e.target.src = HomePageImg;
              e.target.onError = null;
            }}
            // width={100}
            // height={100}
            rounded
            className="w-100 shadow-sm"
            style={{ height: 'auto', objectFit: 'contain' }}
            role="button"
            onClick={() =>
              window.location.replace(
                `/media/asset-details/${selectedOrg.value}?key=${item.metadata?.Metadata?.key}`,
              )
            }
          />
          <CheckBoxContainer
            src={
              isCheck.includes(item?.metadata?.Metadata?.key)
                ? tick
                : CheckboxBase
            }
            onClick={() => handleClick(item?.metadata?.Metadata?.key)}
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
                <DropdownOption
                  onClick={() =>
                    handleSideNavPage(
                      SideNavPageType.MOVE_LOCATIONS,
                      item?.metadata?.Metadata?.key,
                    )
                  }
                >
                  <GlobeIcon />
                  <span>Move Location</span>
                </DropdownOption>
                <DropdownOption
                  onClick={() => {
                    handleSideNavPage(
                      SideNavPageType.ADD_TO_COLLECTION,
                      item?.metadata?.Metadata?.key,
                    );
                  }}
                >
                  <ConrnerUpRight />
                  <span>Add to Collection</span>
                </DropdownOption>
                <DropdownOption
                  onClick={() => {
                    handleSideNavPage(
                      SideNavPageType.ADD_TAGS,
                      item?.metadata?.Metadata?.key,
                    );
                  }}
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
                <DropdownOption
                  onClick={() => handleDelete(item.metadata?.Metadata?.key)}
                >
                  <TrashCan />
                  <span>Delete</span>
                </DropdownOption>
              </>
            </ul>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default AssetGridView;
