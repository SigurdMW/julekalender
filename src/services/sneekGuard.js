export default function sneekGuard(requestedDay){
  let today = new Date();
  let month = today.getMonth()+1;
  let day = today.getDate();

  // for testing
  // month = 12;
  // day = 1;

  return (parseInt(requestedDay) > day || month !== 12)  ? false : true;
}
