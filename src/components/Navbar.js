import React from "react";
import Appbar from "@mui/material/AppBar";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Toolbar, Typography, Button } from "@mui/material";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Appbar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                PERN Stack
              </Link>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/task/new")}
            >
              NewTask
            </Button>
          </Toolbar>
        </Container>
      </Appbar>
    </Box>
  );
};

export default Navbar;
