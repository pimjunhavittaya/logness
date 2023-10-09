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
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useSignup } from '../../hooks/api/useSignup';
import { SubscriptionPlan } from '../../types/user';

export interface SignupModalProps {
  onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
  const { setModalOpened } = useModalContext();

  const { mutate, isError, isSuccess } = useSignup();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEscClose({ onClose });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email) {
      mutate({
        email,
        age,
        gender,
        subscriptionPlan: SubscriptionPlan.Free,
        referrerId: '',
      });
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
      setAge('');
      setGender('');
    }
  }, [isSuccess])

  return (
    <Overlay>
      <Container>
        <Card onSubmit={onSubmit}>
          <CloseIconContainer>
            <CloseIcon onClick={onClose} />
          </CloseIconContainer>
          <Title>Signup</Title>
          { isError && <Alert severity="error" sx={{ mt: 2 }}>Failed to signup.</Alert>}
          { isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Account created.</Alert>}
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
            <CustomInput
              value={age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
              placeholder="Age"
              type="number"
            />
          </Row>
          <Row>
            <FormControl sx={{ width: '60%' }} >
              <InputLabel id="select-gender-label">Gender</InputLabel>
              <Select
                labelId="select-gender-label"
                id="select-gender"
                value={gender}
                onChange={(e: SelectChangeEvent) => setGender(e.target.value)}
                placeholder="Gender"
                label="Gender"
                MenuProps={{
                  sx: { zIndex: 1302 },
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Row>
          <Row>
            <CustomButton as="button" type="submit">
              Submit
            </CustomButton>
          </Row>
          <Row>
            <Typography
              onClick={() => { setModalOpened(Modal.Login) }}
              fontSize={16}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Go to login
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
