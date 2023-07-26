import  { useState } from 'react'

const useAttendance = () => {
    const [input, setInput] = useState( {
        dept: 'null',
        year : 'null' 
    })
    const [error,setError]=useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })

    }
    
    const handleSubmit = () => {
        if (input.dept === 'null' || input.year === 'null') {
            return setError("All Fields Are Must Required!")
        }
        console.log(input);
        setError(null);
    }

    return {input,error,setInput,handleChange,handleSubmit}
}

export default useAttendance