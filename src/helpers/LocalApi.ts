import axios from "axios"

const BASE_URL_API = `http://localhost:5000`

const localApi = {
    getUsers: ()  => { return axios.get(`${BASE_URL_API}/users`)},
    getUser: (id: string) => { return axios.get(`${BASE_URL_API}/users/${id}`)},
    putUser: (id: number, values: any) => { return axios.put(`${BASE_URL_API}/users/${id}`, values)},
    deleteUser: (id: number) => { return axios.delete(`${BASE_URL_API}/users/${id}`)},
    postUser: (data: any ) => { return axios.post(`${BASE_URL_API}/users`, data)},

    getCompanies: () => { return axios.get(`${BASE_URL_API}/companies`)},
    getCompany: (id: string) => { return axios.get(`${BASE_URL_API}/companies/${id}`)},
    putCompany: (id: number, values: any) => { return axios.put(`${BASE_URL_API}/companies/${id}`, values)},
    deleteCompany: (id: number) => { return axios.delete(`${BASE_URL_API}/companies/${id}`)},
    postCompany: (data: any ) => { return axios.post(`${BASE_URL_API}/companies`, data)},

    getUnits: () => { return axios.get(`${BASE_URL_API}/units`)},
    getUnit: (id: string) => { return axios.get(`${BASE_URL_API}/units/${id}`)},
    putUnit: (id: number, values: any) => { return axios.put(`${BASE_URL_API}/units/${id}`, values)},
    deleteUnit: (id: number) => { return axios.delete(`${BASE_URL_API}/units/${id}`)},
    postUnit: (data: any ) => { return axios.post(`${BASE_URL_API}/units`, data)},

    getAssets: () => { return axios.get(`${BASE_URL_API}/assets`)},
    getAsset: (id: string) => { return axios.get(`${BASE_URL_API}/assets/${id}`)},
    putAsset: (id: number, values: any) => { return axios.put(`${BASE_URL_API}/assets/${id}`, values)},
    deleteAsset: (id: number) => { return axios.delete(`${BASE_URL_API}/assets/${id}`)},
    postAsset: (data: any ) => { return axios.post(`${BASE_URL_API}/assets`, data)},

}

const useApi = () => localApi

export default useApi