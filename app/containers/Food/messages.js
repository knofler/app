/*
 * Food Messages
 *
 * This contains all the text for the Food container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.Food";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Food container!"
  }
});
