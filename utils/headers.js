export const requestHeaders = (twoFArequired, token, twoFAcode = '') => {
  if (twoFArequired) {
    return {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
      'CB-2FA-TOKEN': twoFAcode,
    };
  } else {
    return {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
    };
  }
};
