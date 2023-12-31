
getCurretDate = () => {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    const todayDate = `${da} ${mo} ${ye}`;
    return todayDate;
}

makeObjectSelected = (obj, props) => {
    let newObj = {};
                                                                                                                                                                                                                                                   
    props.forEach(p => {
        newObj[p] = obj[p];
    });
    return newObj;
}


module.exports = {
    getCurretDate,
    makeObjectSelected
}