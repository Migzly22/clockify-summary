import axios from 'axios';

export async function GET(link : string, headers ?: Record<string, string>){
    try {
        const response = await axios.get(link, {
            headers:  {
                'Content-Type': 'application/json',
                ...(headers || {})
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}