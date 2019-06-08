/**
 *
 * Asynchronously loads the component for Book
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
