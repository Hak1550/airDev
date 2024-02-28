import React from 'react';
import {
  AddCrewContentContainer,
  AddGearFormContainer,
  NavFooter,
  DoneButton,
  UploadContainer,
  UploadSpanFirst,
  UploadSpan2,
} from './styles';
import { OutlinedButton } from '../IconButton/styles';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import UploadIcon from 'Components/Icons/UploadIcon';
import 'react-circular-progressbar/dist/styles.css';
import FileUploadWithProgress from 'Components/FileUploadWithProgress';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { apiAddProjectFilesRequest } from 'Redux/actions/project';

const AddProjectFiles = ({ auth, onRightNavClose, projectId }) => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const MAX_SIZE = 26214400;
  const onFilesSubmit = () => {
    const data = {
      project_id: projectId,
      files: fileList,
    };
    dispatch(apiAddProjectFilesRequest(data, auth.token));
    onRightNavClose();
  };
  const onDrop = files => {
    setFileList([...fileList, ...files]);
  };
  const removeFiles = name => {
    setFileList(fileList.filter(item => item.name !== name));
  };
  const fileSizeValidator = file => {
    const ext = file?.name?.split('.').pop();
    if (
      file?.size > MAX_SIZE ||
      !['png', 'jpg', 'pdf', 'docx'].includes(ext.toLowerCase())
    )
      toast.error('Invalid file format or file size exceeded maximum size', {
        toastId: 'error-size',
      });
  };
  return (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <Dropzone
          onDrop={onDrop}
          accept={{
            'image/png': ['.png', '.jpg'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              ['.docx'],
          }}
          maxSize={MAX_SIZE}
          validator={fileSizeValidator}
        >
          {({ getRootProps, getInputProps, isDragReject, rejectedFiles }) => {
            if (isDragReject || rejectedFiles) {
              toast.error(
                'Invalid file format or file size exceeded maximum size',
                { toastId: 'error-file-upload' },
              );
            }
            return (
              <section>
                <UploadContainer {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div>
                    <UploadIcon />
                    <br />
                    <UploadSpanFirst>Click to upload</UploadSpanFirst>
                    <UploadSpan2> or drag and drop</UploadSpan2>
                    <br />
                    <UploadSpan2>Docx, PDF, JPG or PNG (max. 25MB)</UploadSpan2>
                  </div>
                </UploadContainer>
                <aside>
                  <ul style={{ padding: '0px' }}>
                    {fileList?.map((file, index) => (
                      <FileUploadWithProgress
                        file={file}
                        key={index}
                        removeFiles={removeFiles}
                      />
                    ))}
                  </ul>
                </aside>
              </section>
            );
          }}
        </Dropzone>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onFilesSubmit}
          disabled={fileList.length === 0}
        >
          Confirm
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddProjectFiles;
