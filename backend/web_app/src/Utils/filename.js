export default function filename(url, length = 15) {
  if (url) {
    const name = url.substring(url.lastIndexOf('/') + 1);
    const fileType = name.split('.').pop();

    return name.length > length
      ? name.substring(0, length + 1 - fileType.length) + '.' + fileType
      : name;
  } else {
    return '';
  }
}
