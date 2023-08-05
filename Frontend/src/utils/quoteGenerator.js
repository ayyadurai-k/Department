import quote from '../data/quotes.json'


export const getQuote=()=>{
   const randomIndex = Math.floor(Math.random()*102);
   console.log("called");
    return quote[randomIndex]
}



