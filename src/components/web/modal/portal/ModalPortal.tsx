import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalProps) {
  let targetPosition = document.getElementById('modal');
  if (targetPosition === null) {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    document.body.appendChild(modal);
    targetPosition = modal;
  }

  return ReactDOM.createPortal(children, targetPosition!);
}
