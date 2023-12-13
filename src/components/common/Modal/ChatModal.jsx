import React, { useRef } from 'react';
import * as S from './Modal.style';
import { useNavigate } from 'react-router';
import useModal from '../../../hooks/useModal';

const ChatModal = ({ onClose, options }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const { modalRef: modalReference } = useModal({ modalRef, onClose });

  const optionClick = (option) => {
    if (option === '채팅방 나가기') {
      navigate('/chat');
    }
  };

  return (
    <>
      <S.ModalBg ref={modalReference}>
        <S.Ul>
          {options.map((option, index) => (
            <S.Li key={index}>
              <button onClick={() => optionClick(option)}>{option}</button>
            </S.Li>
          ))}
        </S.Ul>
      </S.ModalBg>
    </>
  );
};

export default ChatModal;
