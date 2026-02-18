"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Paper,
  Chip,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string | null;
}

function DashboardNav({ user, onLogout }: { user: User; onLogout: () => void }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
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
            onClick={() => router.push("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", mr: 4 }}
          >
            <Image src="/logo.png" alt="ResumeCraft" width={28} height={28} />
            <Typography variant="h6" fontWeight={800} color="primary.main" sx={{ letterSpacing: "-0.5px" }}>
              ResumeCraft
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <Button sx={{ color: "primary.main", fontWeight: 600, fontSize: "0.875rem" }}>
              Dashboard
            </Button>
            <Button sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.875rem" }}>
              Templates
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 1, display: { md: "none" } }} />

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              src={user.profilePic || undefined}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {!user.profilePic && user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 200, borderRadius: 2 } } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" fontWeight={700} color="text.primary">
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); router.push("/profile"); }}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => { setAnchorEl(null); onLogout(); }}
              sx={{ color: "error.main" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const sampleResumes = [
  { id: "1", title: "Software Engineer Resume", updatedAt: "2 hours ago", status: "Draft" },
  { id: "2", title: "Full Stack Developer CV", updatedAt: "1 day ago", status: "Completed" },
  { id: "3", title: "Frontend Developer Resume", updatedAt: "3 days ago", status: "Draft" },
];

function ResumeCard({ resume }: { resume: typeof sampleResumes[0] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "grey.100",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: "0 4px 20px rgba(21,101,192,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            height: 180,
            bgcolor: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid",
            borderColor: "grey.100",
            position: "relative",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "60%",
              height: "80%",
              p: 2,
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 1,
            }}
          >
            <Box sx={{ height: 8, bgcolor: "grey.300", borderRadius: 1, mb: 1, width: "50%" }} />
            <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, mb: 0.5, width: "80%" }} />
            <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, mb: 0.5, width: "70%" }} />
            <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, mb: 1, width: "60%" }} />
            <Box sx={{ height: 6, bgcolor: "grey.300", borderRadius: 1, mb: 0.5, width: "40%" }} />
            <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, width: "90%" }} />
          </Paper>

          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            slotProps={{ paper: { sx: { borderRadius: 2, minWidth: 160 } } }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <EditIcon fontSize="small" sx={{ mr: 1.5 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <ContentCopyIcon fontSize="small" sx={{ mr: 1.5 }} /> Duplicate
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <DownloadIcon fontSize="small" sx={{ mr: 1.5 }} /> Download
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: "error.main" }}>
              <DeleteOutlineIcon fontSize="small" sx={{ mr: 1.5 }} /> Delete
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="start" mb={1}>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {resume.title}
            </Typography>
            <Chip
              label={resume.status}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                bgcolor: resume.status === "Completed" ? "#E8F5E9" : "#FFF3E0",
                color: resume.status === "Completed" ? "#2E7D32" : "#E65100",
              }}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Updated {resume.updatedAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function CreateNewCard() {
  return (
    <Card
      sx={{
        height: "100%",
        border: "2px dashed",
        borderColor: "grey.200",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "#F0F6FF",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Avatar sx={{ width: 56, height: 56, bgcolor: "#E3F2FD", color: "primary.main" }}>
          <AddIcon sx={{ fontSize: 28 }} />
        </Avatar>
        <Typography variant="body1" fontWeight={600} color="text.primary">
          Create New Resume
        </Typography>
        <Typography variant="body2" textAlign="center">
          Start from scratch or pick a template
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading || !user) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
        <Skeleton variant="rectangular" height={64} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton variant="text" width={300} height={50} sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <DashboardNav user={user} onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} color="text.primary" mb={0.5}>
              Welcome back, {user.name.split(" ")[0]}!
            </Typography>
            <Typography variant="body1">
              Manage your resumes and create new ones.
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ px: 3 }}>
            New Resume
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <FolderOpenIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography variant="h6" fontWeight={600} color="text.primary">
            My Resumes
          </Typography>
          <Chip
            label={sampleResumes.length}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 22,
              bgcolor: "#E3F2FD",
              color: "primary.main",
            }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CreateNewCard />
          </Grid>
          {sampleResumes.map((resume) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={resume.id}>
              <ResumeCard resume={resume} />
            </Grid>
          ))}
        </Grid>

        <Paper
          sx={{
            mt: 6,
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #1E88E5 100%)",
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="white" mb={0.5}>
              Ready to build your next resume?
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              Choose from professional templates and let AI help you craft the perfect resume.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            sx={{
              bgcolor: "white",
              color: "primary.dark",
              fontWeight: 700,
              px: 3,
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            Browse Templates
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
