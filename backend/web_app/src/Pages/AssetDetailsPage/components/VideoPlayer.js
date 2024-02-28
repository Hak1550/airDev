import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { CenterDiv } from '../../../Components/CommonStyles';
import { Card } from '../styles';
import Controls from './Controls';
import screenful from 'screenfull';
import { Backdrop, CircularProgress } from '@mui/material';
import { creds, dataURItoBlob, parseS3URL, uuidv4 } from 'Utils/mediaUtils';
import {
  CopyObjectCommand,
  ObjectCannedACL,
  S3,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { toast } from 'react-toastify';
import { apiGetMediaDetailsRequest } from 'Redux/actions/media';
import { useDispatch } from 'react-redux';

const VideoPlayer = ({
  url,
  thumbnailURL,
  bucketName,
  data,
  assetId,
  assetKey,
  token,
}) => {
  // const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState('normal');
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,
    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
    loader: true,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    controls,
    light,
    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
    loader,
  } = state;

  const format = seconds => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handlePlayPause = () => {
    if (state.loadedSeconds === state.playedSeconds) {
      playerRef.current.seekTo(0);
      setState({ ...state, playing: true });
    } else setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = changeState => {
    if (count > 3) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }
    if (controlsRef.current.style.visibility == 'visible') {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = e => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, 'fraction');
  };
  const handleDuration = duration => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == 'normal' ? 'remaining' : 'normal',
    );
  };

  const handlePlaybackRate = rate => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    if (muted) {
      setState({ ...state, volume: 100, muted: !state.muted });
    }
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = async () => {
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height,
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    const thumbnail = dataURItoBlob(dataUri);
    console.log('thum  ', thumbnail);
    setBookmarks(bookmarksCopy);
    // const key = parseS3URL(thumbnailURL);
    const thumbnailKey = `thumbnail/${uuidv4()}.png`;
    let toastId = null;
    toastId = toast.loading('Generating thumbnail...');
    const thumnailUpload = new Upload({
      client: new S3({
        region: process.env.REACT_APP_STORAGE_REGION,
        credentials: creds,
        endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
        signatureVersion: 'v4',
      }),
      params: {
        Bucket: bucketName,
        Key: thumbnailKey,
        Body: thumbnail,
        ACL: ObjectCannedACL.public_read,
        Permissions: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['PUT', 'POST', 'DELETE', 'GET'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag'],
          },
        ],
      },
    });
    thumnailUpload
      .done()
      .then(async thumbnailData => {
        console.log('data : ', thumbnailData);
        const updateMetadata = {
          ...data,
          thumbnail: thumbnailData.Location,
        };
        const param = {
          Bucket: bucketName,
          CopySource: `/${bucketName}/${data?.key}`,
          Key: data?.key,
          Metadata: updateMetadata,
          MetadataDirective: 'REPLACE',
        };

        // Create the Amazon S3 bucket.
        try {
          toast.update(toastId, {
            render: 'Uploading thumbnail. Please wait...',
            type: 'loading',
            isLoading: true,
            autoClose: false,
            closeOnClick: false,
          });
          await new S3Client({
            region: process.env.REACT_APP_STORAGE_REGION,
            credentials: creds,
            endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
            signatureVersion: 'v4',
          }).send(new CopyObjectCommand(param));
          toast.update(toastId, {
            render: 'Thumbnail updated successfully',
            type: 'success',
            isLoading: false,
            autoClose: 1000,
            closeOnClick: true,
            closeButton: true,
          });
          dispatch(apiGetMediaDetailsRequest(assetId, token, assetKey));
        } catch (e) {
          console.log('Something went wrong');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  console.log(bookmarks);
  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : '00:00';

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00';
  let elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  // elapsedTime = elapsedTime === totalDuration ? '00:00' : elapsedTime;

  let count = 0;
  return (
    <CenterDiv>
      <Card ref={playerContainerRef}>
        <Backdrop
          sx={{ color: '#fff', zIndex: '0', position: 'absolute' }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={url}
          pip={pip}
          playing={playing}
          controls={false}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onBuffer={e =>
            e.type === 'waiting' && setState({ ...state, loader: true })
          }
          onBufferEnd={e =>
            e.type === 'playing' && setState({ ...state, loader: false })
          }
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
                preload: 'none',
              },
            },
          }}
        />
        <Controls
          ref={controlsRef}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onDuration={handleDuration}
          onRewind={handleRewind}
          onPlayPause={handlePlayPause}
          onFastForward={handleFastForward}
          playing={playing}
          played={played}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onMute={hanldeMute}
          muted={muted}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          onChangeDispayFormat={handleDisplayFormat}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          volume={volume}
          onBookmark={addBookmark}
          loader={loader}
        />
      </Card>
      <canvas ref={canvasRef} width={0} height={0} />
    </CenterDiv>
  );
};

export default VideoPlayer;
