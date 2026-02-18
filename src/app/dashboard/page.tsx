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
  CardActionArea,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Skeleton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic?: string | null;
}

interface SavedResume {
  id: string;
  template: string;
  title: string;
  data: Record<string, unknown>;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

function DashboardNav({ user, onLogout }: { user: User; onLogout: () => void }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "white", borderBottom: "1px solid", borderColor: "grey.100" }}
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
            <Button sx={{ color: "primary.main", fontWeight: 600, fontSize: "0.875rem" }}>Dashboard</Button>
            <Button onClick={() => router.push("/templates")} sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.875rem" }}>
              Templates
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 1, display: { md: "none" } }} />

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              src={user.profilePic || undefined}
              sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: "0.85rem", fontWeight: 700 }}
            >
              {!user.profilePic && user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
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
              <Typography variant="body2" fontWeight={700} color="text.primary">{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.email}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); router.push("/profile"); }}>Profile</MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); onLogout(); }} sx={{ color: "error.main" }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function ResumeCard({ resume, onEdit, onDelete }: { resume: SavedResume; onEdit: () => void; onDelete: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "grey.100",
        transition: "all 0.2s ease",
        "&:hover": { borderColor: "primary.light", boxShadow: "0 4px 20px rgba(21,101,192,0.1)" },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <CardActionArea onClick={onEdit}>
          <Box
            sx={{
              height: 200,
              bgcolor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid",
              borderColor: "grey.100",
              overflow: "hidden",
            }}
          >
            {resume.thumbnail ? (
              <Box
                component="img"
                src={resume.thumbnail}
                alt={resume.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            ) : (
              <Box sx={{ width: "60%", height: "80%", p: 2, border: "1px solid", borderColor: "grey.200", borderRadius: 1, bgcolor: "white" }}>
                <Box sx={{ height: 8, bgcolor: "grey.300", borderRadius: 1, mb: 1, width: "50%" }} />
                <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, mb: 0.5, width: "80%" }} />
                <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, mb: 0.5, width: "70%" }} />
                <Box sx={{ height: 5, bgcolor: "grey.200", borderRadius: 1, width: "60%" }} />
              </Box>
            )}
          </Box>
        </CardActionArea>

        <Box sx={{ p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body1" fontWeight={600} color="text.primary" noWrap>
                {resume.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                <Chip
                  label={resume.template}
                  size="small"
                  sx={{ fontWeight: 600, fontSize: "0.7rem", height: 22, textTransform: "capitalize" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {timeAgo(resume.updatedAt)}
                </Typography>
              </Stack>
            </Box>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAnchorEl(e.currentTarget); }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{ paper: { sx: { borderRadius: 2, minWidth: 160 } } }}
        >
          <MenuItem onClick={() => { setAnchorEl(null); onEdit(); }}>
            <EditIcon fontSize="small" sx={{ mr: 1.5 }} /> Edit
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { setAnchorEl(null); onDelete(); }} sx={{ color: "error.main" }}>
            <DeleteOutlineIcon fontSize="small" sx={{ mr: 1.5 }} /> Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}

function CreateNewCard({ onClick }: { onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        border: "2px dashed",
        borderColor: "grey.200",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": { borderColor: "primary.main", bgcolor: "#F0F6FF" },
      }}
    >
      <CardContent
        sx={{ height: "100%", minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5 }}
      >
        <Avatar sx={{ width: 56, height: 56, bgcolor: "#E3F2FD", color: "primary.main" }}>
          <AddIcon sx={{ fontSize: 28 }} />
        </Avatar>
        <Typography variant="body1" fontWeight={600} color="text.primary">Create New Resume</Typography>
        <Typography variant="body2" textAlign="center">Start from scratch or pick a template</Typography>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch("/api/resume").then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
      .then(([userData, resumeData]) => {
        setUser(userData.user);
        setResumes(resumeData.resumes || []);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/resume/${deleteId}`, { method: "DELETE" });
      if (res.ok) setResumes((prev) => prev.filter((r) => r.id !== deleteId));
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
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
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
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
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800}>
              My Resumes
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {resumes.length === 0 ? "Create your first resume to get started" : `${resumes.length} resume${resumes.length > 1 ? "s" : ""} created`}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/templates")}
          >
            New Resume
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CreateNewCard onClick={() => router.push("/templates")} />
          </Grid>
          {resumes.map((resume) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={resume.id}>
              <ResumeCard
                resume={resume}
                onEdit={() => router.push(`/builder/${resume.template}?id=${resume.id}`)}
                onDelete={() => setDeleteId(resume.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Resume</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this resume? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} disabled={deleting}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
