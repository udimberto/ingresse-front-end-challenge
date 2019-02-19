/* Packages */
import React from 'react';
import { connect } from 'react-redux';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { Container, NumberFormat } from 'aphrodite-react';

/* Helper Components */
import { Column, Row, ShowCard, Title } from '../../_components';

/* Component */
const Bookmarks = (props) => {
    const { layout, bookmarks } = props;
    const { _lt_, _gt_ }        = layout;
    const columnWidth           = (_lt_.sm ? '50%' : (_gt_.sm ? '20%' : '50%'));
    const {
        list,
        loading,
    } = (bookmarks || {});

    const columnStyles = {
        paddingRight: 0,
        paddingLeft : 0,
        flexBasis   : columnWidth,
        maxWidth    : columnWidth,
    };

    const qtty = (list ? list.length : 0);

    return (
        <section>
            <Container>
                <Title center uppercase bold styles={{ paddingBottom: '40px' }}>
                    Bookmarks
                </Title>
                {(!loading) ? (null) : (
                    <Title center uppercase type="h3" styles={{ marginBottom: '30px', }}>
                        Loading...
                    </Title>
                )}
            </Container>

            {(!qtty) ? (null) : (
                <Container fluid>
                    <Row stretched center rounded={_gt_.sm && qtty < 5}>
                        {list.map((item, index) =>
                            <Column
                                key={`bookmarkShow${index}`}
                                styles={columnStyles}>
                                <ShowCard show={item} mobile={_lt_.md} />
                            </Column>
                        )}
                    </Row>
                </Container>
            )}

            {(loading) ? (null) : (
                <Container>
                    <Title center uppercase type="h3" styles={{ padding: (qtty ? '80px 0' : 0) }}>
                        {(qtty) ? (
                            <span>
                                All the <NumberFormat display="text" value={qtty} /> bookmark{qtty > 1 ? 's' : ''} made by you.
                            </span>
                        ) : ('Nothing here. Yet.')}
                    </Title>
                </Container>
            )}
        </section>
    );
};

/* Exporting */
export default connect(genericMapper)(Bookmarks);
