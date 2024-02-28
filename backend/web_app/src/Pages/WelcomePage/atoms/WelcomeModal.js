import { ModalFooter } from 'Components/CommonStyles';
import { Button, Modal as ReactModal } from 'react-bootstrap';
import { ModalBody, Play, VideoPreview } from '../styles';
import VideoPlayerPreview from 'Assets/images/videoPlayerPreview.svg';
import PlayButton from 'Assets/images/playButton.svg';
const WelcomeModal = ({
  handleShowVideo,
  handleModal,
  show,
  handleBeginTutorial,
}) => (
  <ReactModal
    show={show}
    onHide={handleModal}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ReactModal.Body>
      <VideoPreview onClick={handleShowVideo}>
        <img src={VideoPlayerPreview} alt="Preview" />
        <Play src={PlayButton} alt="Play" />
      </VideoPreview>
      <ReactModal.Title id="contained-modal-title-vcenter">
        Welcome to AIR Cloud
      </ReactModal.Title>
      <ModalBody>
        We’re glad to have you onboard. Here are some quick tips to get you up
        and running.
      </ModalBody>
      <ModalFooter variant="primary">
        <Button variant="light" onClick={handleModal}>
          Skip
        </Button>
        <Button onClick={handleBeginTutorial} variant="primary">
          Next
        </Button>
      </ModalFooter>
    </ReactModal.Body>
  </ReactModal>
);

export default WelcomeModal;
