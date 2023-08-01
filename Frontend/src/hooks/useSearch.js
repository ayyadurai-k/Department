import { useState } from 'react'
import { searchStudent } from '../API/searchAPI';

const useSearch = () => {
    const [input, setInput] = useState('');
    const [load, setLoad] = useState(false);
    const [searchResult,setSearchResult]=useState(null)
    const [error, setError] = useState(null)
    
    const handleChange = (e) => {
        const { value } = e.target;

        setInput(() => {
            return value;
        })
    }

    const handleSubmit = async(e) => {
        if (!input.trim()) {
            return setError("RegNo is Required")
        }
        else if (input.length  !== 10) {
            return setError("RegNo Only 10 Character !")
        }
        else if(!input.toUpperCase().includes('ITC') && !input.toUpperCase().includes('CSC')){
            return setError("CS & IT Are Only Allowed")
        }
        
        setError(null)
        try {
            setLoad(true);
            const {data} = ( await searchStudent(input.toUpperCase())).data;
            console.log(data);
            setSearchResult({
                name: data.name,
                email: data.email,
                phone : data.phone
            })
        }
        catch (err) {
    
            setSearchResult(null);
        }
        finally{
            setTimeout(() => {
                setLoad(false)
            },1000)
        }
    }


    return {input,error,load,searchResult,handleChange,handleSubmit}
}

export default useSearch