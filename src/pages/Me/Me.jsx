/* Packages */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

/* Mappers */
import { authMapper } from '../../_mappers';

/* Constants */
import { ROUTES } from '../../_constants';

/* Framework Helpers */
import { Container } from 'aphrodite-react';

/* Helper Components */
import { CommentsList, Image, Title } from '../../_components';
import MeForm from './MeForm';

/* Component */
const Me = (props) => {
    const { data } = props;

    if (!data || !data.uid) {
        return (null);
    }

    return (
        <section>
            <Helmet>
                <title>
                    Me {ROUTES.TITLE}
                </title>
            </Helmet>
            <Container>
                <Title center uppercase bold>
                    YOU
                </Title>
            </Container>
            {(!data) ? (null) : (
                <Container xs>
                    <Title center uppercase type="h3">
                        Profile
                    </Title>
                    <Image
                        avatar
                        width={160}
                        src={data.photoURL}
                    />
                    <div>
                        <MeForm user={data} />
                    </div>
                </Container>
            )}
            <Container xs style={{ paddingTop: '50px' }}>
                <Title center uppercase type="h3">
                    Activities
                </Title>
                <div>
                    <CommentsList
                        userId={data.uid}
                        styles={{ paddingTop: 0 }}
                    />
                </div>
            </Container>
        </section>
    );
};

/* Exporting */
export default connect(authMapper)(Me);
