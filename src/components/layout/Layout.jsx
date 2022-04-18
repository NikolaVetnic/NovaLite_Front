import classes from "./Layout.module.css";
import MainNavigation2 from "./MainNavigation";

function Layout(props) {
    return (
        <div>
            <MainNavigation2 />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;
