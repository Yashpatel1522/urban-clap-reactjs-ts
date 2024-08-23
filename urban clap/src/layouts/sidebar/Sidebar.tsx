import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { addUser, updateNotification } from "../../reducer/profile";
import userT from "../../types/userT";
import useAxois from "../../hooks/axois";
import { toast } from "react-toastify";
import Toast from "../../components/common/Toast";
import "./sidebar.css"
import Sidebarnavlist from "../../components/sidebar/Sidebarnavlist";

interface settingsT {
  name: string;
  path: string;
}
interface navT {
  link: string;
  name: string;
  icon_classes: string;
}
const settings: settingsT[] = [
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" },
];
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );
  const user = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { axoisGet } = useAxois();

  async function fetchMyAPI() {
    try {
      const response = await axoisGet(`updateuser/`);
      const userdata = response.context;
      user(
        addUser({
          ...userdata,
          profile: { profile_photo: userdata.profile[0].profile_photo },
          notification: [],
        })
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  React.useEffect(() => {
    fetchMyAPI();
  }, []);

  const storedata = useSelector(
    (state: { user: { user: userT } }) => state.user
  );
  React.useEffect(() => {
    if (storedata?.user?.pk != undefined) {
      const socket = new WebSocket(
        `ws://127.0.0.1:8000/ws/notifications/${storedata?.user?.pk}/`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateNotification(data.message));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => socket.close();
    }
  }, [storedata?.user?.pk]);

  const handleOpenNavMenu = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let setNavList: navT[] = [];
  const credentialsReduxData = useSelector(
    (state: { credentials: { credentials: Record<string, unknown> } }) =>
      state.credentials.credentials
  );

  if (credentialsReduxData.is_superuser) {
    setNavList = [
      {
        link: "/dashboard",
        name: "Dashboard",
        icon_classes: "bi bi-speedometer2 fs-5 text-warning",
      },
      {
        link: "/serviceproviders",
        name: "Service Providers",
        icon_classes: "bi bi-people-fill fs-5 text-warning",
      },
      {
        link: "/customers",
        name: "Customers",
        icon_classes: "bi bi-people-fill fs-5 text-warning",
      },
      {
        link: "/reports",
        name: "Reports",
        icon_classes: "bi bi-hourglass-bottom fs-5 text-warning",
      },
      {
        link: "/category",
        name: "Cetegory",
        icon_classes: "bi bi-diagram-3-fill fs-5 text-warning",
      },
      {
        link: "/all-services",
        name: "Show Services",
        icon_classes: "bi bi-gear-wide-connected fs-5 text-warning",
      },
      {
        link: "/status",
        name: "Apoointment Status",
        icon_classes: "bi bi-clock-history fs-5 text-warning",
      },
    ];
  } else if (credentialsReduxData.is_staff) {
    setNavList = [
      {
        link: "/dashboard",
        name: "Dashboard",
        icon_classes: "bi bi-speedometer2 fs-5 text-warning",
      },
      {
        link: "/services",
        name: "Services",
        icon_classes: "bi bi-gear-wide-connected fs-5 text-warning",
      },
      {
        link: "/category",
        name: "Category",
        icon_classes: "bi bi-diagram-3-fill fs-5 text-warning",
      },
      {
        link: "/appointment",
        name: "Appointment",
        icon_classes: "bi bi-calendar-event-fill fs-5 text-warning",
      },
      {
        link: "/slot",
        name: "Slot",
        icon_classes: "bi bi-clock-fill fs-5 text-warning",
      },
    ];
  } else {
    setNavList = [
      {
        link: "/all-services",
        name: "Show Services",
        icon_classes: "bi bi-gear-wide-connected fs-5 text-warning",
      },
      {
        link: "/status",
        name: "Apoointment Status",
        icon_classes: "bi bi-clock-history fs-5 text-warning",
      },
    ];
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#212631" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <div className="d-flex">
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={storedata?.user?.notification?.length}
                    color="error"
                  >
                    <i
                      onClick={() => {
                        navigate("/notification");
                      }}
                      className="bi bi-bell"
                    ></i>
                  </Badge>
                </IconButton>
              </MenuItem>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={storedata?.user?.profile?.profile_photo}
                  />
                </IconButton>
              </Tooltip>
            </div>
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
              {settings.map((setting: settingsT) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Link
                    className="link-offset-2 link-underline link-underline-opacity-0 text-dark"
                    to={setting.path}
                  >
                    {setting.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <Toast />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className='bg-dark'>
          <IconButton onClick={handleDrawerClose} className='text-white'>

            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='bg-dark h-100'>
          <div className=" main-sidebar border-end  p-1 ">
            <div className="mt-4 item-container p-2 d-flex flex-column gap-3">
              {setNavList.map((item, flag) => (
                <Sidebarnavlist key={flag} item={item} />
              ))}
            </div>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

      </Box>
    </Box>
  );

};

export default Sidebar;
