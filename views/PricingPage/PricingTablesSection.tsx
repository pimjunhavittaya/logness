import React, { useCallback } from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';
import { Modal, useModalContext } from '../../contexts/modal.context';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth.context';

export default function PricingTablesSection() {
  const router = useRouter();
  const { setModalOpened } = useModalContext();
  const { isLoggedIn } = useAuthContext();

  const openSignup = useCallback(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      setModalOpened(Modal.SignUp);
    }
  }, []);

  const requestADemo = useCallback(() => {
    void router.push('/request-demo');
  }, []);

  return (
    <Wrapper>
      <SectionTitle>Flexible pricing for agile teams</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title='Free'
          description='Try for free'
          benefits={['1 active workspace', 'Unlimited viewers', '10 notes']}
          onClick={openSignup}
        >
          $0<span>/month</span>
        </PricingCard>
        <PricingCard
          title='Basic'
          description='For individual'
          benefits={['3 active workspaces', 'Unlimited viewers', '50 notes', '10 co-editors']}
          onClick={openSignup}
        >
          $10<span>/month</span>
        </PricingCard>
        <PricingCard
          title='Team'
          description='For small team'
          benefits={['5 active workspaces', 'Unlimited viewers', '100 notes', '50 co-editors', 'PDF Downloader']}
          onClick={openSignup}
        >
          $20<span>/month</span>
        </PricingCard>
        <PricingCard
          title='Enterprise'
          description='For organization'
          demoRequired
          benefits={[
            '> 10 workspaces',
            'Customization',
            'Unlimited viewers',
            'PDF Downloader',
            'Password protection',
            'Workspace analytics',
          ]}
          onClick={requestADemo}
        >
          <span>Request a demo!</span>
        </PricingCard>
      </AutofitGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;
