/* Packages */
import React from 'react';

/* Framework Helpers */
import { Badge } from 'aphrodite-react';

/* Components Helpers */
import { Styled } from '../';

/* Constants */
import SHOW_STYLES from './show.styles';

/* Component */
const ShowGenres = (props) => {
    const { genres, styles } = props;

    if (!genres || !genres.length) {
        return (null);
    }

    return (
        <Styled styles={{ textAlign: 'center', marginRight: '-5px', marginLeft: '-5px', ...styles }}>
            {genres.map((genre, index) => (
                <Badge
                    sm
                    key={index}
                    color="black"
                    styles={SHOW_STYLES.GENRE_BADGE}
                    className="show-card__content__genres__item">
                    {genre}
                </Badge>
            ))}
        </Styled>
    );
};

/* Exporting */
export default ShowGenres;
