import moment from 'moment';

const DEPRECATION_MESSAGE =
  'isSameUser and isSameDay should be imported from the utils module instead of using the props functions';

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = moment(parseInt(currentMessage.createdAt, 10));
  const diffCreatedAt = moment(parseInt(diffMessage.createdAt, 10));
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
export function isSameTime(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(parseInt(currentMessage.createdAt, 10));
  const diffCreatedAt = moment(parseInt(diffMessage.createdAt, 10));
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.diff(diffCreatedAt, 'minutes');
}
export function isSameUser(currentMessage = {}, diffMessage = {}) {
  return !!(
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

export function warnDeprecated(fn) {
  return (...args) => {
    // eslint-disable-next-line
    console.warn(DEPRECATION_MESSAGE);
    return fn(...args);
  };
}
