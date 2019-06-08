/**
 *
 * Asynchronously loads the component for Crud
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
