"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

function AIPreview() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="body2" fontWeight={600} color="text.primary" mb={2}>
        Add your Skills
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={0.8} mb={2.5}>
        {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            sx={{
              bgcolor: "#E3F2FD",
              color: "primary.main",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          />
        ))}
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#F0FFF4",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "#C8E6C9",
          mb: 1.5,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CheckCircleOutlineIcon sx={{ color: "#4CAF50", fontSize: 18 }} />
          <Typography variant="caption" color="#2E7D32" fontWeight={500}>
            Great! Your skills match 85% of job requirements
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#FFF8E1",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "#FFE082",
          mb: 1.5,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <ErrorOutlineIcon sx={{ color: "#F57C00", fontSize: 18 }} />
          <Typography variant="caption" color="#E65100" fontWeight={500}>
            Consider adding: Docker, Kubernetes, CI/CD
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#E3F2FD",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "#BBDEFB",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <TipsAndUpdatesIcon sx={{ color: "#1565C0", fontSize: 18 }} />
          <Typography variant="caption" color="#0D47A1" fontWeight={500}>
            AI Tip: Reorder skills by relevance to target role
          </Typography>
        </Stack>
      </Paper>
    </Paper>
  );
}

export default function AIBuilderSection() {
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#F8FAFC" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2.5,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Using an{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                AI-Powered
              </Box>{" "}
              Resume Builder
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Our AI assistant guides you through every step of building your
              resume. Get real-time suggestions, content improvements, and
              keyword optimization as you type.
            </Typography>

            <Stack spacing={2} mb={4}>
              {[
                "AI-powered content suggestions for each section",
                "Real-time resume quality checking",
                "Smart keyword optimization based on job descriptions",
                "Grammar and tone improvements automatically",
              ].map((item) => (
                <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleOutlineIcon
                    sx={{ color: "primary.main", fontSize: 20, mt: 0.2 }}
                  />
                  <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4 }}
              onClick={() => router.push("/builder/modern")}
            >
              Start Building
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AIPreview />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
