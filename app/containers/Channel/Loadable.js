/**
 *
 * Asynchronously loads the component for Channel
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
