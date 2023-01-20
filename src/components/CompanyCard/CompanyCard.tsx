import { Card, CardContent, CardHeader, CardMedia, Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Company, CompanyDetails } from "../../types/Company";

export type CompanyCardProps = {
    company: Company,
    details?: CompanyDetails
}

const CompanyCard: FunctionComponent<CompanyCardProps> = ({ company, details }) => (
    <Card>
        <CardHeader
            title={company.name}
        />
        <CardMedia
            component="img"
            height='251'
            sx={{ objectFit: 'cover' }}
            image={company.logo}
            alt={company.name}
        />
        <CardContent>
            {details && <Typography sx={{ marginBottom: '16px' }} variant="h6" color="text.primary">
                {details.catchPhrase}
            </Typography>}
            <Typography variant="body2" color="text.secondary">
                {company.city} - {company.streetName} {company.zipCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Aangemaakt op: {company.createdAt}
            </Typography>
            {details && <>
                <Typography sx={{ margin: '16px 0' }} variant="h6" color="text.primary">
                    Contact gegevens:
                </Typography>
                <Typography variant="body2" color="text.primary">
                    Telefoon: {details.phoneNumber}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    Website: <Link href={details.website}>{details?.website}</Link>
                </Typography>
            </>}
        </CardContent>
    </Card>
);


export default CompanyCard;