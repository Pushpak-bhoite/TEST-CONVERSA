import { useEffect } from "react";
import { init_user } from './actions/actions';
import { useDispatch } from 'react-redux'; 


function AssignUserData(props) {
    const dispatch = useDispatch();
    useEffect( () => {
         assign_user_data();
         setTimeout(()=>{},500)
    },);
    console.log()

    async function assign_user_data(){
        if( localStorage.getItem("user_data" ) !== undefined){
        const user_data= await JSON.parse(localStorage.getItem("user_data"))||null;
        if(user_data!==null){
            dispatch(init_user(user_data))
        }
        }
    }
    return null; 
}

export default AssignUserData;
