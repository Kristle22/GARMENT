
export const groupBy = (array, key) => {

  let copyArray = [...array];
  let result = copyArray.reduce((acc, el) => {
    acc[el[key]] = acc[el[key]] || [];
    acc[el[key]].push(el);
    return acc;
  }, Object.create(null));
  console.log(result);
  return result;
};

// let deze = {};

// {
//   orders &&
//     Object.keys(groupBy(orders, 'id')).map((key, i) => (
//       <> {key !== 'null' && <Order ord={deze[key]} test={key} />} </>
//     ))
// }