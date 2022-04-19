import { Box } from "@mui/material/node_modules/@mui/system";
import MainNavigation from "./MainNavigation";

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <Box sx={{ width: 2 / 4 }} m="auto">
                <main>{props.children}</main>
            </Box>
        </div>
    );
}

export default Layout;
