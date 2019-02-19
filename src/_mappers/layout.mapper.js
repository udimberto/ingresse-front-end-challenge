/**
 * Layout Mapper
 *
 * @param {object} state - Global context values
 * @param {object} props - Component properties
 *
 * @return {object} to be merged with Component properties
 */
export const layoutMapper = (state, props) => {
    const { layout } = state;

    return layout;
};
