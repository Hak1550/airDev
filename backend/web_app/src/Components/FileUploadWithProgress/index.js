import ChangingProgressProvider from 'Components/ChangingProgressProvider';
import { TrashCan } from 'Components/Icons';
import FileIcon from 'Components/Icons/FileIcon';
import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import filename from 'Utils/filename';
import getFileSize from 'Utils/fileSize';
import {
  FileContainer,
  FileDetails,
  FileDetailsSpan1,
  FileDetailsSpan2,
} from './style';

const FileUploadWithProgress = ({ file, removeFiles }) => {
  const [progress, setProgress] = useState(0);
  return (
    <FileContainer>
      <FileDetails>
        <FileIcon />
        <div className="d-flex flex-column">
          <FileDetailsSpan1>{filename(file.name)}</FileDetailsSpan1>
          <FileDetailsSpan2>
            {getFileSize(file?.size)} - {progress}% uploaded
          </FileDetailsSpan2>
        </div>
      </FileDetails>
      {/* <TrashCan /> */}
      <ChangingProgressProvider values={[0, 10, 35, 75, 92, 100]}>
        {percentage => {
          if (progress !== 100) setProgress(percentage);
          return percentage <= 100 ? (
            <div
              style={{
                width: 32,
                height: 32,
                marginRight: '18px',
              }}
            >
              <CircularProgressbar
                value={percentage}
                maxValue={100}
                // text={`${percentage}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.15,
                  pathColor: '#7f56d9',
                })}
                strokeWidth={12}
              />
            </div>
          ) : (
            <div
              style={{ marginRight: '7.5%' }}
              role="button"
              onClick={() => removeFiles(file.name)}
            >
              <TrashCan />
            </div>
          );
        }}
      </ChangingProgressProvider>
    </FileContainer>
  );
};

export default FileUploadWithProgress;
