import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/font/font.css';
import axios from 'axios';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 245, 245);
  height: 60rem;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Select = styled.select`
  margin-bottom: 10px;
  padding: 0.9rem;
  width: 25rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Option = styled.option`
  width: 25rem;
  border: 10px solid #ccc;
  border-radius: 5px;
  margin-left: 2rem;
`;

const Title = styled.div`
  margin-top: 3rem;
  width: 100%;
  height: 5rem;
  font-size: 2.5rem; //문장 상하 간격
  color: rgb(34, 176, 242);
  font-family: 'RixInooAriDuriR';
  font-weight: 1000;
  display: flex;
  justify-content: center;
  overflow: visible;
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #000f14;
  font-family: 'SUITE-Regular';
  display: flex;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 0.9rem;
  width: 25rem;
  border: 1px solid ${(props) => (props.invalid ? 'red' : '#ccc')};
  border-radius: 5px;
`;

const Button = styled.button`
  width: 25rem;

  margin-top: 1.5rem;
  padding: 15px 20px;
  background-color: rgb(34, 176, 242);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    position: center;
    opacity: 0.8;
  }
`;

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(true);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isValidGender, setIsValidGender] = useState(true);
  const [isValidAge, setIsValidAge] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    //이메일 주소 유효성 검사
    if (!emailRegex.test(username)) {
      setIsValidEmail(false);
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      alert('영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.');
      setIsValidPassword(false);
      return;
    }

    if (password !== passwordCheck) {
      setIsValidPasswordCheck(false);
      alert('비밀번호 값이 일치하지 않습니다.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 10) {
      setIsValidNickname(false);
      alert('닉네임은 2 ~ 10글자 사이어야 합니다.');
      return;
    }

    if (!gender) {
      setIsValidGender(false);
      alert('성별을 선택해주세요.');
      return;
    }

    // 나이 선택 여부 검사
    if (!age) {
      setIsValidAge(false);
      alert('나이를 선택해주세요.');
      return;
    }

    // 유효성 검사에 통과하면 isValid를 true로 설정
    setIsValidEmail(true);
    setIsValidPassword(true);
    setIsValidPasswordCheck(true);
    setIsValidNickname(true);
    setIsValidGender(true);
    setIsValidAge(true);

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('PasswordCheck:', passwordCheck);
    console.log('Nickname:', nickname);
    console.log('Gender:', gender);
    console.log('Age:', age);

    const sendData = {
      email: username,
      password: password,
      nickname: nickname,
      gender: gender,
      age: age,
    };
    //회원가입
    axios
      .post('http://localhost:8080/api/v1/auth/signup', sendData)
      .then((response) => {
        // 회원가입 성공
        alert('회원가입에 성공하였습니다!');
        // navigate('/main');
      })
      .catch((error) => {
        console.log(실패);
      });
  };

  return (
    <SignUpContainer>
      <Title>HANG OUT</Title>
      <SignUpForm onSubmit={handleSignUp}>
        <InputTitle>이메일</InputTitle>
        <Input
          type="text"
          placeholder="이메일"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          invalid={!isValidEmail}
        />
        <InputTitle>비밀번호</InputTitle>
        <InputTitle
          style={{ color: '#a3a5a5', marginTop: '0.5rem', fontWeight: '100' }}
        >
          영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
        </InputTitle>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={!isValidPassword}
        />
        <InputTitle>비밀번호 확인</InputTitle>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          invalid={!isValidPasswordCheck}
        />
        <InputTitle>닉네임</InputTitle>
        <InputTitle
          style={{ color: '#a3a5a5', marginTop: '0.5rem', fontWeight: '100' }}
        >
          다른 유저와 겹치지 않도록 입력해주세요. (2~10자)
        </InputTitle>
        <Input
          type="text"
          placeholder="닉네임 (2~10자)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          invalid={!isValidNickname}
        />
        <InputTitle>회원정보</InputTitle>
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          invalid={!isValidGender}
        >
          <Option value="">성별</Option>
          <Option value="남자">남자</Option>
          <Option value="여자">여자</Option>
        </Select>

        <Select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          invalid={!isValidAge}
        >
          <Option value="">나이</Option>
          <Option value="10대">10대</Option>
          <Option value="20대">20대</Option>
          <Option value="30대">30대</Option>
          <Option value="40대">40대</Option>
          <Option value="50대">50대</Option>
        </Select>
        <Button type="submit">회원가입</Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUpPage;
