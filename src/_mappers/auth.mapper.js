/**
 * Auth Mapper
 *
 * @param {object} state - Global context values
 * @param {object} props - Component properties
 *
 * @return {object} to be merged with Component properties
 */
export const authMapper = (state, props) => {
    const { auth } = state;

    return auth;
};
