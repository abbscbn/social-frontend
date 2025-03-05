import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { setCurrentUser } from "../Redux/AppSlice";
import logo from "../assets/logo_guncel.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.app);

  const LogOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="relative" sx={{ backgroundColor: "#0da135" }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="" height={45} width={70} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Abbas's Social
          </Typography>
          <div>
            {currentUser ? (
              <Button
                onClick={() => navigate("/newpost")}
                style={{ marginRight: "5px" }}
                variant="outlined"
                className="navbarfont"
                color="inherit"
              >
                Yeni Gönderi
              </Button>
            ) : null}
          </div>
          <div>
            {currentUser ? (
              <Button
                style={{ marginRight: "5px", textTransform: "none" }}
                variant="outlined"
                onClick={() => navigate("/user/" + currentUser?.id)}
                color="inherit"
              >
                {currentUser ? currentUser.username : undefined}
              </Button>
            ) : null}
          </div>
          <div>
            {currentUser ? (
              <Button variant="outlined" onClick={LogOut} color="inherit">
                ÇIKIŞ
              </Button>
            ) : (
              <div>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  color="inherit"
                >
                  GİRİŞ
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="outlined"
                  onClick={() => navigate("/register")}
                  color="inherit"
                >
                  KAYIT OL
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
