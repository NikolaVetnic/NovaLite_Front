import axios from "axios";

import {
    Avatar,
    Card,
    CardContent,
    Grid,
    IconButton,
    Link,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FriendCard(props) {
    const handleDelete = () => {
        axios
            .delete(
                "/connections/" +
                    localStorage.getItem("id") +
                    "/" +
                    props.user.id,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                props.setOthers([]);
                props.setRequests([]);
                props.setFriends([]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item md={0}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={props.user.imgUrl}
                                    />
                                </Grid>
                                <Grid item md={0}>
                                    <Typography variant="h8">
                                        <Link
                                            href={"/user/" + props.user.id}
                                            user={props.user}
                                            underline="none"
                                        >
                                            {props.user.firstName + " "}
                                            {props.user.lastName}
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container direction="row-reverse">
                                <Grid item>
                                    {props.canDelete && (
                                        <div>
                                            <Grid item>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={handleDelete}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
