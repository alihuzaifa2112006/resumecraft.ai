"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  CircularProgress,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setUser(data.user);
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/auth/upload-pic", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setUser((prev) => prev ? { ...prev, profilePic: data.user.profilePic } : prev);
      setSuccess("Profile picture updated!");
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemovePic = async () => {
    setError("");
    setUploading(true);

    try {
      const res = await fetch("/api/auth/upload-pic", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }

      setUser((prev) => prev ? { ...prev, profilePic: null } : prev);
      setSuccess("Profile picture removed!");
    } catch {
      setError("Failed to remove image");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setSuccess("Password changed successfully!");
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
        <Skeleton variant="rectangular" height={64} />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3, mb: 3 }} />
          <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3 }} />
        </Container>
      </Box>
    );
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "white", borderBottom: "1px solid", borderColor: "grey.100" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <IconButton onClick={() => router.push("/dashboard")} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box
              onClick={() => router.push("/")}
              sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
            >
              <Image src="/logo.png" alt="ResumeCraft" width={28} height={28} />
              <Typography variant="h6" fontWeight={800} color="primary.main" sx={{ letterSpacing: "-0.5px" }}>
                ResumeCraft
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
              Profile Settings
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={user.profilePic || undefined}
              sx={{
                width: 96,
                height: 96,
                bgcolor: "primary.main",
                fontSize: "2rem",
                fontWeight: 700,
                border: "3px solid",
                borderColor: "grey.200",
              }}
            >
              {!user.profilePic && initials}
            </Avatar>
            <IconButton
              component="label"
              disabled={uploading}
              sx={{
                position: "absolute",
                bottom: -2,
                right: -2,
                bgcolor: "primary.main",
                color: "white",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "primary.dark" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {uploading ? <CircularProgress size={16} color="inherit" /> : <CameraAltIcon sx={{ fontSize: 16 }} />}
              <input type="file" hidden accept="image/*" onChange={handleUploadPic} />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
              <Typography variant="caption" color="text.secondary">
                Member since {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Typography>
              {user.profilePic && (
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                  onClick={handleRemovePic}
                  disabled={uploading}
                  sx={{ fontSize: "0.7rem", py: 0, minHeight: 0 }}
                >
                  Remove Photo
                </Button>
              )}
            </Stack>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Personal Info */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "grey.100",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
            <PersonIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Personal Information
            </Typography>
          </Stack>

          <form onSubmit={handleUpdateProfile}>
            <Stack spacing={2.5}>
              <TextField
                label="Full Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving || (name === user.name && email === user.email)}
                  startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                  sx={{ px: 4 }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>

        {/* Change Password */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "grey.100",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
            <LockResetIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Change Password
            </Typography>
          </Stack>

          <form onSubmit={handleChangePassword}>
            <Stack spacing={2.5}>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <Divider />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="new-password"
                helperText="Minimum 6 characters"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving || !currentPassword || !newPassword || !confirmNewPassword}
                  startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <LockResetIcon />}
                  sx={{ px: 4 }}
                >
                  {saving ? "Updating..." : "Update Password"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccess("")} sx={{ borderRadius: 2 }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
