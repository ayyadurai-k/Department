import { useState } from 'react'

const useDetails = () => {

    //initial state for input
    const initialState = {
        dept: 'null',
        year: 'null',
        month :'null'
    }

    const [radio, setRadio] = useState({select:null});
    const [input, setInput] = useState(initialState);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setInput((preInput) => {
            return {
                ...preInput,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {

        if (radio.select === "AD") {
            if (input.dept==='null' || input.year==='null' || input.month==='null') {
                return setError('All Fields Is Must Required');
            }
        }
        if (radio.select === "SD") {
            if (input.dept==='null' || input.year==='null' ) {
                return setError('All Fields Is Must Required');
            }
        }
        setError(null)
        console.log(input);
    }

    return { radio,error, setRadio ,input,setInput,setError,handleChange,handleSubmit};

}

export default useDetails