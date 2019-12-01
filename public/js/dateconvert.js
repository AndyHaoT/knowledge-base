exports.convertTimestamp = function(date) {
    let monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    current_date = new Date(date);
    return current_date.getDate() + " " + monthNames[current_date.getMonth()] + " " + current_date.getFullYear();
}