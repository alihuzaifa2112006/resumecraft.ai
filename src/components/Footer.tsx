import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const footerLinks = {
  Product: ["Resume Builder", "AI Scoring", "Templates", "Cover Letters"],
  Resources: ["Blog", "Career Guide", "Resume Examples", "FAQ"],
  Company: ["About Us", "Careers", "Contact", "Privacy Policy"],
};

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0D1B2A", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} mb={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Image src="/logo.png" alt="ResumeCraft" width={32} height={32} />
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                ResumeCraft
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 2.5, maxWidth: 280 }}>
              AI-powered resume builder that helps you create professional,
              professional resumes and land your dream job.
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {[LinkedInIcon, TwitterIcon, GitHubIcon, EmailIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    "&:hover": { color: "#64B5F6" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs: 6, md: 2 }} key={category} offset={{ md: category === "Product" ? 1 : 0 }}>
              <Typography
                variant="body2"
                sx={{ color: "white", fontWeight: 700, mb: 2, fontSize: "0.85rem" }}
              >
                {category}
              </Typography>
              <Stack spacing={1.2}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.85rem",
                      transition: "color 0.2s",
                      "&:hover": { color: "#64B5F6" },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box
          sx={{
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 ResumeCraft. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            {["Terms of Service", "Privacy Policy", "Cookies"].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.75rem",
                  "&:hover": { color: "rgba(255,255,255,0.6)" },
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
