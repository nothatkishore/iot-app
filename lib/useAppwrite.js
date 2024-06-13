import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

const useAppwrite = (cusFunction) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await cusFunction()
            setData(response)
        }

        catch (error) {
            Alert.alert('Error', error.message)
        }

        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const reFetch = () => fetchData()

    return { data, isLoading, reFetch }
}


export default useAppwrite