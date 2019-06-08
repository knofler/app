/**
 *
 * Asynchronously loads the component for CrudControl
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
