export default function parseDjangoError(errors) {
  console.log('err : ', errors);
  let errorsList = [];
  if (typeof errors === 'string') {
    // const parser = new DOMParser();
    // const res = parser.parseFromString(errors, 'text/xml');
    // return res?.firstChild?.innerHTML;
    return errors;
  }
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const element = errors[key];
      if (typeof element === 'string') {
        if (key !== 'non_field_errors') {
          errorsList.push(
            <div>
              {' '}
              <b className="text-capitalize">{key.replace('_', ' ')}:</b>{' '}
              <span>{element}</span>{' '}
            </div>,
          );
        } else {
          errorsList.push(element);
        }
      } else if (typeof element === 'object') {
        element.forEach(e => {
          if (key !== 'non_field_errors') {
            errorsList.push(
              <div>
                {' '}
                <b className="text-capitalize">
                  {key.replace('_', ' ')}:{' '}
                </b>{' '}
                <span>{e}</span>{' '}
              </div>,
            );
          } else {
            errorsList.push(e);
          }
        });
      }
    }
  }

  if (errorsList.length === 1) {
    return errorsList[0];
  } else {
    return (
      <ul>
        {errorsList.map(e => (
          <li>{e}</li>
        ))}
      </ul>
    );
  }
}
