"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "AI Builder", href: "#ai-builder" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <Box
              onClick={() => handleScroll("#hero")}
              sx={{ mr: 1, cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <Image src="/logo.png" alt="ResumeCraft" width={32} height={32} />
            </Box>
            <Typography
              variant="h6"
              onClick={() => handleScroll("#hero")}
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                mr: 4,
                cursor: "pointer",
              }}
            >
              ResumeCraft
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleScroll(link.href)}
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": { color: "primary.main", bgcolor: "transparent" },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="text" sx={{ color: "text.primary", fontWeight: 600 }}>
                  Login
                </Button>
              </Link>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="small">
                  Sign Up
                </Button>
              </Link>
            </Stack>

            <Box sx={{ flexGrow: 1, display: { md: "none" } }} />
            <IconButton
              sx={{ display: { md: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton onClick={() => handleScroll(link.href)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton href="/login" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ mt: 1, px: 2 }}>
              <Link href="/register" style={{ textDecoration: "none", width: "100%" }}>
                <Button variant="contained" fullWidth onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Button>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
