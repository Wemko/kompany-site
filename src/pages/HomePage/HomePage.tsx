import { Backspace } from "@mui/icons-material";
import { Button, Container, FormGroup, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Header from "../../components/Header/Header";
import { API_BASE_URL, PAGE_MAX_WIDTH } from "../../constant/constants";
import { CompaniesResponse, Company } from "../../types/Company";

const HomePage: FunctionComponent = () => {
    const [companies, setCompanies] = useState<CompaniesResponse>({ data: [] });
    const [search, setSearch] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const request = async () => {
            console.log('hai')
            const url: URL = new URL(`${API_BASE_URL}/companies`);
            url.search = new URLSearchParams({ search }).toString();

            setError(false);
            setLoading(true);

            try {
                const response = await fetch(url);

                if (response.status === 200) {
                    const data: CompaniesResponse = await response.json();
                    setCompanies(data);
                } else {
                    setError(true);
                }
            } catch (_) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        const shouldDelayRequest = search && !submit;
        const debouncedRequest: NodeJS.Timeout = setTimeout(request, shouldDelayRequest ? 600 : 0);
        return () => clearTimeout(debouncedRequest);
    }, [search, submit, setCompanies]);

    return (
        <>
            <Header title="Home pagina" />
            <main>
                <Container sx={{ maxWidth: PAGE_MAX_WIDTH }}>
                    <form
                        onSubmit={((event: React.FormEvent) => {
                            event.preventDefault();
                            setSubmit(true);
                        })}
                    >
                        <FormGroup row sx={{ justifyContent: 'space-between', alignContent: 'center' }}>
                            <div>
                                <TextField
                                    sx={{ margin: '0 24px' }}
                                    id="search"
                                    label="Zoek op een naam of plaats"
                                    variant="outlined"
                                    value={search}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSubmit(false);
                                        setSearch(event.target.value);
                                    }}
                                />
                                <IconButton aria-label="clear" disabled={search.length === 0} color="primary" onClick={((_) => setSearch(''))}>
                                    <Backspace />
                                </IconButton>
                            </div>
                            <Button sx={{ minWidth: '200px', height: '36px' }} disabled={loading} type="submit" variant="contained">
                                <Typography variant="body2" color="primary.light">{loading ? 'Bezig...' : 'Zoeken'}</Typography>
                            </Button>
                        </FormGroup>
                    </form>
                </Container>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', maxWidth: PAGE_MAX_WIDTH, marginTop: '24px' }}>
                    <Grid justifyContent="center" container rowSpacing="16" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {loading && <Typography variant="body2" color="text.secondary">Bezig met zoeken</Typography>}
                        {error && <Typography variant="body2" color="error.dark">Er is iets fouts gegaan</Typography>}
                        {(companies.data.length <= 0 && !loading && !error) && (
                            <Typography variant="body2" color="text.secondary">Geen resultaten gevonden. Zoek breeder of naar wat anders.</Typography>
                        )}
                        {!loading && !error && companies.data.map((company: Company) => (
                            <Grid sx={{ transition: 'opacity 0.2s eas-in-out' }} key={company.id} item xs={8} sm={5} md={4}>
                                <Link to={`/details/${company.id}`}>
                                    <CompanyCard company={company} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </>
    );
};

export default HomePage;