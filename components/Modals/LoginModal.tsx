import Overlay from '../Overlay';
import Container from '../Container';
import styled from 'styled-components';
import { media } from '../../utils/media';
import React, { useEffect, useState } from 'react';
import CloseIcon from '../CloseIcon';
import useEscClose from '../../hooks/useEscKey';
import { useRouter } from 'next/router';
import Button from '../Button';
import Input from '../Input';
import { Modal, useModalContext } from '../../contexts/modal.context';
import { useAuthContext } from '../../contexts/auth.context';
import { Alert, Typography } from '@mui/material';

export interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { setModalOpened } = useModalContext();

  const { login, isError, isLoggedIn, isLoading, reset } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEscClose({ onClose });

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setModalOpened(null);
    }
  }, [isLoggedIn]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email) {
      login(email);
    }
  }

  return (
    <Overlay>
      <Container>
        <Card onSubmit={onSubmit}>
          <CloseIconContainer>
            <CloseIcon onClick={onClose} />
          </CloseIconContainer>
          <Title>Login</Title>
          { isError && <Alert severity="error" sx={{ mt: 2 }}>Failed to login.</Alert>}
          <Row>
            <CustomInput
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </Row>
          <Row>
            <CustomInput
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
          </Row>
          <Row>
            <CustomButton as="button" type="submit" disabled={isLoading}>
              Submit
            </CustomButton>
          </Row>
          <Row>
            <Typography
              onClick={() => { setModalOpened(Modal.SignUp) }}
              fontSize={16}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              create a new account
            </Typography>
          </Row>
        </Card>
      </Container>
    </Overlay>
  )
}

const Card = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  padding: 10rem 5rem;
  background: rgb(var(--modalBackground));
  border-radius: 0.6rem;
  max-width: 70rem;
  overflow: hidden;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    padding: 7.5rem 2.5rem;
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  svg {
    cursor: pointer;
    width: 2rem;
  }
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 3rem;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;

const CustomButton = styled(Button)`
  height: 100%;
  padding: 1.8rem;
  margin-left: 1.5rem;
  box-shadow: var(--shadow-lg);

  ${media('<=tablet')} {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const CustomInput = styled(Input)`
  width: 60%;

  ${media('<=tablet')} {
    width: 100%;
  }
`;
