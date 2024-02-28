import { AlphaLogo } from 'Components/SideMenu/styles';
import * as types from 'Config/permissionConstant';
import moment from 'moment/moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { apiProjectPatchRequest } from 'Redux/actions/project';
import { getObjectByLowestValue } from 'Utils/permissions';
import {
  Collabolators,
  CollabolatorsAvatar,
  EachCollabolators,
  EachCollabolatorsP,
  EachCollabolatorsP1,
  EachCollabolatorsP2P,
  EachCollabolatorsP3,
  EachCollabolatorsP3P,
  EachCollabolatorsP5,
  EachCollabolatorsP5P,
} from '../styles';

const ProjectList = props => {
  let { projects, handleModalShow } = props;
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Collabolators>
      {projects &&
        projects.map((project, index) => {
          return (
            <EachCollabolators key={index}>
              <EachCollabolatorsP1>
                {project?.logo ? (
                  <CollabolatorsAvatar src={project?.logo} alt={project?.id} />
                ) : (
                  <AlphaLogo>{project?.name[0].toUpperCase()}</AlphaLogo>
                )}
                <div className="d-flex flex-column ms-2">
                  <EachCollabolatorsP>{project?.name}</EachCollabolatorsP>
                  <EachCollabolatorsP3P>{project?.client}</EachCollabolatorsP3P>
                </div>
              </EachCollabolatorsP1>
              <EachCollabolatorsP3>
                <EachCollabolatorsP3P>
                  {moment(project?.created_at).format('MMMM Do, YYYY')}
                </EachCollabolatorsP3P>
              </EachCollabolatorsP3>

              <EachCollabolatorsP5>
                {getObjectByLowestValue(
                  project.permission_obj,
                  'role',
                ).allowed_permissions.includes(types.DELETE_PROJECT) && (
                  <>
                    <EachCollabolatorsP2P
                      onClick={() =>
                        handleModalShow(project?.id, project?.name)
                      }
                      role="button"
                    >
                      Delete
                    </EachCollabolatorsP2P>
                    <EachCollabolatorsP3P
                      onClick={() =>
                        dispatch(
                          apiProjectPatchRequest(
                            { status: 1 },
                            project?.id,
                            auth.token,
                          ),
                        )
                      }
                      role="button"
                    >
                      Unarchive
                    </EachCollabolatorsP3P>
                  </>
                )}

                <EachCollabolatorsP5P
                  onClick={() =>
                    history.push(`/project/overview/${project?.id}`)
                  }
                >
                  View Project
                </EachCollabolatorsP5P>
              </EachCollabolatorsP5>
            </EachCollabolators>
          );
        })}
    </Collabolators>
  );
};

export default ProjectList;
