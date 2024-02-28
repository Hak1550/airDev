import { Modal as ReactModal } from 'react-bootstrap';
import { ModalBody } from './styles';
const Modal = props => (
  <ReactModal
    {...props}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <ReactModal.Body>
      {props.icon && <img src={props.icon} alt="icon" />}
      <ReactModal.Title id="contained-modal-title-vcenter">
        {props.title}
      </ReactModal.Title>
      <ModalBody>{props.body}</ModalBody>
      {props.footer}
    </ReactModal.Body>
  </ReactModal>
);

export default Modal;
