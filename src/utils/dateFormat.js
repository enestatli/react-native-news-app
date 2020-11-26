const dateFormat = (date, str) => {
  const monthIndex = date.substring(5, 7).replace(/^0+/, '');
  const monthName = str.months[monthIndex - 1];
  const day = date.substring(8, 10).replace(/^0+/, '');
  const year = date.substring(0, 4);
  const hour = date.substring(11, 16);
  const formated =
    monthName + ' ' + day + ',' + ' ' + year + ' ' + '-' + ' ' + hour;

  return formated;
};

export { dateFormat };
