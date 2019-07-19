/**
 *
 * Asynchronously loads the component for Read
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
