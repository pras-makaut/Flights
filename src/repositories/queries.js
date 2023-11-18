function addRowLock(flightId){
    return `SELECT * FROM Flights where Flights.id = ${flightId} FOR UPDATE;`;
}

module.exports = {
    addRowLock
}