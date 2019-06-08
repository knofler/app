/**
 *
 * Asynchronously loads the component for Dislike
 *
 */

import loadable from "loadable-components";

export default loadable(() => import("./index"));
