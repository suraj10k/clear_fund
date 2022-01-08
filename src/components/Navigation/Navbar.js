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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { authContext } from "../../contexts/auth-context";

const ResponsiveAppBar = () => {
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
            LOGO
          </Typography>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts">All Posts</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/my-posts">My Posts</NavLink>
                </li>
              )}
            </ul>
          </nav>
          {user? <Button
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
          </Button>:<Button
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
        </Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
