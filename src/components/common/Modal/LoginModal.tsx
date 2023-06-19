import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const handleUseremailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUseremail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Login with useremail:', useremail);
    console.log('Login with password:', password);
  };

  const handleGoogleLogin = () => {
    console.log('google login 이동');
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 40,
          height: '30rem',
          width: '35rem',
          padding: '1rem',
        },
      }}
    >
      <DialogTitle
        style={{ fontSize: '1.6rem', height: '8rem', textAlign: 'center' }}
      >
        로그인
      </DialogTitle>
      <DialogContent style={{ overflowX: 'hidden' }}>
        <InputBox>
          <Input
            type="text"
            placeholder="아이디"
            value={useremail}
            onChange={handleUseremailChange}
          />
        </InputBox>
        <InputBox>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputBox>
        <ButtonBox>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <LoginButton onClick={handleGoogleLogin}>
            <GoogleIcon style={{ marginRight: '0.5rem' }} />
            구글 로그인
          </LoginButton>
        </ButtonBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #3db9ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;