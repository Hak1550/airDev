export default function getFileSize(bytes) {
  if (bytes == 0) return '0 Bytes';
  let k = 1000,
    dm = 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
