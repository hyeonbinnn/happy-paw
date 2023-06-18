import { useContext } from 'react';
import { useState } from 'react';
import LoginFormInput from '../../components/common/Input/LoginFormInput';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../context/AuthContext';
import * as S from './Login.style';

const initialFormState = {
  email: '',
  password: '',
};

const initialErrorState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(initialErrorState);
  const navigate = useNavigate();
  const { setUserToken, setUserAccountname } = useContext(AuthContextStore);

  const req = {
    user: {
      email: formData.email,
      password: formData.password,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      const data = await response.json();

      if (data.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
        setError({ ...error, password: data.message });
      } else {
        console.log(data, error);
        navigate('/home');
        saveUserInfo(data);
      }
    } catch (error) {
      console.error('실패했다:', error);
    }
  };

  const saveUserInfo = (data) => {
    const token = data.user.token;
    const accountname = data.user.accountname;
    localStorage.clear();
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('accountname', JSON.stringify(accountname));
    setUserToken(token);
    setUserAccountname(accountname);
  };

  let formIsValid = false;
  if (error.email === 'noError' && error.password === 'noError') formIsValid = true;

  return (
    <S.Main>
      <S.LayoutWrapper>
        <S.Form onSubmit={handleSubmit}>
          <S.Section>
            <S.Heading>로그인</S.Heading>

            <LoginFormInput
              id='email'
              label='이메일'
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
              inputProps={{
                type: 'email',
                placeholder: '이메일 주소를 입력해 주세요.',
              }}
            />

            <LoginFormInput
              id='password'
              label='비밀번호'
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
              inputProps={{
                type: 'password',
                placeholder: '비밀번호를 설정해 주세요.',
                autoComplete: 'off',
              }}
            />

            {/* formIsValid에 의해 둘 중 하나의 값이 LoginBtn-> Button 컴포넌트 프롭스로 들어가게된다. */}
            <S.LoginBtn mode={formIsValid ? 'default' : 'disabled'} size='lg'>
              로그인
            </S.LoginBtn>
          </S.Section>
        </S.Form>
      </S.LayoutWrapper>
    </S.Main>
  );
};

export default Login;