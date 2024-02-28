import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { appConfig } from 'Config/app';

import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zindex: 50,
  },
};

export function RouterPrompt(props) {
  const { when, onOK, onCancel, save } = props;

  const history = useHistory();

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (when) {
      history.block(prompt => {
        setCurrentPath(prompt.pathname);
        setShowPrompt(true);
        return false;
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

  const handleSave = useCallback(async () => {
    if (onOK) {
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        save();
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  const handleYes = useCallback(async () => {
    if (onCancel) {
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);

  const handleCancel = useCallback(async () => {
    if (onCancel) {
      const canRoute = await Promise.resolve(onCancel());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);

  const closeModal = () => {
    setShowPrompt(false);
  };
  return showPrompt ? (
    // <Modal
    //   contentLabel={title}
    //   isOpen={when}
    //   closable={true}
    // >
    // </Modal>
    <Modal isOpen={when} style={customStyles} contentLabel="Example Modal">
      <div style={{ zindex: 50, marginRight: 50 }}>
        <div style={{ width: '100%' }}>
          <p style={{ fontWeight: '500', fontSize: '16px' }}>
            {appConfig.API_BASE_URL.split('/')[2]} says:
          </p>
        </div>
        <p style={{ fontSize: '16px', color: '#333' }}>
          You have unsaved changes, are you sure want to leave?
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: '5px',
          zIndex: 50,
        }}
      >
        {/* <div
          style={{
            width: 100,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '1px solid #7b61ff',
          }}
          onClick={handleCancel}
        >
          <p style={{ color: '#7b61ff', marginBottom: 0 }}>No</p>
        </div> */}
        <div
          style={{
            width: 100,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            border: '1px solid #7b61ff',
            marginLeft: '20px',
            zIndex: 50,
            cursor: 'pointer',
          }}
          onClick={handleYes}
        >
          <p style={{ color: '#7b61ff', marginBottom: 0 }}>Discard</p>
        </div>
        <div
          style={{
            width: 100,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            backgroundColor: '#7b61ff',
            marginLeft: '20px',
            cursor: 'pointer',
          }}
          onClick={handleSave}
        >
          <p style={{ color: '#fff', marginBottom: 0 }}>Save</p>
        </div>
      </div>
    </Modal>
  ) : null;
}
