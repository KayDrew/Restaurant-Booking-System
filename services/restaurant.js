const restaurant = (db) => {

    let errorMeassage="";

    async function getTables() {
        
   try{
let result= await db.manyOrNone("SELECT * FROM table_booking");

   return result;
   }catch(err){

    console.log(err);
   }
    }

    async function bookTable(username,number_of_people,phoneNumber,id) {

        if(id){

            if(number_of_people){

            

                if(username){

                    if(phoneNumber){

                        try{

                           await db.none("UPDATE table_booking SET booked=$1,username=$2, number_of_people=$3,contact_number=$4 WHERE id=$5",[true,username,number_of_people,phoneNumber,id]);

                           console.log("successfully inserted");

                        }
                        catch(err){

                            console.log(err);
                        }
                    }else{

                        errorMeassage="Please enter a contact number";
                    }

                }else{
                    errorMeassage="Please enter a username";
                }

            }

            else{

                errorMeassage="Please enter number of people"
            }
        }else{

            errorMeassage="Please select table"
        }
        
        console.log(errorMeassage);
        return errorMeassage;
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