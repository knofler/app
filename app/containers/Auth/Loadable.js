/**
 *
 * Asynchronously loads the component for Auth
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
