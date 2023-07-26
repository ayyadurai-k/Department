import  { useState } from 'react'

const useReport = () => {
    const [ input, setInput ] = useState(null)
    const [error,setError] =useState(null)

    const handleChange = (e) => {
        const { value } = e.target;
        setInput(value)
    }

    const handleSubmit = () => {
        console.log(input)
        if (input ===null || input==='null') {
            return setError("Month Is Required ! ");
        }
        setError(null);
    }

    return {
        input,
        error,
        handleChange,
        setError,
        handleSubmit
    }
}

export default useReport