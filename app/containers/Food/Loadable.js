/**
 *
 * Asynchronously loads the component for Food
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
