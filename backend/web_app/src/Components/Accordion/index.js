import { ADD_COLLABORATORS } from 'Config/permissionConstant';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import {
  toggleCrewView,
  toggleGearView,
  toggleSiteView,
} from 'Redux/actions/shoot';
import PlusNaked from '../Icons/PlusNaked';
import {
  AccordionActions,
  AccordionBody,
  AccordionButton,
  AccordionContainer,
  AccordionHeader,
  AccordionTitle,
  AddItemButton,
} from './styles';

const Accordion = ({ title, onAdd, children, myPermission, ...props }) => {
  const shoot = useSelector(state => state.shoot);
  let crew_view = shoot.toggle_crew_view;
  let gear_view = shoot.toggle_gear_view;
  let site_view = shoot.toggle_site_view;
  let dispatch = useDispatch();

  const handleAccordion = () => {

    console.log('shoot.', crew_view);
    console.log('as', title.replace(' ', '_'));
    if (title.replace(' ', '_') === 'Crew') {
      console.log('shoot. 1', crew_view);
      dispatch(toggleCrewView());
    } else if (title.includes('Collaborators')) {
      console.log('shoot. 2', crew_view);

      dispatch(toggleCrewView());
    } else if (title.replace(' ', '_') === 'Gear') {
      dispatch(toggleGearView());
    } else if (title.replace(' ', '_') === 'Site_Plan') {
      dispatch(toggleSiteView());
    }
  };
  return (
    <AccordionContainer
      className="accordion"
      id={`accordion${title.replace(' ', '_')}`}
      {...props}
    >
      <div className="accordion-item">
        <AccordionHeader>
          <AccordionTitle>{title}</AccordionTitle>

          <AccordionActions>
            {myPermission?.includes(ADD_COLLABORATORS) && (
              <AddItemButton onClick={onAdd}>
                <PlusNaked strokeColor="#2E90FA" />
              </AddItemButton>
            )}

            <input
              onClick={handleAccordion}
              className={` ${
                (title === 'Crew' && crew_view) ||
                (title.includes('Collaborators') && crew_view) ||
                (title === 'Gear' && gear_view) ||
                (title === 'Site Plan' && site_view)
                  ? 'abc'
                  : 'abc1'
              } 
                  `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${title.replace(' ', '_')}`}
              aria-expanded="true"
              aria-controls={`collapse${title.replace(' ', '_')}`}
            />
          </AccordionActions>
        </AccordionHeader>
        <div
          id={`collapse${title.replace(' ', '_')}`}
          className={`accordion-collapse collapse ${
            ((title === 'Crew' && crew_view) ||
              (title.includes('Collaborators') && crew_view) ||
              (title === 'Gear' && gear_view) ||
              (title === 'Site Plan' && site_view)) &&
            'show'
          } 
              `}
          aria-labelledby={`heading${title.replace(' ', '_')}`}
          data-bs-parent={`#accordion${title.replace(' ', '_')}`}
        >
          <AccordionBody className="accordion-body">{children}</AccordionBody>
        </div>
      </div>
    </AccordionContainer>
  );
};

export default Accordion;
