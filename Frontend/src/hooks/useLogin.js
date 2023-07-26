import  { useState } from 'react'
import loginValidate from '../utils/loginValidate';

const useLogin = () => {

    //initial input state
    const initialInputState = {
        email: "",
        password :""
    } 

    const [input, setInput] = useState(initialInputState);
    const [error, setError] = useState({});
    const [load, setLoad] = useState(false);
    const [select, setSelect] = useState(1);
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((preInput) => {
            return {
                ...preInput,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const err = loginValidate(input);

        //check error exits or not
        const errExits = Object.keys(err).length > 0 ? true : false;
        
        if (errExits) {
             return setError(err);
        }

        try {
            setLoad(true)
            setError({})
            
        }
        catch (e) {
            console.log(err);
        }
        finally {
            setTimeout(() => {
                setLoad(false);
            },2000)
        }
        setInput(initialInputState)
        console.log(input)
    }

    return {input,error,load,select,setSelect,handleChange,handleSubmit}
}

export default useLogin