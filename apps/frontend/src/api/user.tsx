import axios from 'axios'

const url = 'http://localhost:3000'

export async function AddUser(data:object) {
    console.log(data)
    try {
        const res = await axios.post( `${url}/addUser` , data)
        if(res.status === 200 ){
            console.log('added user', res.data)
            return res.data
        }else{
            console.log('invalid adduser api response', res.data)
        }
    } catch (error) {
        console.log('error calling adduser api', error)
    }
}
