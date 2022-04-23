import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function MainNavigation() {
    const deleteToken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/user/" + localStorage.getItem("id");
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        SocNet
                    </Typography>
                    <Button color="inherit" href="/home">
                        Home
                    </Button>
                    <Button color="inherit" href="/feed">
                        Feed
                    </Button>
                    <Button color="inherit" href="/people">
                        People
                    </Button>
                    <Button color="inherit" href="/login" onClick={deleteToken}>
                        Logout
                    </Button>
                    <IconButton onClick={routeChange} sx={{ p: 0 }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={localStorage.getItem("imgUrl")}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
