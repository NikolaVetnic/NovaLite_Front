import Layout from "../components/layout/Layout";
import { Navigate } from "react-router-dom";

function FriendsPage() {
    if (!localStorage.getItem("token")) return <Navigate to="/login" />;

    return (
        <Layout>
            <h1>Friends Page</h1>
        </Layout>
    );
}

export default FriendsPage;
