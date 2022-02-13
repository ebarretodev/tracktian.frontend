export type CompanyType = {
    _id: string,
    name: string,
    address: string,
    business: string
}

export type UnitType = {
    _id: string,
    name: string,
    company: string,
    owner: string,
}

export type AssetType = {
    _id: string,
    name: string,
    model: string,
    owner: string,
    description: string,
    health: string,
    status: string
}



export type UserType = {
    _id: string,
    username: string,
    email: string,
    company:string,
}

export type ParamsTypes = {
    _id: string,
}

export type DataDashboardType = {
    totalAssets: number,
    totalUnits: number,
    stoppedCount: number,
    runningCount: number,
    alertingCount: number,
    healthRatio: number,
    assets: Array<AssetType>
}