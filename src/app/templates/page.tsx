"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const TEMPLATES = [
  { id: "modern", title: "Modern", description: "Clean, recruiter-friendly layout." },
  { id: "classic", title: "Classic", description: "Traditional two-column CV." },
  { id: "creative", title: "Creative", description: "Visual layout for designers." },
];

// Template Preview Components
function ModernPreview() {
  return (
    <Box sx={{ height: 280, p: 3, bgcolor: "white", display: "flex", flexDirection: "column" }}>
      {/* Header with photo */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ width: 50, height: 50, bgcolor: "#2563EB", borderRadius: 1, flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 10, bgcolor: "#E5E7EB", width: "70%", mb: 0.8, borderRadius: 1 }} />
          <Box sx={{ height: 7, bgcolor: "#F3F4F6", width: "50%", borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Blue accent line with content */}
      <Box sx={{ borderLeft: "4px solid #2563EB", pl: 2, mb: 2 }}>
        <Box sx={{ height: 7, bgcolor: "#E5E7EB", width: "85%", mb: 1, borderRadius: 1 }} />
        <Box sx={{ height: 6, bgcolor: "#F3F4F6", width: "75%", mb: 1, borderRadius: 1 }} />
        <Box sx={{ height: 6, bgcolor: "#F3F4F6", width: "65%", borderRadius: 1 }} />
      </Box>

      {/* Additional sections */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "60%", mb: 0.5, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "80%", borderRadius: 1 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "50%", mb: 0.5, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "70%", borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}

function ClassicPreview() {
  return (
    <Box sx={{ height: 280, p: 3, bgcolor: "white", display: "flex", flexDirection: "column" }}>
      {/* Header with photo */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ width: 50, height: 50, bgcolor: "#2563EB", borderRadius: 1, flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 10, bgcolor: "#E5E7EB", width: "70%", mb: 0.8, borderRadius: 1 }} />
          <Box sx={{ height: 7, bgcolor: "#F3F4F6", width: "50%", borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Two column layout indicator */}
      <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
        {/* Left column - main content */}
        <Box sx={{ flex: 2 }}>
          <Box sx={{ borderLeft: "4px solid #2563EB", pl: 2, mb: 2 }}>
            <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "80%", mb: 1, borderRadius: 1 }} />
            <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "90%", borderRadius: 1 }} />
          </Box>
          <Box sx={{ borderLeft: "4px solid #2563EB", pl: 2 }}>
            <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "70%", mb: 1, borderRadius: 1 }} />
            <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "85%", borderRadius: 1 }} />
          </Box>
        </Box>
        
        {/* Right column - sidebar */}
        <Box sx={{ flex: 1, bgcolor: "#F9FAFB", p: 1.5, borderRadius: 1 }}>
          <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "70%", mb: 1, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#FFFFFF", width: "80%", mb: 0.8, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#FFFFFF", width: "75%", borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}

function CreativePreview() {
  return (
    <Box sx={{ height: 280, p: 3, bgcolor: "white", display: "flex", flexDirection: "column" }}>
      {/* Colorful header */}
      <Box sx={{ 
        background: "linear-gradient(135deg, #2563EB 0%, #1e40af 100%)", 
        p: 2, 
        borderRadius: 1, 
        mb: 2,
        display: "flex",
        gap: 2
      }}>
        <Box sx={{ width: 50, height: 50, bgcolor: "#F3F4F6", borderRadius: 1, flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 8, bgcolor: "#E5E7EB", width: "60%", mb: 0.6, borderRadius: 1 }} />
          <Box sx={{ height: 6, bgcolor: "#F3F4F6", width: "40%", borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Visual content sections */}
      <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
        <Box sx={{ width: 12, height: 12, bgcolor: "#2563EB", borderRadius: "50%", flexShrink: 0, mt: 0.3 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "80%", mb: 0.5, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "90%", borderRadius: 1 }} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ width: 12, height: 12, bgcolor: "#2563EB", borderRadius: "50%", flexShrink: 0, mt: 0.3 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 6, bgcolor: "#E5E7EB", width: "75%", mb: 0.5, borderRadius: 1 }} />
          <Box sx={{ height: 5, bgcolor: "#F3F4F6", width: "85%", borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function handleChoose(id: string) {
    setSelected(id);
    setOpen(true);
  }

  function handlePreview() {
    if (!selected) return;
    setOpen(false);
    router.push(`/templates/${selected}`);
  }

  function handleUse() {
    if (!selected) return;
    setOpen(false);
    router.push(`/builder/${selected}`);
  }

  function getTemplatePreview(id: string) {
    switch (id) {
      case "modern":
        return <ModernPreview />;
      case "classic":
        return <ClassicPreview />;
      case "creative":
        return <CreativePreview />;
      default:
        return <ModernPreview />;
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={2}>
          Browse Templates
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Pick a template to preview or start building your AI-powered resume.
        </Typography>

        <Grid container spacing={3}>
          {TEMPLATES.map((t) => (
            <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: "1px solid", 
                  borderColor: "grey.100",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)"
                  }
                }}
              >
                <CardActionArea onClick={() => handleChoose(t.id)}>
                  {getTemplatePreview(t.id)}
                  <CardContent sx={{ p: 2, borderTop: "1px solid", borderColor: "grey.100" }}>
                    <Typography variant="h6" fontWeight={700} mb={0.5}>
                      {t.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Template</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" fontWeight={700}>
              {selected ? TEMPLATES.find((x) => x.id === selected)?.title : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Would you like to preview this template or start building with it?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handlePreview}>Preview</Button>
            <Button variant="contained" onClick={handleUse}>
              Use Template
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
