import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

function ResumePreviewCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        bgcolor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "primary.main",
            fontSize: "1.2rem",
            fontWeight: 700,
          }}
        >
          FC
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Franco Hokky
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full Stack Developer
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
        Professional Summary
      </Typography>
      <Box sx={{ mb: 2 }}>
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              height: 8,
              bgcolor: "grey.100",
              borderRadius: 1,
              mb: 0.5,
              width: i === 3 ? "60%" : "100%",
            }}
          />
        ))}
      </Box>

      <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
        Experience
      </Typography>
      <Box sx={{ mb: 2 }}>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Box
              sx={{
                height: 8,
                bgcolor: "grey.100",
                borderRadius: 1,
                mb: 0.5,
                width: "80%",
              }}
            />
            <Box
              sx={{
                height: 6,
                bgcolor: "grey.50",
                borderRadius: 1,
                width: "65%",
              }}
            />
          </Box>
        ))}
      </Box>

      <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>
        Skills
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.5}>
        {["React", "Node.js", "TypeScript", "AWS"].map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            sx={{ bgcolor: "primary.main", color: "white", fontSize: "0.7rem" }}
          />
        ))}
      </Stack>

      <Paper
        elevation={8}
        sx={{
          position: "absolute",
          top: 12,
          right: -10,
          p: 1.5,
          px: 2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <StarIcon sx={{ color: "#FFC107", fontSize: 18 }} />
        <Typography variant="body2" fontWeight={700} color="text.primary">
          8.5/10
        </Typography>
      </Paper>
    </Paper>
  );
}

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)",
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="AI-Powered Resume Builder"
              sx={{
                bgcolor: "#E3F2FD",
                color: "primary.main",
                fontWeight: 600,
                mb: 3,
                fontSize: "0.8rem",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: "text.primary",
                mb: 2.5,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
              }}
            >
              AI-Resume Analysis{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                for Your Career
              </Box>{" "}
              Development
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 480 }}>
              Create professional resumes, get AI-powered scoring, and land your
              dream job. ResumeCraft helps you stand out.
            </Typography>
            <Stack direction="row" spacing={2} mb={3}>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large">
                  Get Started
                </Button>
              </Link>
            </Stack>
            <Stack direction="row" spacing={3}>
              {["AI Scoring", "Smart Builder", "Free Templates"].map((item) => (
                <Stack key={item} direction="row" spacing={0.5} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <ResumePreviewCard />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
