/**
 *
 * Asynchronously loads the component for Order
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
