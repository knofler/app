/**
 *
 * Asynchronously loads the component for Scan
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
