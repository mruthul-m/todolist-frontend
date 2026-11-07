import { BASE_URI } from '../../config'


export const RegisterApi = {

    post:  (endpoint: string, body: unknown): Promise<Response> =>

        fetch(`${BASE_URI}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
}

