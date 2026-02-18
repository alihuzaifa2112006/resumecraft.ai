"use client";

import { useState } from "react";
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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ModernPreview() {
  return (
    <Box sx={{ display: "flex", gap: 0, height: 220, overflow: "hidden" }}>
      <Box
        sx={{
          width: 70,
          bgcolor: "#1A1A2E",
          borderRadius: "8px 0 0 8px",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "#E94560", mt: 1 }} />
        <Box sx={{ width: 36, height: 5, bgcolor: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
        <Box sx={{ width: 28, height: 4, bgcolor: "rgba(255,255,255,0.15)", borderRadius: 1 }} />
        <Box sx={{ width: 36, height: 1, bgcolor: "rgba(255,255,255,0.1)", my: 0.5 }} />
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{ width: 32, height: 4, bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1 }}
          />
        ))}
      </Box>
      <Box sx={{ flex: 1, bgcolor: "#FAFBFC", borderRadius: "0 8px 8px 0", p: 2 }}>
        <Box sx={{ height: 12, bgcolor: "#1A1A2E", borderRadius: 1, width: "55%", mb: 0.5 }} />
        <Box sx={{ height: 7, bgcolor: "grey.300", borderRadius: 1, width: "35%", mb: 2 }} />
        <Box sx={{ height: 2, bgcolor: "#E94560", width: "100%", mb: 2, borderRadius: 1 }} />
        {[1, 2].map((section) => (
          <Box key={section} sx={{ mb: 1.5 }}>
            <Box sx={{ height: 7, bgcolor: "#1A1A2E", borderRadius: 1, width: "30%", mb: 0.8, opacity: 0.7 }} />
            {[1, 2, 3].map((line) => (
              <Box
                key={line}
                sx={{
                  height: 5,
                  bgcolor: "grey.200",
                  borderRadius: 1,
                  mb: 0.4,
                  width: `${95 - line * 12}%`,
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ClassicPreview() {
  return (
    <Box
      sx={{
        height: 220,
        bgcolor: "#FFFEF7",
        borderRadius: 2,
        p: 2.5,
        border: "1px solid #E8E4D9",
        overflow: "hidden",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 1.5 }}>
        <Box sx={{ height: 12, bgcolor: "#2C3E50", borderRadius: 1, width: "50%", mx: "auto", mb: 0.5 }} />
        <Box sx={{ height: 6, bgcolor: "#7F8C8D", borderRadius: 1, width: "30%", mx: "auto" }} />
      </Box>
      <Box sx={{ height: 1.5, bgcolor: "#2C3E50", width: "100%", mb: 1.5 }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1.5 }}>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ height: 5, bgcolor: "#BDC3C7", borderRadius: 1, width: 50 }} />
        ))}
      </Box>

      {["EXPERIENCE", "EDUCATION"].map((section) => (
        <Box key={section} sx={{ mb: 1.5 }}>
          <Box
            sx={{
              height: 7,
              bgcolor: "#2C3E50",
              borderRadius: 0,
              width: "25%",
              mb: 0.4,
              opacity: 0.85,
            }}
          />
          <Box sx={{ height: 0.5, bgcolor: "#BDC3C7", width: "100%", mb: 0.8 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.4 }}>
            <Box sx={{ height: 5, bgcolor: "grey.400", borderRadius: 1, width: "40%" }} />
            <Box sx={{ height: 5, bgcolor: "grey.300", borderRadius: 1, width: "20%" }} />
          </Box>
          {[1, 2].map((line) => (
            <Box
              key={line}
              sx={{
                height: 4,
                bgcolor: "grey.200",
                borderRadius: 1,
                mb: 0.3,
                width: `${90 - line * 8}%`,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

function CreativePreview() {
  return (
    <Box sx={{ height: 220, borderRadius: 2, overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          height: 60,
          background: "linear-gradient(135deg, #6C63FF 0%, #48C6EF 100%)",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          px: 2,
          pb: 1,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: "white",
            border: "3px solid white",
            position: "absolute",
            bottom: -18,
            left: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        />
        <Box sx={{ ml: 8, mb: -0.5 }}>
          <Box sx={{ height: 9, bgcolor: "rgba(255,255,255,0.95)", borderRadius: 1, width: 90, mb: 0.4 }} />
          <Box sx={{ height: 5, bgcolor: "rgba(255,255,255,0.6)", borderRadius: 1, width: 60 }} />
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#F7F7FF", p: 2, pt: 3.5, height: 160 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {["#6C63FF", "#48C6EF", "#6C63FF", "#48C6EF", "#6C63FF"].map((color, i) => (
            <Box
              key={i}
              sx={{
                height: 16,
                bgcolor: color,
                borderRadius: 8,
                width: i % 2 === 0 ? 45 : 55,
                opacity: 0.18,
              }}
            />
          ))}
        </Box>
        <Grid container spacing={1.5}>
          <Grid size={6}>
            <Box sx={{ height: 6, bgcolor: "#6C63FF", borderRadius: 1, width: "60%", mb: 0.6, opacity: 0.6 }} />
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#6C63FF", opacity: 0.4 }} />
                <Box sx={{ height: 4, bgcolor: "grey.200", borderRadius: 1, flex: 1 }} />
              </Box>
            ))}
          </Grid>
          <Grid size={6}>
            <Box sx={{ height: 6, bgcolor: "#48C6EF", borderRadius: 1, width: "60%", mb: 0.6, opacity: 0.6 }} />
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ mb: 0.5 }}>
                <Box sx={{ height: 4, bgcolor: "grey.200", borderRadius: 1, width: `${100 - i * 15}%` }} />
                <Box
                  sx={{
                    height: 3,
                    bgcolor: "#48C6EF",
                    borderRadius: 1,
                    width: `${80 - i * 20}%`,
                    mt: 0.3,
                    opacity: 0.25,
                  }}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const templates = [
  { name: "Modern", key: "modern" },
  { name: "Classic", key: "classic" },
  { name: "Creative", key: "creative" },
] as const;

const previewMap: Record<string, React.ReactNode> = {
  modern: <ModernPreview />,
  classic: <ClassicPreview />,
  creative: <CreativePreview />,
};

function TemplatePreview() {
  const [active, setActive] = useState("modern");

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
        Choose your Template
      </Typography>
      <Stack direction="row" spacing={1} mb={2.5}>
        {templates.map((t) => (
          <Chip
            key={t.key}
            label={t.name}
            variant={active === t.key ? "filled" : "outlined"}
            color={active === t.key ? "primary" : "default"}
            size="small"
            onClick={() => setActive(t.key)}
            sx={{ fontWeight: 500, cursor: "pointer" }}
          />
        ))}
      </Stack>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "#F8FAFC",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.100",
          overflow: "hidden",
        }}
      >
        {previewMap[active]}
      </Paper>
    </Paper>
  );
}

export default function TemplateSection() {
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TemplatePreview />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2.5,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Start With Professional{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Resume Design Template
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Choose from our collection of professionally designed resume
              templates. Each template is crafted to be recruiter-friendly and
              visually appealing.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Customize colors, fonts, and layouts to match your personal brand
              while maintaining a professional look that recruiters love.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4 }}
              onClick={() => router.push("/templates")}
            >
              Browse Templates
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
