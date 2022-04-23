import { Card, CardContent } from "@mui/material";

export default function CardFrame(props) {
    return (
        <div>
            <Card spacing={1}>
                <CardContent>
                    <main>{props.children}</main>
                </CardContent>
            </Card>
        </div>
    );
}
