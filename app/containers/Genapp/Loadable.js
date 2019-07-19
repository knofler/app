/**
 *
 * Asynchronously loads the component for Genapp
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
