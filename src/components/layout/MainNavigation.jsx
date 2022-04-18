import * as React from "react";

import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function MainNavigation() {
    const deleteToken = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
                    <Button color="inherit" href="/friends">
                        Friends
                    </Button>
                    <Button color="inherit" href="/login" onClick={deleteToken}>
                        Logout
                    </Button>
                    <Avatar
                        alt="Remy Sharp"
                        src={localStorage.getItem("imgUrl")}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
