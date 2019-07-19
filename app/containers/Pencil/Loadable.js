/**
 *
 * Asynchronously loads the component for Pencil
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
