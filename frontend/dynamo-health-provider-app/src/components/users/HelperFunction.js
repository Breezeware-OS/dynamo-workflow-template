/**
 * Get color of the give status
 * @param {*} type status type
 * @returns color code od the status
 */
// eslint-disable-next-line import/prefer-default-export
export const statusBackgroundColor = type => {
  return type === 'active'
    ? ' #90cb92'
    : type === 'suspended'
    ? ' rgba(249, 172, 181, 0.99)'
    : type === 'invited'
    ? 'rgba(167, 196, 230, 0.99)'
    : 'rgba(85, 85, 85, 0.77)';
};
