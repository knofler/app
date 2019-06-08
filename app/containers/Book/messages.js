/*
 * Book Messages
 *
 * This contains all the text for the Book container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Book';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Book container!',
  },
});
