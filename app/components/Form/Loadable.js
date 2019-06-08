/**
 *
 * Asynchronously loads the component for Form
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
