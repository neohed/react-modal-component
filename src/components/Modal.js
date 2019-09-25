import React, { useRef, useState, useLayoutEffect, Fragment } from 'react'
import ScrollLock from 'react-scrolllock'
import PropTypes from 'prop-types'
import ModalTrigger from './ModalTrigger'
import ModalContent from './ModalContent'

const Modal = ({ariaLabel, children, triggerText, role}) => {
  const openButtonNode = useRef(null);
  const closeButtonNode = useRef(null);
  const modalNode = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onClickAway = (e) => {
    if (modalNode.current && modalNode.current.contains(e.target)) return;
    onClose();
  };

  useLayoutEffect(() => {
    if (isOpen) {
      closeButtonNode.current.focus();
    } else {
      openButtonNode.current.focus();
    }
  }, [isOpen]);

  return (
      <Fragment>
        <ScrollLock isActive={isOpen} />
        <ModalTrigger
            onOpen={onOpen}
            buttonRef={openButtonNode}
            text={triggerText}
        />
        {isOpen &&
        <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={closeButtonNode}
            modalRef={modalNode}
            content={children}
            onClickAway={onClickAway}
            onClose={onClose}
            role={role}
        />
        }
      </Fragment>
  );
};

Modal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  triggerText: PropTypes.string.isRequired,
  role: PropTypes.string
};

export default Modal;
