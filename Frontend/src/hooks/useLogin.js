import  { useState } from 'react'
import loginValidate from '../utils/loginValidate';
import loginUser from '../API/loginAPI';
import {useNavigate } from 'react-router-dom'

//state
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../app/slicers/errorSlicer';

//auth
import {setItem} from '../Auth/localStorage'

const useLogin = () => {

    //initial input state
    const initialInputState = {
        username: "",
        password :""
    } 

    const dispatch = useDispatch();
    const [input, setInput] = useState(initialInputState);
    const [load, setLoad] = useState(false);

    //select state 
    const select = useSelector((state) => state.select.value.select);
    const error = useSelector((state) => state.error.value);

    //navigation hook
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((preInput) => {
            return {
                ...preInput,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const err = loginValidate(input);

        //check error exits or not
        const errExists = Object.keys(err).length > 0 ? true : false;
        
        if (errExists) {
            return dispatch(setError(err))
        }

        try {
            setLoad(true)
            const result = await loginUser(input, select);
            console.log(result);
            //check success or not
            if (!result.success) {
                console.log(result);
                return dispatch(setError({custom:result.message}))
            }
            //clear error text
            dispatch(setError({}))

            //store token in local storage
            setItem(result.token);

            //navigate to  based on select value 
            if (select === 1) {
                navigate('/staff')
            }
            else if (select === 2) {
                navigate('/student')
            }

        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoad(false);
        }
        setInput(initialInputState);
    }

    return {input,error,load,handleChange,handleSubmit}
}

export default useLogin