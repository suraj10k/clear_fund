import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { authContext } from "../../contexts/auth-context";
import { Backdrop } from "@mui/material";
import Signup from "./Signup";

const ResponsiveAppBar = () => {
  const [showSignUp, setShowSignUp] = React.useState(false);
  const { user, login, logout } = React.useContext(authContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            
          >
            <Link to="/"><img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-funding-bitcoin-kiranshastry-gradient-kiranshastry.png"/></Link>
          </Typography>
          <nav>
            <ul>
              <li>
              <Button startIcon={<PostAddIcon/>} component={Link} to='/posts' variant="contained">All Posts</Button>
              </li>
              {user && (
                <li>
                <Button startIcon={<PostAddIcon/>} component={Link} to='/my-posts' variant="contained">New Post</Button>
                </li>
              )}
            </ul>
          </nav>
          {user ? (
            <>
              <Button
                onClick={() => logout()}
                sx={{
                  background: "white",
                  color: "#1976d2",
                  position: "absolute",
                  right: "40px",
                  "&:hover": { background: "white", color: "#1976d2" },
                }}
                variant="outlined"
              >
                logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setShowSignUp(true)}
                sx={{
                  background: "white",
                  color: "#1976d2",
                  position: "absolute",
                  right: "150px",
                  "&:hover": { background: "white", color: "#1976d2" },
                }}
                variant="outlined"
              >
                signup
              </Button>
              <Button
                onClick={() => login(1)}
                sx={{
                  background: "white",
                  color: "#1976d2",
                  position: "absolute",
                  right: "40px",
                  "&:hover": { background: "white", color: "#1976d2" },
                }}
                variant="outlined"
              >
                login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
      <Backdrop open={showSignUp} onClick={() => setShowSignUp(false)} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Signup />
      </Backdrop>
    </AppBar>
  );
};
export default ResponsiveAppBar;
