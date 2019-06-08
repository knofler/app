/**
 *
 * Asynchronously loads the component for ShipItem
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
