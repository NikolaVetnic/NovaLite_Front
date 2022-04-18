import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";

export default function BasicCard(props) {
    return (
        <Card sx={{ minWidth: 275 }} spacing={1}>
            <CardContent>
                <form>
                    <Grid
                        container
                        spacing={1}
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}
                        columns={1}
                        p={2}
                    >
                        <Typography variant="h5" component="div">
                            New Post
                        </Typography>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="title"
                                name="title"
                                label="Post Title"
                                type={"text"}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={10}
                                placeholder="Post Content"
                                style={{ width: 200 }}
                            />
                        </Grid>
                        <Grid item xs="auto" p={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}
