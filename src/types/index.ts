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

export type AssetType = {
    id: number,
    name: string,
    model: string,
    owner: string,
    description: string,
    health: string,
    status: string
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

export type DataDashboardType = {
    totalAssets: number,
    totalUnits: number,
    stoppedCount: number,
    runningCount: number,
    alertingCount: number,
    healthRatio: number,
    assets: Array<AssetType>
}