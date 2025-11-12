import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems, logoutItem } from "../../data/menuItems";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircle,
  KeyboardArrowDown,
} from "@mui/icons-material";
import colors from "../../theme/colors";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout(); 
    handleClose();
    navigate('/');
  };

  if (!user) {
    return (
      <>
        <Button
          startIcon={<AccountCircle sx={{ fontSize: { xs: 20, sm: 24 } }} />}
          endIcon={<KeyboardArrowDown sx={{ fontSize: { xs: 16, sm: 20 } }} />}
          onClick={handleClick}
          sx={{
            color: "white",
            textTransform: "none",
            border: "1px solid transparent",
            minWidth: { xs: "auto" },
            px: { xs: 1, sm: 1.5 },
            transition: "transform 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.08)" },
          }}
        >
          <Box sx={{ textAlign: "left", ml: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: colors["--clr-gray-7"],
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              Hello, visitor!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Sign In
            </Typography>
          </Box>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
        >
          <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
              sx={{
                bgcolor: colors["--clr-yellow-1"],
                color: colors["--clr-black-3"],
                fontWeight: "bold",
                mb: 1,
                py: { xs: 0.75, sm: 1 },
              }}
            >
              SIGN IN
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                handleClose();
                navigate("/register");
              }}
              sx={{
                color: colors["--clr-blue-gray-1"],
                borderColor: colors["--clr-gray-8"],
                py: { xs: 0.75, sm: 1 },
              }}
            >
              SIGN UP
            </Button>
          </Box>
        </Menu>
      </>
    );
  }

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const firstName = displayName.split(" ")[0];
  const LogoutIcon = logoutItem.icon;

  return (
    <>
      <Button
        startIcon={
          <Avatar
            src={user.photoURL}
            alt={displayName}
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        }
        endIcon={<KeyboardArrowDown sx={{ fontSize: { xs: 16, sm: 20 } }} />}
        onClick={handleClick}
        sx={{
          color: "white",
          textTransform: "none",
          border: "1px solid transparent",
          minWidth: { xs: "auto" },
          px: { xs: 1, sm: 1.5 },
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.08)" },
        }}
      >
        <Box sx={{ textAlign: "left", ml: 0.5 }}>
          <Typography
            variant="caption"
            display="block"
            sx={{ color: colors["--clr-gray-7"] }}
          >
            Hello, {firstName}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Account & Lists
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
      >
        <Box sx={{ px: 2, py: 1.5, bgcolor: colors["--clr-white-2"] }}>
          <Typography variant="body2" fontWeight="bold">
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: colors["--clr-gray-3"]}}>
            {user.email}
          </Typography>
        </Box>

        <Divider />

        
        {menuItems.map(({ label, icon: Icon }) => (
          <MenuItem key={label}>
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{logoutItem.label}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
