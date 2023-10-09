import styled from 'styled-components';
import Page from 'components/Page';
import { media } from 'utils/media';
import FormSection from 'views/RequestDemoPage/FormSection';

export default function RequestDemoPage() {
  return (
    <Page title="Request a Demo" description="Minim sint aliquip nostrud excepteur cupidatat amet do laborum exercitation cupidatat ea proident.">
      <RequestDemoContainer>
        <FormSection />
      </RequestDemoContainer>
    </Page>
  );
}

const RequestDemoContainer = styled.div`
  display: flex;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
