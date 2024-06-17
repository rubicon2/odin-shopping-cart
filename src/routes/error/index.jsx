import { useRouteError } from 'react-router';
import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import ErrorText from '../../components/errorText';

export default function Error() {
  const error = useRouteError();

  console.error(error);

  return (
    <Container>
      <PageHeading>An error has occurred:</PageHeading>
      <ErrorText>{error.message}</ErrorText>
    </Container>
  );
}
