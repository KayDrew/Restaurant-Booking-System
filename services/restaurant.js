const restaurant = (db) => {


    async function getTables() {
        
        try{

            await db.none("CREATE TABLE table_booking (id serial not null primary key,table_name text not null,capacity int not null,booked boolean not null,username text,number_of_people int,contact_number int)");
           console.log('succefully created');
           
            
        }catch(err){

            console.log(err);
        }
    }

    async function bookTable(tableName) {
        // book a table by name
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