/**
 *
 * Asynchronously loads the component for Chef
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
