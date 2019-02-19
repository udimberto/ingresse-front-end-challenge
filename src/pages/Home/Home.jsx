/* Packages */
import React from 'react';
import Helmet from 'react-helmet';

/* Constants */
import { ROUTES } from '../../_constants';

/* Framework Helpers */
import { Container } from 'aphrodite-react';

/* Helper Components */
import { Text, Title } from '../../_components';

/* Component */
const Home = (props) => {
    return (
        <section>
            <Helmet>
                <title>
                    Home {ROUTES.TITLE}
                </title>
            </Helmet>
            <Container>
                <Title center uppercase bold>
                    Home
                </Title>
                <Text center>
                    A simple application to implement the public API of <a href="https://tvmaze.com" target="_blank" rel="noopener noreferrer">TVMaze</a>, reproducing a smaller TV Guide.
                </Text>
            </Container>
        </section>
    )
};

/* Exporting */
export default Home;
