import React, { useRef, useState, useContext, useEffect } from 'react';
import * as S from './Modal.style';
import { AuthContextStore } from '../../../context/AuthContext';
import { reportComment } from '../../../api/comment';
import { deleteComment } from '../../../api/comment';
import AlertModal from './AlertModal';
import useModal from '../../../hooks/useModal';

const CommentModal = ({ onClose, commentId, commentList, postId, commentAuthor, setCommentList, setCommentCnt }) => {
  const modalRef = useRef();
  const { userToken, userAccountname } = useContext(AuthContextStore);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const { modalRef: modalReference } = useModal({ modalRef, onClose });

  useEffect(() => {
    // 댓글 작성자와 현재 사용자의 계정명 비교하여 isLoginUser 값을 설정
    setIsLoginUser(userAccountname === commentAuthor);
  }, [userAccountname, commentAuthor]);

  const options = [
    {
      label: '삭제',
      action: () => {
        fetchDelete();
      },
      showCondition: isLoginUser,
    },
    {
      label: '신고하기',
      action: () => setSelectedOption('신고하기'),
      showCondition: !isLoginUser,
    },
  ];

  const closeModal = (option) => {
    if (option === '확인') {
      fetchReport();
      console.log('신고하기 완료!');
      onClose();
    }
  };

  const fetchDelete = async () => {
    try {
      await deleteComment(postId, commentId, userToken);
      setCommentList(commentList.filter((comment) => comment.id !== commentId));
      setCommentCnt((prev) => prev - 1);
    } catch (error) {
      console.log('댓글 삭제 오류:', error);
      return { success: false, error: '댓글 삭제 오류' };
    }
  };

  const fetchReport = async () => {
    try {
      await reportComment(postId, commentId, userToken);
    } catch (error) {
      console.log(error);
    }
  };

  const renderAlertModal = () => {
    if (selectedOption === '신고하기') {
      return (
        <AlertModal
          message='신고가 완료되었습니다!'
          onClose={closeModal}
          buttons={[{ text: '확인', color: '#Fd7a6E' }]}
        />
      );
    }
    return null;
  };

  return (
    <>
      <S.ModalBg ref={modalReference} style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}>
        <S.Ul>
          {options.map(
            (option, index) =>
              option.showCondition && (
                <S.Li key={index}>
                  <button onClick={option.action}>{option.label}</button>
                </S.Li>
              ),
          )}
        </S.Ul>
      </S.ModalBg>
      {renderAlertModal()}
    </>
  );
};

export default CommentModal;
