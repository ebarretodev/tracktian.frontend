import axios, { AxiosResponse } from "axios"
import { UserType } from '../types'

const BASE_URL_API = `http://localhost:5000`

const localApi={
    getUsers: ()  => { return axios.get(`${BASE_URL_API}/users`)},
    getUser: (id: number) => { return axios.get(`${BASE_URL_API}/users/${id}`)},
    putUser: (id: number) => { return axios.put(`${BASE_URL_API}/users/${id}`)},
    deleteUser: (id: number) => { return axios.delete(`${BASE_URL_API}/users/${id}`)},
    postUser: (id: number, data: any ) => { return axios.post(`${BASE_URL_API}/users`, data)},

    getCompanies: () => { return axios.get(`${BASE_URL_API}/companies`)},
    getCompany: (id: number) => { return axios.get(`${BASE_URL_API}/companies/${id}`)},
    putCompany: (id: number) => { return axios.put(`${BASE_URL_API}/companies/${id}`)},
    deleteCompany: (id: number) => { return axios.delete(`${BASE_URL_API}/companies/${id}`)},
    postCompany: (id: number, data: any ) => { return axios.post(`${BASE_URL_API}/companies`, data)},

    getUnits: () => { return axios.get(`${BASE_URL_API}/units`)},
    getUnit: (id: number) => { return axios.get(`${BASE_URL_API}/units/${id}`)},
    putUnit: (id: number) => { return axios.put(`${BASE_URL_API}/units/${id}`)},
    deleteUnit: (id: number) => { return axios.delete(`${BASE_URL_API}/units/${id}`)},
    postUnit: (id: number, data: any ) => { return axios.post(`${BASE_URL_API}/units`, data)},

    getAssets: () => { return axios.get(`${BASE_URL_API}/assets`)},
    getAsset: (id: number) => { return axios.get(`${BASE_URL_API}/assets/${id}`)},
    putAsset: (id: number) => { return axios.put(`${BASE_URL_API}/assets/${id}`)},
    deleteAsset: (id: number) => { return axios.delete(`${BASE_URL_API}/assets/${id}`)},
    postAsset: (id: number, data: any ) => { return axios.post(`${BASE_URL_API}/assets`, data)},

}

export default () => localApi