import React, { useRef, useState, useContext } from 'react';
import * as S from './Modal.style';
import AlertModal from './AlertModal';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import useModal from '../../../hooks/useModal';

const FeedModal = ({ options, onClose }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const { setUserToken, setUserAccountname } = useContext(AuthContextStore);

  const { modalRef: modalReference } = useModal({ modalRef, onClose });

  const optionClick = (option) => {
    if (option === '설정 및 개인정보') {
      navigate('/profile');
      window.location.reload();
    } else if (option === '로그아웃') {
      setSelectedOption(option);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountname');
    setUserToken(null);
    setUserAccountname(null);
    setSelectedOption('');
    navigate('/');
  };

  const closeModal = (option) => {
    console.log(selectedOption);
    if (option === '로그아웃') {
      console.log('로그아웃 성공');
      handleLogout();
    } else if (option === '취소') {
      setSelectedOption('');
      onClose();
    }
  };

  const renderAlertModal = () => {
    if (selectedOption === '로그아웃') {
      return (
        <AlertModal
          message='로그아웃하시겠어요?'
          onClose={closeModal}
          buttons={[
            { text: '취소', color: 'inherit' },
            { text: '로그아웃', color: '#Fd7a6E' },
          ]}
        />
      );
    }

    return null;
  };

  const optionElements = options.map((option, index) => (
    <S.Li key={index}>
      <button onClick={() => optionClick(option)}>{option}</button>
    </S.Li>
  ));

  return (
    <>
      <S.ModalBg ref={modalReference} style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}>
        <S.Ul>{optionElements}</S.Ul>
      </S.ModalBg>
      {renderAlertModal()}
    </>
  );
};

export default FeedModal;
