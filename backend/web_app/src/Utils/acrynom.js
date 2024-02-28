export default function acroynm(str) {
  var matches = str?.match(/\b(\w)/g);
  return matches ? matches?.join('') : '';
}
