import { useEffect, useState } from "react"
import useAxios from "./useAxios"


export default function useFetch(url){

    const api = useAxios();

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await api.get(url)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [])

    return { data, error, loading }

}