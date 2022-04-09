const epochDate = (date) => {
    let year; let monath; let day; let mNull; let dNull;
    let convert = new Date(date * 1000);
    year = convert.getFullYear();
    monath = convert.getMonth()+1;
    day = convert.getDate();
    if (monath<10) { mNull='0' } else { mNull=''; }
    if (day<10) { dNull='0' } else { dNull=''; }
    let backDate= year+'-'+mNull+monath+'-'+dNull+day;
    return backDate;
  }

export default epochDate;