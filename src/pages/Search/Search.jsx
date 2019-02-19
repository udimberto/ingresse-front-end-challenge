/* Packages */
import React from 'react';
import { connect } from 'react-redux';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { Container, NumberFormat } from 'aphrodite-react';

/* Helper Components */
import { Column, Row, ShowCard, Title, Search as InputSearch } from '../../_components';

/* Component */
const Search = (props) => {
    const { layout, shows } = props;
    const { _lt_, _gt_ }    = layout;
    const { search }        = shows;
    const columnWidth       = (_lt_.sm ? '50%' : (_gt_.sm ? '20%' : '50%'));
    const {
        data,
        term,
        loading,
    } = (search || {});
    const qtty = (data ? data.length : 0);

    const columnStyles = {
        paddingRight: 0,
        paddingLeft : 0,
        flexBasis   : columnWidth,
        maxWidth    : columnWidth,
    };

    return (
        <section>
            <Container>
                <Title center uppercase bold>
                    Search
                </Title>
                <Title center uppercase type="h3">
                    {(loading) ?
                        'Loading...'
                        :
                        ((term) ?
                            (`${data && data.length ? 'Results' : 'Nothing'} to "${term}"`)
                            :
                            ('Search here:')
                        )
                    }
                </Title>
                <Container xs style={{ padding: '0 0 40px' }}>
                    <InputSearch />
                </Container>
            </Container>

            {(!data || !data.length) ? (null) : (
                <Container fluid>
                    <Row stretched center rounded={_gt_.sm && qtty < 5}>
                        {data.map((item, index) =>
                            <Column
                                key={`searchShow${index}`}
                                styles={columnStyles}>
                                <ShowCard show={item} mobile={_lt_.md} />
                            </Column>
                        )}
                    </Row>
                </Container>
            )}

            {(!data || !data.length) ? (null) : (
                <Container>
                    <Title center uppercase type="h3" styles={{ padding: '80px 0' }}>
                        The <NumberFormat display="text" value={data.length} /> most relevant.
                    </Title>
                </Container>
            )}
        </section>
    );
};

/* Exporting */
export default connect(genericMapper)(Search);
