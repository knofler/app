/**
 *
 * Asynchronously loads the component for SearchBox
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
