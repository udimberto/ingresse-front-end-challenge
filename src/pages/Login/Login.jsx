/* Packages */
import React from 'react';
import Helmet from 'react-helmet';

/* Constants */
import { ROUTES } from '../../_constants';

/* Framework Helpers */
import { Container } from 'aphrodite-react';

/* Helper Components */
import { Text, Title, Login } from '../../_components';

/* Component */
const LoginPage = () => {
    return (
        <section>
            <Helmet>
                <title>
                    Login {ROUTES.TITLE}
                </title>
            </Helmet>
            <Container>
                <Title center uppercase bold>
                    Login
                </Title>
                <Text center>
                    Choose your social login preference.
                </Text>
                <Text center styles={{ paddingBottom: '40px' }}>
                    You must need to <strong>authorize browser Pop-Ups</strong> to proceed.
                </Text>
                <Login id="FromPage" />
            </Container>
        </section>
    );
};

/* Exporting */
export default LoginPage;
