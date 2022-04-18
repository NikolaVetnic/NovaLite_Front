import * as React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";

export default function BasicCard(props) {
    return (
        <Card sx={{ minWidth: 275 }} spacing={1}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2">{props.content}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
