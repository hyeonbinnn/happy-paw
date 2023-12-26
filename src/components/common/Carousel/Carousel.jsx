import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 304px;
  height: 304px;
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  transition: transform 500ms ease-in-out;
`;

const Item = styled.li`
  width: 100%;
  flex-shrink: 0;
`;

const Img = styled.img`
  height: 100%;
  object-fit: contain;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const Btn = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.gray)};
`;

const Carousel = ({ img }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const imgArr = img.split(',');
  const btnArr = Array.from({ length: imgArr.length }, (v, i) => i);

  return (
    <Container>
      <List
        style={{
          transform: `translateX(-${currIndex * 100}%)`,
        }}
      >
        {imgArr.map((img, index) => (
          <Item key={index}>
            <Img src={img} alt='이미지' />
          </Item>
        ))}
      </List>
      <BtnContainer>
        {btnArr.map((btn, index) => (
          <Btn key={btn} active={index === currIndex} onClick={() => setCurrIndex(index)} />
        ))}
      </BtnContainer>
    </Container>
  );
};

export default Carousel;
