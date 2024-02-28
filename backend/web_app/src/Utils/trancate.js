export default function truncate(str, n, ending = '...') {
  if (str) {
    return str.length > n ? str.substr(0, n - 1) + ending : str;
  } else {
    return '';
  }
}
