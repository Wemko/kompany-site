import { Container } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Header from "../../components/Header/Header";
import { API_BASE_URL, PAGE_MAX_WIDTH } from "../../constant/constants";
import { CompanyDetailsResponse, CompanyResponse } from "../../types/Company";

const CompanyDetailsPage: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [company, setCompany] = useState<CompanyResponse>();
    const [companyDetails, setCompanyDetails] = useState<CompanyDetailsResponse>();
    const { id } = useParams();

    useEffect(() => {
        const request = async () => {
            const url: URL = new URL(`${API_BASE_URL}/companies/${id}`);
            const urlDetails: URL = new URL(`${API_BASE_URL}/companies/${id}/details`);

            setError(false);
            setLoading(true);

            try {
                const [response, responseDetails] = await Promise.all([fetch(url), fetch(urlDetails)]);

                if (response.status === 200 && responseDetails.status === 200) {
                    const data: CompanyResponse = await response.json();
                    const dataDetails: CompanyDetailsResponse = await responseDetails.json();

                    setCompany(data);
                    setCompanyDetails(dataDetails);
                } else {
                    setError(true);
                }
            } catch (_) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        request();
    }, [id]);

    if (loading || error) return <></>;

    return <>
        <Header title="Details" />
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', maxWidth: PAGE_MAX_WIDTH, marginTop: '24px' }}>
            {company && companyDetails && <CompanyCard details={companyDetails.data[0]} company={company.data} />}
        </Container>
    </>;
}

export default CompanyDetailsPage;