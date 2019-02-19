/* Packages */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Constants */
import { ROUTES } from '../../_constants';

/* Framework Helpers */
import { Container } from 'aphrodite-react';

/* Helper Components */
import { Styled, Text, Title } from '../../_components';

/* Component */
const NotFound = (props) => {
    const { location } = props;
    const { pathname } = location;

    console.log('location', location);

    return (
        <section>
            <Helmet>
                <title>
                    NotFound {ROUTES.TITLE}
                </title>
            </Helmet>
            <Styled>
                <Container>
                    <Title center uppercase bold>
                        Page Not Found
                    </Title>
                    <Text center>
                        Sorry.
                    </Text>
                    <Text tag="div" center>
                        We don't have any page correspondent to <strong><pre>{pathname}</pre></strong>
                    </Text>
                </Container>
            </Styled>
        </section>
    );
};

/* Exporting */
export default connect(genericMapper)(NotFound);
