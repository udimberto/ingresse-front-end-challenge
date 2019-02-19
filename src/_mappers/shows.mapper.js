/**
 * Shows Mapper
 *
 * @param {object} state - Global context values
 * @param {object} props - Component properties
 *
 * @return {object} to be merged with Component properties
 */
export const showsMapper = (state, props) => {
    const { shows } = state;

    return shows;
};
