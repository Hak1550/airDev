import Loader from 'Components/Loader';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useSelector } from 'react-redux';
import {
  ComponentBorderDiv2,
  ComponentDiv,
  ComponentDiv2,
  ComponentMainHeading,
  ComponentMainValue,
  ComponentPara,
  ComponentRightNavLink,
  ComponentSeparator,
  GearDiv1,
  GearDiv2,
  GearHeaderDiv,
} from '../styles';
import EditStorage from './EditStorage';
const Storage = ({ onChangeRightNav, assets, storage }) => {
  // const [range, setRange] = useState({
  //   values: [assets?.storagePlan?.storage ? assets?.storagePlan?.storage : 0],
  // });
  const [range, setRange] = useState({ values: [0] });
  const userInformation = useSelector(state => state.userInformation);
  console.log('ran : ', range);
  useEffect(() => {
    let storageSize = storage?.storage;
    if (storage?.storageType === 'TB') {
      storageSize = storage?.storage * 1000;
    }
    const rangePercentage =
      (Math.ceil(assets?.wasabiUsedStorage) * 100) / storageSize;
    if (rangePercentage) setRange({ values: [rangePercentage.toFixed(2)] });
  }, [assets?.wasabiUsedStorage]);

  return (
    <GearHeaderDiv>
      {userInformation?.isLoading ? (
        <Loader />
      ) : (
        <GearDiv1>
          <ComponentDiv>
            <ComponentMainHeading>Storage</ComponentMainHeading>
          </ComponentDiv>
          <ComponentDiv2>
            <ComponentPara>Total storage space on your plan.</ComponentPara>
          </ComponentDiv2>
          <ComponentMainValue>
            {storage?.storage ? storage?.storage : 0}{' '}
            {storage?.storageType ? storage?.storageType : 'GB'}
          </ComponentMainValue>

          <ComponentBorderDiv2>
            <ComponentDiv2>
              <ComponentPara>
                Currently using {assets?.wasabiUsedStorage.toFixed(2)} GB of{' '}
                {storage?.storage ? storage?.storage : 0} {storage?.storageType}{' '}
                Used ({range.values[0]}%)
              </ComponentPara>
            </ComponentDiv2>

            <Range
              step={0.1}
              min={0}
              max={100}
              values={range.values}
              draggableTrack={false}
              onChange={() => null}
              renderTrack={({ props, children }) => (
                <div
                  style={{
                    ...props.style,
                    height: '10px',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '5px',
                    borderRadius: '5px',
                    alignSelf: 'center',
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '8px',
                      width: '90%',
                      borderRadius: '5px',
                      background: getTrackBackground({
                        values: range.values,
                        colors: ['#7F56D9', '#F9F5FF'],
                        min: 0,
                        max: 100,
                      }),
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    // width: ` ${range.values[0]}%`,
                    borderRadius: '5px',
                    backgroundColor: '#7F56D9',
                  }}
                />
              )}
            />
          </ComponentBorderDiv2>
        </GearDiv1>
      )}

      <GearDiv2>
        <ComponentSeparator>
          <ComponentRightNavLink
            onClick={() => onChangeRightNav('editStorage')}
          >
            + Onboard Storage
          </ComponentRightNavLink>
        </ComponentSeparator>
      </GearDiv2>
    </GearHeaderDiv>
  );
};

export default Storage;
