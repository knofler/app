/**
 *
 * Asynchronously loads the component for Search
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
