import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// import IconButton from '@material-ui/core/IconButton';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import FastForwardIcon from '@material-ui/icons/FastForward';
// import PauseIcon from '@material-ui/icons/Pause';
// import Tooltip from '@material-ui/core/Tooltip';
// import VolumeUp from '@material-ui/icons/VolumeUp';
// import VolumeDown from '@material-ui/icons/VolumeDown';
// import VolumeMute from '@material-ui/icons/VolumeOff';
// import FullScreen from '@material-ui/icons/Fullscreen';
// import Popover from '@material-ui/core/Popover';
import { makeStyles, withStyles } from '@mui/styles';
import { Button, div } from 'react-bootstrap';
import { ControlIcons, ControlsWrapper } from './styles';
import FastRewindIcon from 'Components/Icons/FastRewindIcon';
import PlayArrowIcon from 'Components/Icons/PlayArrowIcon';
import BookmarkIcon from 'Components/Icons/BookmarkIcon';
import FastForwardIcon from 'Components/Icons/FastForwardIcon';
import PauseIcon from 'Components/Icons/PauseIcon';
// import VolumeMute from 'Components/Icons/VolumeMute';
// import VolumeUp from 'Components/Icons/VolumeUp';
// import { Fullscreen } from 'react-bootstrap-icons';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import {
  Fullscreen,
  PauseCircle,
  PlayCircle,
  VolumeDown,
  VolumeMute,
  VolumeUp,
} from '@mui/icons-material';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = withStyles({
  root: {
    height: 8,
    color: '#fff',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #fff',
    // marginTop: -8,
    // marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
})(Slider);

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      loader,
    },
    ref,
  ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <ControlsWrapper ref={ref} className="d-flex flex-column">
        <PrettoSlider
          min={0}
          max={100}
          ValueLabelComponent={props => (
            <ValueLabelComponent {...props} value={elapsedTime} />
          )}
          aria-label="custom thumb label"
          value={played * 100}
          onChange={onSeek}
          onMouseDown={onSeekMouseDown}
          onChangeCommitted={onSeekMouseUp}
          onDuration={onDuration}
        />
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div style={{ width: '150px' }}>
            <Tooltip title="Set Thumbnail Image" arrow>
              <IconButton style={{ padding: '0px' }} onClick={onBookmark}>
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          </div>
          {/* bottom controls */}
          {/* <div> */}
          {/* <div xs={12}> */}

          {/* </div> */}

          <div className="d-flex align-items-center">
            <span style={{ color: '#fff', marginRight: 24 }}>
              {elapsedTime}
            </span>
            <ControlIcons onClick={onRewind} role="button">
              <FastRewindIcon />
            </ControlIcons>
            <ControlIcons onClick={onPlayPause} className="mx-4" role="button">
              {playing && elapsedTime !== totalDuration ? (
                <PauseCircle style={{ color: '#fff', fontSize: '48px' }} />
              ) : (
                <PlayCircle style={{ color: '#fff', fontSize: '48px' }} />
              )}
            </ControlIcons>
            <ControlIcons onClick={onFastForward} role="button">
              <FastForwardIcon />
            </ControlIcons>
            <span style={{ color: '#fff', marginLeft: 24 }}>
              {totalDuration}
            </span>
            {/* <Popover
                container={ref.current}
                open={open}
                id={id}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map(rate => (
                    <Button
                      key={rate}
                      //   onClick={() => setState({ ...state, playbackRate: rate })}
                      onClick={() => onPlaybackRateChange(rate)}
                      variant="text"
                    >
                      <span
                        color={rate === playbackRate ? 'secondary' : 'inherit'}
                      >
                        {rate}X
                      </span>
                    </Button>
                  ))}
                </div>
              </Popover> */}
            {/* <ControlIcons onClick={onToggleFullScreen}>
            <Fullscreen fontSize="large" />
          </ControlIcons> */}
          </div>
          <div>
            <div
              className="d-flex align-items-center"
              style={{ width: '150px', columnGap: '8px' }}
            >
              <ControlIcons onClick={onMute} role="button">
                {/* {muted ? <VolumeMute /> : <VolumeUp />} */}
                {muted ? (
                  <VolumeMute fontSize="large" style={{ color: '#fff' }} />
                ) : volume > 0.5 ? (
                  <VolumeUp fontSize="large" style={{ color: '#fff' }} />
                ) : (
                  <VolumeDown fontSize="large" style={{ color: '#fff' }} />
                )}
              </ControlIcons>
              <Slider
                min={0}
                max={100}
                value={muted ? 0 : volume * 100}
                onChange={onVolumeChange}
                aria-labelledby="input-slider"
                // className={classes.volumeSlider}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onVolumeSeekDown}
                // width
              />
              <ControlIcons
                onClick={onToggleFullScreen}
                // className="ms-1"
                role="button"
              >
                <Fullscreen fontSize="large" style={{ color: '#fff' }} />
              </ControlIcons>
            </div>

            {/* <Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                /> */}
          </div>
        </div>
      </ControlsWrapper>
    );
  },
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
