import {useEffect,useState} from 'react'

const useFilterData = (data,key) => {
    const [columnNames,setColumnNames]=useState([])
    const [isAvailable,setIsAvailable]=useState(false)

    useEffect(()=>{
        if(data && data[key] && data[key].length!==0){
            setColumnNames(Object.keys(data[key][0]))
            setIsAvailable(true)
        }
    },[data,key])
  return {columnNames,isAvailable};
}

export default useFilterData