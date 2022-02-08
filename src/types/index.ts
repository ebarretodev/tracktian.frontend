export type CompanyType = {
    id: number,
    name: string,
    address: string,
    business: string
}

export type UnitType = {
    id: number,
    name: string,
    company: string,
    owner: string,
}

export type UserType = {
    id: number,
    username: string,
    email: string,
    company:string,
}

export type ParamsTypes = {
    id: string,
}



