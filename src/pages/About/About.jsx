/* Packages */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { Container } from 'aphrodite-react';

/* Helper Components */
import { Styled, Text, Title } from '../../_components';

/* Constants */
import { ROUTES } from '../../_constants';

/* Styles */
const ARTICLES = {
    padding: '40px 0',
};

/* Component */
const About = (props) => {
    return (
        <section>
            <Helmet>
                <title>
                    About {ROUTES.TITLE}
                </title>
            </Helmet>
            <Styled>
                <Container>
                    <Title center uppercase bold>
                        Study Case
                    </Title>
                    <Title center type="h3">
                        This is an React Application developed to understand the best practices of Front-End architectures.
                    </Title>
                </Container>
            </Styled>
            <Styled tag="article" styles={ARTICLES}>
                <Container>
                    <Title center>
                        Credits
                    </Title>

                    <Text center>
                        Thanks for every professional who shares and allow your intellectual properties be used for all of us.
                    </Text>

                    <Title center type="h3">
                        FlatIcon
                        <br />
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://www.flaticon.com/authors/photo3idea-studio">
                           photo3idea_studio
                        </a>,
                        <br />
                        by the logo base
                    </Title>

                    <Title center type="h3">
                        Unsplash
                        <br />
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://unsplash.com/@dmjdenise">
                           Denise Jans
                        </a>,
                        <br />
                        by the image
                    </Title>
                </Container>
            </Styled>
            <Styled tag="article" styles={ARTICLES}>
                <Container>
                    <Title center>
                        Technologies Envolved
                    </Title>

                    <Text center>
                        Thanks for every community projects used in here.
                    </Text>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://reactjs.org">
                            ReactJS
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://redux.js.org">
                            Redux
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://github.com/axios/axios">
                            Axios
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://firebase.google.com">
                            Firebase
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://emotion.sh">
                            Emotion
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://fontawesome.com">
                            FontAwesome
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://daneden.github.io/animate.css">
                            Animate.CSS
                        </a>
                    </Title>

                    <Title center type="h3">
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://ingresse.github.io/aphrodite-react">
                            Aphrodite React
                        </a>
                    </Title>
                </Container>
            </Styled>
            <Styled tag="article" styles={ARTICLES}>
                <Container>
                    <Title center>
                        Developed by
                    </Title>

                    <Title center type="h3">
                        @
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://github.com/udimberto">
                           udimberto
                        </a>
                    </Title>
                </Container>
            </Styled>
        </section>
    );
};

/* Exporting */
export default connect(genericMapper)(About);
