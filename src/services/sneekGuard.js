export default function sneekGuard(requestedDay){
  let today = new Date();
  let month = today.getMonth()+1;
  let day = today.getDate();

  // for testing
  // month = 12;
  // day = 24;

  return (parseInt(requestedDay, 10) > day || month !== 12)  ? false : true;
}