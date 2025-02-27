import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  resetUrl: string;
}

export default function ResetPasswordEmail({
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f4f4f4',
          padding: '20px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <Heading>Réinitialisation du mot de passe</Heading>
          <Text>
            Vous avez demandé une réinitialisation de mot de passe. Cliquez sur
            le bouton ci-dessous :
          </Text>
          <Button
            href={resetUrl}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
          >
            Réinitialiser le mot de passe
          </Button>
          <Text>
            Si vous n’avez pas demandé cette action, ignorez cet email.
          </Text>
          <Text>
            Merci,
            <br />
            L’équipe de votre application
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
