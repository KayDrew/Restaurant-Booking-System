const restaurant = (db) => {


    async function getTables() {
        
   try{

   let result= await db.manyOrNone("SELECT * FROM table_booking");

   console.log(result);

   return result;
   }catch(err){

    console.log(err);
   }
    }

    async function bookTable(tableName) {
        
    }

    async function getBookedTables() {
        // get all the booked tables
    }

    async function isTableBooked(tableName) {
        // get booked table by name
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
    }

    async function editTableBooking(tableName) {
        // get user table booking
    }

    return {
        getTables,
        bookTable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        editTableBooking,
        getBookedTablesForUser
    }
}

export default restaurant;