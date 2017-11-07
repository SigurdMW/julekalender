export default function sneekGuard(day){
  let today = new Date();
  let month = today.getMonth()+1;

  // for testing
  month = 12;

  return (parseInt(day) > today.getDate() || month !== 12) ? false : true;
}
