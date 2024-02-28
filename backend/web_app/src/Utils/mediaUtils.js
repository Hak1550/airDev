import { CopyObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { toast } from 'react-toastify';
import CoverImg from '../Assets/images/cover.jpg';

export const generateVideoThumbnail = async file => {
  // if (file.size <= 209715200) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = async () => {
      // canvas.width = video.videoWidth;
      // canvas.height = video.videoHeight;

      canvas.width = 640;
      canvas.height = 360;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.pause();
      // return resolve(canvas.toDataURL('image/png'));
      let thumbnail = null;
      await canvas.toBlob(blob => {
        thumbnail = new File(
          [blob],
          `thumbnail-${file.name.split('.').slice(0, -1).join('.')}.jpg`,
          {
            type: 'image/jpeg',
          },
        );
        return resolve(thumbnail);
      }, 'image/jpeg');
      // return resolve(file);
    };
  });
  // } else {
  //   const response = await fetch(CoverImg);
  //   const blob = await response.blob();
  //   const modifiedBlob = new File(
  //     [blob],
  //     `thumbnail-${file.name.split('.').slice(0, -1).join('.')}.jpg`,
  //     {
  //       type: 'image/jpeg',
  //     },
  //   );
  //   return modifiedBlob;
  // }
};

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};

export function download_files(files) {
  function download_next(i) {
    if (i >= files.length) {
      return;
    }
    var a = document.createElement('a');
    a.href = files[i].download;
    a.target = '_parent';
    a.rel = 'noopener noreferrer';
    // Use a.download if available, it prevents plugins from opening.
    if ('download' in a) {
      a.download = files[i].filename;
    }
    // Add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
      a.click(); // The click method is supported by most browsers.
    }
    // Delete the temporary link.
    a.parentNode.removeChild(a);
    // Download the next file with a small timeout. The timeout is necessary
    // for IE, which will otherwise only download the first file.
    setTimeout(function () {
      download_next(i + 1);
    }, 500);
  }
  // Initiate the first download.
  download_next(0);
}

export const creds = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
};

export const formatTime = totalSeconds => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  return hours + ':' + minutes + ':' + parseInt(seconds);
};

export const formatFileSize = (bytes, si = true, dp = 1) => {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + ' ' + units[u];
};

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

export function parseS3URL(s3Url) {
  const url = new URL(s3Url);
  const key = url.pathname.split('/').pop();
  return key;
}

export const handleCopyObjectToWasabi = async params => {
  let toastId = null;
  try {
    toastId = toast.loading('Please wait...');
    const result = await new S3Client({
      region: process.env.REACT_APP_STORAGE_REGION,
      credentials: creds,
      endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
      signatureVersion: 'v4',
    }).send(new CopyObjectCommand(params));
    toast.update(toastId, {
      render: 'Success!',
      closeButton: true,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });
    return result;
  } catch (err) {
    console.log('Error', err);
    toast.update(toastId, {
      render: err,
      closeButton: true,
      type: 'error',
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
    });
    return err;
  }
};

export function readLargeFile(file) {
  const CHUNK_SIZE = 1024 * 1024 * 10; // Read 10 MB at a time
  let offset = 0;

  const onChunkLoad = event => {
    const chunk = event.target.result;
    // Process the chunk here
    // ...
    offset += chunk.byteLength;
    readChunk();
  };

  const onChunkError = event => {
    console.error('Error reading chunk:', event.target.error);
  };

  const readChunk = () => {
    const reader = new FileReader();
    reader.onload = onChunkLoad;
    reader.onerror = onChunkError;
    const blob = file.slice(offset, offset + CHUNK_SIZE);
    reader.readAsArrayBuffer(blob);
  };

  readChunk();
}
