import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const features = [
  {
    icon: <DescriptionIcon sx={{ fontSize: 32 }} />,
    title: "Build Professional, Keyword-Rich Resumes",
    description:
      "Our AI analyzes job descriptions and optimizes your resume with the right keywords to impress recruiters.",
    color: "#E3F2FD",
    iconColor: "#1565C0",
    preview: "resume",
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 32 }} />,
    title: "Get Your Resume Scored by Our AI-Powered Tool",
    description:
      "Receive instant feedback with detailed scoring across multiple criteria. Know exactly where to improve.",
    color: "#FFF3E0",
    iconColor: "#E65100",
    preview: "score",
  },
  {
    icon: <RecordVoiceOverIcon sx={{ fontSize: 32 }} />,
    title: "Interview Prep: Relevant Interview Questions & Answers",
    description:
      "Get AI-generated interview questions based on your resume and target role. Practice with confidence.",
    color: "#E8F5E9",
    iconColor: "#2E7D32",
    preview: "interview",
  },
];

function FeaturePreview({ type }: { type: string }) {
  if (type === "score") {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#FAFAFA",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 1.5 }}>
          <Avatar sx={{ bgcolor: "#1565C0", width: 36, height: 36, fontSize: "0.8rem" }}>
            AH
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" fontSize="0.8rem">
              Alexander Hill
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Software Engineer
            </Typography>
          </Box>
        </Box>
        {["Layout", "Content", "Keywords"].map((item, i) => (
          <Box key={item} sx={{ mb: 0.8 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
              <Typography variant="caption" color="text.secondary">
                {item}
              </Typography>
              <Typography variant="caption" fontWeight={600} color="text.primary">
                {[92, 87, 78][i]}%
              </Typography>
            </Box>
            <Box
              sx={{
                height: 5,
                bgcolor: "grey.200",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${[92, 87, 78][i]}%`,
                  bgcolor: "primary.main",
                  borderRadius: 3,
                }}
              />
            </Box>
          </Box>
        ))}
      </Paper>
    );
  }

  if (type === "interview") {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "#FAFAFA",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Typography variant="caption" fontWeight={600} color="text.primary" mb={1} display="block">
          AI Interview Questions
        </Typography>
        {["Tell me about yourself", "Why this role?", "Biggest challenge?"].map((q, i) => (
          <Box
            key={q}
            sx={{
              p: 1,
              mb: 0.5,
              bgcolor: i === 0 ? "#E3F2FD" : "white",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.100",
            }}
          >
            <Typography variant="caption" color="text.primary">
              {q}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "#FAFAFA",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Stack direction="row" spacing={0.5} mb={1}>
        {["Modern", "Minimal", "Clean"].map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={{ fontSize: "0.65rem", height: 22 }} />
        ))}
      </Stack>
      {[1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          sx={{
            height: 6,
            bgcolor: "grey.200",
            borderRadius: 1,
            mb: 0.5,
            width: i === 4 ? "45%" : `${100 - i * 10}%`,
          }}
        />
      ))}
    </Paper>
  );
}

export default function FeaturesSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#F8FAFC" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Why Choose ResumeCraft
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto" }}>
            Everything you need to craft the perfect resume, ace interviews, and
            land your dream job — all powered by AI.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.100",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <FeaturePreview type={feature.preview} />
                  <Box sx={{ mt: 2.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: feature.color,
                        color: feature.iconColor,
                        width: 48,
                        height: 48,
                        mb: 1.5,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" color="text.primary" mb={1}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">{feature.description}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
