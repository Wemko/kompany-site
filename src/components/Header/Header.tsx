import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { PAGE_MAX_WIDTH } from "../../constant/constants";

export type HeaderProps = {
    title: string
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => (
    <AppBar position="sticky" sx={{ marginBottom: '32px' }} >
        <Container sx={{ maxWidth: PAGE_MAX_WIDTH }}>
            <Toolbar>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ marginLeft: '16px' }} variant="h4" color="primary.light">
                        {title}
                    </Typography>
                    <Link to='/'>
                        <img
                            alt="header company logo"
                            src={`${process.env.PUBLIC_URL}/images/kompany.png`}
                            height="50"
                        />
                    </Link>
                </Container>
            </Toolbar>
        </Container>
    </AppBar>
)

export default Header;