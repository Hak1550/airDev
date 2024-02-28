export function getObjectByLowestValue(objArr, key) {
  const permissions =
    objArr?.length > 0
      ? objArr?.reduce((previous, current) => {
          const { id } = { ...current[key] };
          if (id)
            return current[key]?.id < previous[key]?.id ? current : previous;
          else return current[key] < previous[key] ? current : previous;
        })
      : [];
  return permissions;
}

export function getOrgByAdmin(objArr, userId) {
  return objArr?.find(item => item.user === userId && item.role === 1);
}
