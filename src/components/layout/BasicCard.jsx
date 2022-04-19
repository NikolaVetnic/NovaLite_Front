import axios from "axios";
import * as React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function BasicCard(props) {
    const handleDelete = (event) => {
        event.preventDefault();
        console.log(props.id);

        axios.delete(`http://localhost:9000/posts/del/${props.id}`).then(() => {
            console.log("Del!");
            props.setPosts([]);
        });
    };

    return (
        <Card sx={{ minWidth: 275 }} spacing={1}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2">{props.content}</Typography>
            </CardContent>
            <Stack direction="row" justifyContent="space-evenly" spacing={30}>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" onClick={handleDelete}>
                        Delete
                    </Button>
                </CardActions>
            </Stack>
        </Card>
    );
}
