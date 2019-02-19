/**
 * Comments Mapper
 *
 * @param {object} state - Global context values
 * @param {object} props - Component properties
 *
 * @return {object} to be merged with Component properties
 */
export const commentsMapper = (state, props) => {
    const { comments } = state;

    return comments;
};
