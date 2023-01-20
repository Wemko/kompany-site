export type CompaniesResponse = {
    data: Company[]
}

export type CompanyResponse = {
    data: Company
}

export type CompanyDetailsResponse = {
    data: CompanyDetails[]
}

export type Company = {
    city: string
    createdAt: string
    id: string
    logo: string
    name: string
    streetName: string
    zipCode: string 
}

export type CompanyDetails = {
    catchPhrase: string
    companyId: string
    id: string
    phoneNumber: string
    website: string
}