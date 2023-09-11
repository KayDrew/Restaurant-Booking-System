const restaurant = (db) => {

    let errorMeassage="";
    let success="";
let userError="";
let isBooked=false;
    async function getTables() {
        
   try{
let result= await db.manyOrNone("SELECT * FROM table_booking");

   return result;
   }catch(err){

    console.log(err);
   }
    }

    async function bookTable(username,number_of_people,phoneNumber,id) {

        //check if all parameters are valid
        if(id){

            if(number_of_people){

                if(username){

                    if(phoneNumber){

                        try{

                           await db.none("UPDATE table_booking SET booked=$1,username=$2, number_of_people=$3,contact_number=$4 WHERE id=$5",[true,username,number_of_people,phoneNumber,id]);

                           errorMeassage="";
                           success="Booking Successful!";
                        

                        }
                        catch(err){

                            console.log(err);
                        }
                    }else{

                        errorMeassage="Please enter a contact number";
                        success="";
                    }

                }else{
                    errorMeassage="Please enter a username";
                    success="";
                }

            }

            else{

                errorMeassage="Please enter number of people";
                success="";
            }
        }else{

            errorMeassage="Please select table";
            success="";
        }
        
        console.log(errorMeassage);
        return errorMeassage;
    }



    async function getBookedTables() {
        // get all the booked tables

        try{

           let result= await db.manyOrNone("SELECT * FROM table_booking WHERE booked=$1",true);
       

        return result;
        }catch(err){

            console.log(err)
        }
    }

    async function isTableBooked(tableName) {
        
        try{

           let result= await db.oneOrNone("SELECT * FROM table_name WHERE table_name=$1",tableName);
            if(result.username){
return true;
            }

        }catch(err){

        }
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
   
        try{

            await db.none("UPDATE table_booking SET booked=$1,username=$2,number_of_people=$3,contact_number=$4 WHERE table_name=$5",[false,null,0,null,tableName])
       
       
        }catch(err){

            console.log(err);
        }
    }

    async function getBookedTablesForUser(username) {
        // get user table booking

        if(username){

        try{
//get booking for one user
            let result= await db.oneOrNone("SELECT * FROM table_booking WHERE username=$1",username);
 userError="";
         return result;

         }catch(err){
 
             console.log(err)
         }

        }else{
            userError="No booking found!";
        }

    }

    async function editTableBooking(tableName) {
        // get user table booking
    }

//get error message
    function getError(){

        return errorMeassage;
    }


    //get success message
    function getSuccess(){

        return success;
    }

    function getUserError(){

        return userError;
    }

    return {
        getTables,
        bookTable,
        getBookedTables,
        getUserError,
        isTableBooked,
        cancelTableBooking,
        editTableBooking,
        getError,
        getBookedTablesForUser,
        getSuccess
    }
}

export default restaurant;