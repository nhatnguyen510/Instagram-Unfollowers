import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { logoutUser } from "../api/user";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const { username } = user;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUser = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    isLoggedIn.current = false;
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: "linear-gradient(to right, #fc5c7d, #6a82fb)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: {
            md: 4,
            xs: 0,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InstagramIcon fontSize="large" sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                justifyContent: { xs: "center", md: "left" },
                fontFamily: "Mynerve",
                fontWeight: 700,
                fontSize: "28px",
                //   letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Instagram Unfollowers
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogoutUser}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
