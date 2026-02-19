"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
  Avatar,
  Paper,
  Chip,
  Grid,
  Stepper,
  Step,
  StepButton,
  CircularProgress,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ViewListIcon from "@mui/icons-material/ViewList";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// ─── Constants ────────────────────────────────────────

const ACCENT_COLORS = [
  "#1565C0", "#E94560", "#2E7D32", "#6C63FF", "#E65100",
  "#00838F", "#AD1457", "#4527A0", "#1A1A2E", "#37474F",
];

const TEXT_COLORS = [
  "#000000", "#1A1A1A", "#2C2C2C", "#333333", "#444444",
  "#555555", "#1B2631", "#2C3E50", "#34495E", "#4A235A",
  "#154360", "#0B5345", "#7B241C", "#784212", "#1C2833",
];

const FONTS = [
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Playfair", value: "Playfair Display, serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
];

const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "summary", "experience", "education", "certifications", "skills",
];

const SECTION_LABELS: Record<SectionKey, string> = {
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  certifications: "Certifications",
  skills: "Skills",
};

const STEPS = [
  { label: "Colors", icon: <PaletteIcon /> },
  { label: "Fonts", icon: <TextFieldsIcon /> },
  { label: "About", icon: <PersonIcon /> },
  { label: "Photo", icon: <PhotoCameraIcon /> },
  { label: "Experience", icon: <WorkIcon /> },
  { label: "Education", icon: <SchoolIcon /> },
  { label: "Certifications", icon: <CardMembershipIcon /> },
  { label: "Skills", icon: <BuildIcon /> },
  { label: "Layout", icon: <ViewListIcon /> },
];

// ─── Types ────────────────────────────────────────────

type SectionKey = "summary" | "experience" | "education" | "certifications" | "skills";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  year: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface ResumeData {
  color: string;
  textColor: string;
  font: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photo: string | null;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  sectionOrder: SectionKey[];
}

type OnChange = (d: Partial<ResumeData>) => void;

function hasContent(exp: Experience) {
  return exp.company || exp.position || exp.description;
}

function hasEduContent(edu: Education) {
  return edu.school || edu.degree;
}

function hasCertContent(cert: Certification) {
  return cert.name || cert.issuer;
}

// ─── Step Components ──────────────────────────────────

function ColorStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Choose your accent color
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        This color will be used for headings, accents, and highlights in your resume.
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4 }}>
        {ACCENT_COLORS.map((c) => (
          <Box
            key={c}
            onClick={() => onChange({ color: c })}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: c,
              cursor: "pointer",
              border: data.color === c ? "3px solid" : "3px solid transparent",
              borderColor: data.color === c ? "grey.800" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            {data.color === c && <CheckCircleIcon sx={{ color: "white", fontSize: 22 }} />}
          </Box>
        ))}
      </Box>

      <Typography variant="h5" fontWeight={700} mb={1}>
        Choose your text color
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        This color will be used for body text, descriptions, and secondary content.
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
        {TEXT_COLORS.map((c) => (
          <Box
            key={c}
            onClick={() => onChange({ textColor: c })}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: c,
              cursor: "pointer",
              border: data.textColor === c ? "3px solid" : "3px solid transparent",
              borderColor: data.textColor === c ? "warning.main" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            {data.textColor === c && <CheckCircleIcon sx={{ color: "white", fontSize: 22 }} />}
          </Box>
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary" mb={1}>
        Or pick a custom text color:
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="input"
          type="color"
          value={data.textColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ textColor: e.target.value })}
          sx={{
            width: 56,
            height: 56,
            border: "2px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            cursor: "pointer",
            p: 0.5,
            bgcolor: "transparent",
          }}
        />
        <Box>
          <Typography variant="body2" fontWeight={600}>{data.textColor}</Typography>
          <Typography variant="caption" color="text.secondary">Current text color</Typography>
        </Box>
      </Stack>

      {/* Preview */}
      <Paper elevation={0} sx={{ mt: 3, p: 2, border: "1px solid", borderColor: "grey.200", borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={600} mb={1}>Preview</Typography>
        <Typography sx={{ color: data.color, fontWeight: 700, fontSize: "1rem", mb: 0.5 }}>
          Section Heading (Accent)
        </Typography>
        <Typography sx={{ color: data.textColor, fontSize: "0.85rem" }}>
          This is how your body text will look with the selected text color. Make sure it has enough contrast for readability.
        </Typography>
      </Paper>
    </Box>
  );
}

function FontStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Pick a font style
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Choose a font that reflects your personality and profession.
      </Typography>
      <Stack spacing={1.5}>
        {FONTS.map((f) => {
          const selected = data.font === f.value;
          return (
            <Paper
              key={f.name}
              onClick={() => onChange({ font: f.value })}
              elevation={0}
              sx={{
                p: 2,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? "primary.main" : "grey.200",
                borderRadius: 2,
                bgcolor: selected ? "primary.main" : "transparent",
                transition: "all 0.15s",
                "&:hover": { borderColor: selected ? "primary.main" : "grey.400" },
              }}
            >
              <Typography sx={{ fontFamily: f.value, fontSize: "1.1rem", fontWeight: 600, color: selected ? "white" : "text.primary" }}>
                {f.name}
              </Typography>
              <Typography sx={{ fontFamily: f.value, fontSize: "0.85rem", color: selected ? "rgba(255,255,255,0.8)" : "text.secondary" }}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}

function AboutStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Tell us about yourself. This will appear at the top of your resume.
      </Typography>
      <Stack spacing={2.5}>
        <TextField label="Full Name" fullWidth value={data.name} onChange={(e) => onChange({ name: e.target.value })} />
        <TextField label="Job Title" fullWidth value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Email" fullWidth value={data.email} onChange={(e) => onChange({ email: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Phone" fullWidth value={data.phone} onChange={(e) => onChange({ phone: e.target.value })} />
          </Grid>
        </Grid>
        <TextField label="Location / Address" fullWidth value={data.location} onChange={(e) => onChange({ location: e.target.value })} />
        <TextField label="Professional Summary" fullWidth multiline rows={4} value={data.summary} onChange={(e) => onChange({ summary: e.target.value })} />
      </Stack>
    </Box>
  );
}

function PhotoStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  const fileRef = useRef<HTMLInputElement>(null);
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ photo: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Profile Photo
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload a professional photo. This is optional but recommended.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Avatar src={data.photo || undefined} sx={{ width: 140, height: 140, bgcolor: "grey.200" }}>
          {!data.photo && <PhotoCameraIcon sx={{ fontSize: 48, color: "grey.400" }} />}
        </Avatar>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => fileRef.current?.click()}>
            {data.photo ? "Change Photo" : "Upload Photo"}
          </Button>
          {data.photo && (
            <Button variant="outlined" color="error" onClick={() => onChange({ photo: null })}>
              Remove
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function ExperienceStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  function update(index: number, field: keyof Experience, value: string) {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ experience: updated });
  }
  function add() {
    onChange({ experience: [...data.experience, { company: "", position: "", startDate: "", endDate: "", description: "" }] });
  }
  function remove(index: number) {
    onChange({ experience: data.experience.filter((_, i) => i !== index) });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>Work Experience</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Add your relevant work experience, starting with the most recent.</Typography>
      <Stack spacing={3}>
        {data.experience.map((exp, i) => (
          <Paper key={i} elevation={0} sx={{ p: 2.5, border: "1px solid", borderColor: "grey.200", borderRadius: 2, position: "relative" }}>
            <IconButton size="small" onClick={() => remove(i)} sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Stack spacing={2}>
              <TextField label="Company" fullWidth size="small" value={exp.company} onChange={(e) => update(i, "company", e.target.value)} />
              <TextField label="Position" fullWidth size="small" value={exp.position} onChange={(e) => update(i, "position", e.target.value)} />
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField label="Start Date" fullWidth size="small" placeholder="e.g. Jan 2022" value={exp.startDate} onChange={(e) => update(i, "startDate", e.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField label="End Date" fullWidth size="small" placeholder="e.g. Present" value={exp.endDate} onChange={(e) => update(i, "endDate", e.target.value)} />
                </Grid>
              </Grid>
              <TextField label="Description" fullWidth size="small" multiline rows={3} value={exp.description} onChange={(e) => update(i, "description", e.target.value)} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={add} sx={{ mt: 2 }}>Add Experience</Button>
    </Box>
  );
}

function EducationStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  function update(index: number, field: keyof Education, value: string) {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ education: updated });
  }
  function add() {
    onChange({ education: [...data.education, { school: "", degree: "", year: "" }] });
  }
  function remove(index: number) {
    onChange({ education: data.education.filter((_, i) => i !== index) });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>Education</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Add your educational background.</Typography>
      <Stack spacing={3}>
        {data.education.map((edu, i) => (
          <Paper key={i} elevation={0} sx={{ p: 2.5, border: "1px solid", borderColor: "grey.200", borderRadius: 2, position: "relative" }}>
            <IconButton size="small" onClick={() => remove(i)} sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Stack spacing={2}>
              <TextField label="School / University" fullWidth size="small" value={edu.school} onChange={(e) => update(i, "school", e.target.value)} />
              <TextField label="Degree" fullWidth size="small" value={edu.degree} onChange={(e) => update(i, "degree", e.target.value)} />
              <TextField label="Year" fullWidth size="small" placeholder="e.g. 2018 – 2022" value={edu.year} onChange={(e) => update(i, "year", e.target.value)} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={add} sx={{ mt: 2 }}>Add Education</Button>
    </Box>
  );
}

function CertificationsStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  function update(index: number, field: keyof Certification, value: string) {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ certifications: updated });
  }
  function add() {
    onChange({ certifications: [...data.certifications, { name: "", issuer: "", year: "" }] });
  }
  function remove(index: number) {
    onChange({ certifications: data.certifications.filter((_, i) => i !== index) });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>Certifications</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Add any certifications or licenses you hold.</Typography>
      <Stack spacing={3}>
        {data.certifications.map((cert, i) => (
          <Paper key={i} elevation={0} sx={{ p: 2.5, border: "1px solid", borderColor: "grey.200", borderRadius: 2, position: "relative" }}>
            <IconButton size="small" onClick={() => remove(i)} sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Stack spacing={2}>
              <TextField label="Certification Name" fullWidth size="small" value={cert.name} onChange={(e) => update(i, "name", e.target.value)} />
              <TextField label="Issuing Organization" fullWidth size="small" value={cert.issuer} onChange={(e) => update(i, "issuer", e.target.value)} />
              <TextField label="Year" fullWidth size="small" placeholder="e.g. 2023" value={cert.year} onChange={(e) => update(i, "year", e.target.value)} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={add} sx={{ mt: 2 }}>Add Certification</Button>
    </Box>
  );
}

function SkillsStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  const [input, setInput] = useState("");
  function add() {
    const trimmed = input.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    onChange({ skills: [...data.skills, trimmed] });
    setInput("");
  }
  function remove(skill: string) {
    onChange({ skills: data.skills.filter((s) => s !== skill) });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>Skills</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Add your key skills. Press Enter or click Add.</Typography>
      <Stack direction="row" spacing={1} mb={2}>
        <TextField label="Add a skill" size="small" fullWidth value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
        <Button variant="contained" onClick={add} sx={{ minWidth: 80 }}>Add</Button>
      </Stack>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {data.skills.map((skill) => (
          <Chip key={skill} label={skill} onDelete={() => remove(skill)} sx={{ bgcolor: "primary.main", color: "white", fontWeight: 500, "& .MuiChip-deleteIcon": { color: "rgba(255,255,255,0.7)" } }} />
        ))}
      </Box>
      {data.skills.length === 0 && (
        <Typography variant="body2" color="text.secondary" mt={2}>No skills added yet.</Typography>
      )}
    </Box>
  );
}

// ─── Drag & Drop Layout Step ──────────────────────────

function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={isDragging ? 8 : 0}
      sx={{
        p: 2,
        px: 2.5,
        border: "1px solid",
        borderColor: isDragging ? "primary.main" : "grey.200",
        borderRadius: 2,
        bgcolor: isDragging ? "primary.50" : "white",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: "grab",
        userSelect: "none",
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": { borderColor: "primary.light", bgcolor: "grey.50" },
        "&:active": { cursor: "grabbing" },
      }}
      {...attributes}
      {...listeners}
    >
      <DragIndicatorIcon sx={{ color: isDragging ? "primary.main" : "grey.400", fontSize: 22 }} />
      <Typography fontWeight={600} sx={{ flex: 1 }}>{label}</Typography>
      <Typography variant="caption" color="text.secondary">Drag to reorder</Typography>
    </Paper>
  );
}

function LayoutStep({ data, onChange }: { data: ResumeData; onChange: OnChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.sectionOrder.indexOf(active.id as SectionKey);
    const newIndex = data.sectionOrder.indexOf(over.id as SectionKey);
    onChange({ sectionOrder: arrayMove(data.sectionOrder, oldIndex, newIndex) });
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Arrange Sections
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Drag and drop to reorder the sections in your resume. The order here will be reflected in your CV preview and final PDF.
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
          <Stack spacing={1.5}>
            {data.sectionOrder.map((key) => (
              <SortableItem key={key} id={key} label={SECTION_LABELS[key]} />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

      <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: "#F0F6FF", borderRadius: 2, border: "1px solid", borderColor: "primary.100" }}>
        <Typography variant="body2" color="primary.dark" fontWeight={600} mb={0.5}>
          Current order:
        </Typography>
        {data.sectionOrder.map((key, i) => (
          <Typography key={key} variant="body2" color="text.secondary">
            {i + 1}. {SECTION_LABELS[key]}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}

// ─── CV Preview Templates ─────────────────────────────

function PlaceholderContent({ color, accentColor, font }: { color: string; accentColor: string; font: string }) {
  return (
    <Box sx={{ opacity: 0.5 }}>
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: font, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: accentColor, mb: 0.5 }}>
          Profile
        </Typography>
        <Typography sx={{ fontFamily: font, fontSize: 8.5, color, lineHeight: 1.6 }}>
          Passionate professional with extensive experience in the industry. Add your summary to replace this placeholder text and showcase your unique value proposition.
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: font, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: accentColor, mb: 0.8 }}>
          Experience
        </Typography>
        <Box sx={{ mb: 1.5, borderLeft: `2px solid ${accentColor}`, pl: 1.2 }}>
          <Typography sx={{ fontFamily: font, fontSize: 10, fontWeight: 700, color }}>Senior Software Engineer</Typography>
          <Typography sx={{ fontFamily: font, fontSize: 8.5, color: accentColor, fontWeight: 600 }}>Tech Company Inc.</Typography>
          <Typography sx={{ fontFamily: font, fontSize: 7.5, color }}>Jan 2022 — Present</Typography>
          <Typography sx={{ fontFamily: font, fontSize: 8, color, mt: 0.3, lineHeight: 1.5 }}>
            Led development of key features and mentored junior developers. Add your experience to replace this preview.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontFamily: font, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: accentColor, mb: 0.5 }}>
          Skills
        </Typography>
        <Typography sx={{ fontFamily: font, fontSize: 8.5, color }}>
          React • TypeScript • Node.js • Python • AWS • Docker
        </Typography>
      </Box>
    </Box>
  );
}

function hasRealContent(data: ResumeData) {
  return (
    data.summary ||
    data.experience.some(hasContent) ||
    data.education.some(hasEduContent) ||
    data.certifications.some(hasCertContent) ||
    data.skills.length > 0
  );
}

function ModernCV({ data }: { data: ResumeData }) {
  const c = data.color;
  const tc = data.textColor;
  const f = data.font;
  const filledExp = data.experience.filter(hasContent);
  const filledEdu = data.education.filter(hasEduContent);
  const filledCert = data.certifications.filter(hasCertContent);
  const showPlaceholder = !hasRealContent(data);

  const sectionRenderers: Record<SectionKey, React.ReactNode> = {
    summary: data.summary ? (
      <Box key="summary" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: c, mb: 0.5 }}>
          Profile
        </Typography>
        <Typography sx={{ fontFamily: f, fontSize: 8.5, color: tc, lineHeight: 1.6 }}>{data.summary}</Typography>
      </Box>
    ) : null,
    experience: filledExp.length > 0 ? (
      <Box key="experience" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: c, mb: 0.8 }}>
          Experience
        </Typography>
        {filledExp.map((exp, i) => (
          <Box key={i} sx={{ mb: 1.5, borderLeft: `2px solid ${c}`, pl: 1.2 }}>
            <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: tc }}>{exp.position}</Typography>
            <Typography sx={{ fontFamily: f, fontSize: 8.5, color: c, fontWeight: 600 }}>{exp.company}</Typography>
            {(exp.startDate || exp.endDate) && (
              <Typography sx={{ fontFamily: f, fontSize: 7.5, color: tc }}>{exp.startDate} — {exp.endDate}</Typography>
            )}
            {exp.description && (
              <Typography sx={{ fontFamily: f, fontSize: 8, color: tc, mt: 0.3, lineHeight: 1.5 }}>{exp.description}</Typography>
            )}
          </Box>
        ))}
      </Box>
    ) : null,
    education: null,
    certifications: null,
    skills: null,
  };

  return (
    <Box sx={{ fontFamily: f, display: "flex", height: "100%", minHeight: 842 }}>
      {/* Sidebar */}
      <Box sx={{ width: 190, bgcolor: c, color: "white", p: 2.5, display: "flex", flexDirection: "column", gap: 1 }}>
        {data.photo && (
          <Avatar src={data.photo} sx={{ width: 80, height: 80, mx: "auto", mb: 1, border: "3px solid rgba(255,255,255,0.3)" }} />
        )}

        <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6, mt: 1 }}>
          Contact
        </Typography>
        {data.email && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <EmailIcon sx={{ fontSize: 10, opacity: 0.7 }} />
            <Typography sx={{ fontFamily: f, fontSize: 7.5, wordBreak: "break-all" }}>{data.email}</Typography>
          </Stack>
        )}
        {data.phone && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PhoneIcon sx={{ fontSize: 10, opacity: 0.7 }} />
            <Typography sx={{ fontFamily: f, fontSize: 7.5 }}>{data.phone}</Typography>
          </Stack>
        )}
        {data.location && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <LocationOnIcon sx={{ fontSize: 10, opacity: 0.7 }} />
            <Typography sx={{ fontFamily: f, fontSize: 7.5 }}>{data.location}</Typography>
          </Stack>
        )}

        {data.skills.length > 0 && (
          <>
            <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,0.15)", my: 1 }} />
            <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6 }}>
              Skills
            </Typography>
            {data.skills.map((s) => (
              <Typography key={s} sx={{ fontFamily: f, fontSize: 7.5, opacity: 0.9 }}>• {s}</Typography>
            ))}
          </>
        )}

        {filledEdu.length > 0 && (
          <>
            <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,0.15)", my: 1 }} />
            <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6 }}>
              Education
            </Typography>
            {filledEdu.map((edu, i) => (
              <Box key={i} sx={{ mb: 0.8 }}>
                <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 600 }}>{edu.degree}</Typography>
                <Typography sx={{ fontFamily: f, fontSize: 7.5, opacity: 0.8 }}>{edu.school}</Typography>
                {edu.year && <Typography sx={{ fontFamily: f, fontSize: 7, opacity: 0.6 }}>{edu.year}</Typography>}
              </Box>
            ))}
          </>
        )}

        {filledCert.length > 0 && (
          <>
            <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,0.15)", my: 1 }} />
            <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, opacity: 0.6 }}>
              Certifications
            </Typography>
            {filledCert.map((cert, i) => (
              <Box key={i} sx={{ mb: 0.8 }}>
                <Typography sx={{ fontFamily: f, fontSize: 8, fontWeight: 600 }}>{cert.name}</Typography>
                <Typography sx={{ fontFamily: f, fontSize: 7, opacity: 0.8 }}>{cert.issuer}</Typography>
                {cert.year && <Typography sx={{ fontFamily: f, fontSize: 7, opacity: 0.6 }}>{cert.year}</Typography>}
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography sx={{ fontFamily: f, fontSize: 22, fontWeight: 800, color: c }}>
          {data.name || "Your Name"}
        </Typography>
        <Typography sx={{ fontFamily: f, fontSize: 12, color: tc, mb: 1 }}>
          {data.title || "Job Title"}
        </Typography>
        <Box sx={{ height: 2.5, bgcolor: c, borderRadius: 2, mb: 2 }} />

        {showPlaceholder ? (
          <PlaceholderContent color={tc} accentColor={c} font={f} />
        ) : (
          data.sectionOrder
            .filter((key) => key === "summary" || key === "experience")
            .map((key) => sectionRenderers[key])
        )}
      </Box>
    </Box>
  );
}

function ClassicCV({ data }: { data: ResumeData }) {
  const c = data.color;
  const tc = data.textColor;
  const f = data.font;
  const filledExp = data.experience.filter(hasContent);
  const filledEdu = data.education.filter(hasEduContent);
  const filledCert = data.certifications.filter(hasCertContent);
  const hasContact = data.email || data.phone || data.location;

  const sectionRenderers: Record<SectionKey, React.ReactNode> = {
    summary: data.summary ? (
      <Box key="summary" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: c, mb: 0.3 }}>
          Professional Summary
        </Typography>
        <Box sx={{ height: 1, bgcolor: "grey.200", mb: 0.8 }} />
        <Typography sx={{ fontFamily: f, fontSize: 8.5, color: tc, lineHeight: 1.6 }}>{data.summary}</Typography>
      </Box>
    ) : null,
    experience: filledExp.length > 0 ? (
      <Box key="experience" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: c, mb: 0.3 }}>
          Experience
        </Typography>
        <Box sx={{ height: 1, bgcolor: "grey.200", mb: 0.8 }} />
        {filledExp.map((exp, i) => (
          <Box key={i} sx={{ mb: 1.2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: f, fontSize: 9.5, fontWeight: 700, color: tc }}>
                {exp.position}{exp.company ? ` — ${exp.company}` : ""}
              </Typography>
              {(exp.startDate || exp.endDate) && (
                <Typography sx={{ fontFamily: f, fontSize: 8, color: tc, flexShrink: 0, ml: 1 }}>
                  {exp.startDate} – {exp.endDate}
                </Typography>
              )}
            </Box>
            {exp.description && (
              <Typography sx={{ fontFamily: f, fontSize: 8, color: tc, mt: 0.3, lineHeight: 1.5 }}>{exp.description}</Typography>
            )}
          </Box>
        ))}
      </Box>
    ) : null,
    education: filledEdu.length > 0 ? (
      <Box key="education" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: c, mb: 0.3 }}>
          Education
        </Typography>
        <Box sx={{ height: 1, bgcolor: "grey.200", mb: 0.8 }} />
        {filledEdu.map((edu, i) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: tc }}>
              {edu.degree}{edu.school ? ` — ${edu.school}` : ""}
            </Typography>
            {edu.year && <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{edu.year}</Typography>}
          </Box>
        ))}
      </Box>
    ) : null,
    certifications: filledCert.length > 0 ? (
      <Box key="certifications" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: c, mb: 0.3 }}>
          Certifications
        </Typography>
        <Box sx={{ height: 1, bgcolor: "grey.200", mb: 0.8 }} />
        {filledCert.map((cert, i) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: tc }}>
              {cert.name}{cert.issuer ? ` — ${cert.issuer}` : ""}
            </Typography>
            {cert.year && <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{cert.year}</Typography>}
          </Box>
        ))}
      </Box>
    ) : null,
    skills: data.skills.length > 0 ? (
      <Box key="skills">
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: c, mb: 0.3 }}>
          Skills
        </Typography>
        <Box sx={{ height: 1, bgcolor: "grey.200", mb: 0.8 }} />
        <Typography sx={{ fontFamily: f, fontSize: 8.5, color: tc }}>
          {data.skills.join("  •  ")}
        </Typography>
      </Box>
    ) : null,
  };

  const showPlaceholder = !hasRealContent(data);

  return (
    <Box sx={{ fontFamily: f, p: 3.5, minHeight: 842 }}>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        {data.photo && (
          <Avatar src={data.photo} sx={{ width: 80, height: 80, mx: "auto", mb: 1, border: `3px solid ${c}` }} />
        )}
        <Typography sx={{ fontFamily: f, fontSize: 24, fontWeight: 800, color: c }}>
          {data.name || "Your Name"}
        </Typography>
        <Typography sx={{ fontFamily: f, fontSize: 12, color: tc }}>
          {data.title || "Job Title"}
        </Typography>
      </Box>

      {hasContact && (
        <Stack direction="row" spacing={2} justifyContent="center" mb={1} flexWrap="wrap">
          {data.email && <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{data.email}</Typography>}
          {data.phone && <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{data.phone}</Typography>}
          {data.location && <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{data.location}</Typography>}
        </Stack>
      )}

      <Box sx={{ height: 2, bgcolor: c, mb: 2 }} />

      {showPlaceholder ? (
        <PlaceholderContent color={tc} accentColor={c} font={f} />
      ) : (
        data.sectionOrder.map((key) => sectionRenderers[key])
      )}
    </Box>
  );
}

function CreativeCV({ data }: { data: ResumeData }) {
  const c = data.color;
  const tc = data.textColor;
  const f = data.font;
  const cLight = c + "18";
  const filledExp = data.experience.filter(hasContent);
  const filledEdu = data.education.filter(hasEduContent);
  const filledCert = data.certifications.filter(hasCertContent);
  const showPlaceholder = !hasRealContent(data);

  const sectionRenderers: Record<SectionKey, React.ReactNode> = {
    summary: data.summary ? (
      <Box key="summary" sx={{ mb: 2, p: 1.5, bgcolor: cLight, borderRadius: 2, borderLeft: `3px solid ${c}` }}>
        <Typography sx={{ fontFamily: f, fontSize: 8.5, color: tc, lineHeight: 1.6 }}>{data.summary}</Typography>
      </Box>
    ) : null,
    skills: data.skills.length > 0 ? (
      <Box key="skills" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: c, mb: 0.8 }}>Skills</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {data.skills.map((s) => (
            <Box key={s} sx={{ px: 1, py: 0.3, bgcolor: cLight, borderRadius: 4, fontSize: 8, fontWeight: 600, color: c }}>{s}</Box>
          ))}
        </Box>
      </Box>
    ) : null,
    experience: filledExp.length > 0 ? (
      <Box key="experience" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: c, mb: 0.8 }}>Experience</Typography>
        {filledExp.map((exp, i) => (
          <Box key={i} sx={{ mb: 1.5, position: "relative", pl: 1.5 }}>
            <Box sx={{ position: "absolute", left: 0, top: 4, width: 6, height: 6, borderRadius: "50%", bgcolor: c }} />
            <Typography sx={{ fontFamily: f, fontSize: 9.5, fontWeight: 700, color: tc }}>{exp.position}</Typography>
            <Typography sx={{ fontFamily: f, fontSize: 8.5, color: c, fontWeight: 600 }}>{exp.company}</Typography>
            {(exp.startDate || exp.endDate) && (
              <Typography sx={{ fontFamily: f, fontSize: 7, color: tc }}>{exp.startDate} — {exp.endDate}</Typography>
            )}
            {exp.description && (
              <Typography sx={{ fontFamily: f, fontSize: 7.5, color: tc, mt: 0.3, lineHeight: 1.5 }}>{exp.description}</Typography>
            )}
          </Box>
        ))}
      </Box>
    ) : null,
    education: filledEdu.length > 0 ? (
      <Box key="education" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: c, mb: 0.8 }}>Education</Typography>
        {filledEdu.map((edu, i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 700, color: tc }}>{edu.degree}</Typography>
            <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{edu.school}</Typography>
            {edu.year && <Typography sx={{ fontFamily: f, fontSize: 7.5, color: c }}>{edu.year}</Typography>}
          </Box>
        ))}
      </Box>
    ) : null,
    certifications: filledCert.length > 0 ? (
      <Box key="certifications" sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: f, fontSize: 10, fontWeight: 700, color: c, mb: 0.8 }}>Certifications</Typography>
        {filledCert.map((cert, i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Typography sx={{ fontFamily: f, fontSize: 9, fontWeight: 700, color: tc }}>{cert.name}</Typography>
            <Typography sx={{ fontFamily: f, fontSize: 8, color: tc }}>{cert.issuer}</Typography>
            {cert.year && <Typography sx={{ fontFamily: f, fontSize: 7.5, color: c }}>{cert.year}</Typography>}
          </Box>
        ))}
      </Box>
    ) : null,
  };

  return (
    <Box sx={{ fontFamily: f, minHeight: 842 }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${c} 0%, ${c}CC 100%)`,
          color: "white",
          p: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        {data.photo && (
          <Avatar src={data.photo} sx={{ width: 70, height: 70, border: "3px solid rgba(255,255,255,0.4)" }} />
        )}
        <Box>
          <Typography sx={{ fontFamily: f, fontSize: 22, fontWeight: 800 }}>
            {data.name || "Your Name"}
          </Typography>
          <Typography sx={{ fontFamily: f, fontSize: 12, opacity: 0.85 }}>
            {data.title || "Job Title"}
          </Typography>
          <Stack direction="row" spacing={1.5} mt={0.5} flexWrap="wrap">
            {data.email && <Typography sx={{ fontFamily: f, fontSize: 8, opacity: 0.7 }}>{data.email}</Typography>}
            {data.phone && <Typography sx={{ fontFamily: f, fontSize: 8, opacity: 0.7 }}>{data.phone}</Typography>}
            {data.location && <Typography sx={{ fontFamily: f, fontSize: 8, opacity: 0.7 }}>{data.location}</Typography>}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {showPlaceholder ? (
          <PlaceholderContent color={tc} accentColor={c} font={f} />
        ) : (
          data.sectionOrder.map((key) => sectionRenderers[key])
        )}
      </Box>
    </Box>
  );
}

const CV_TEMPLATES: Record<string, React.FC<{ data: ResumeData }>> = {
  modern: ModernCV,
  classic: ClassicCV,
  creative: CreativeCV,
};

// ─── Main Page ────────────────────────────────────────

export default function BuilderPage() {
  const { template } = useParams<{ template: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get("id");

  const [step, setStep] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(resumeId);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const cvRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<ResumeData>({
    color: "#1565C0",
    textColor: "#333333",
    font: "Roboto, sans-serif",
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    photo: null,
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    sectionOrder: [...DEFAULT_SECTION_ORDER],
  });

  useEffect(() => {
    if (!resumeId) return;
    fetch(`/api/resume/${resumeId}`)
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then(({ resume }) => {
        if (resume?.data) {
          const loaded = resume.data as Partial<ResumeData>;
          setData((prev) => ({
            ...prev,
            ...loaded,
            textColor: loaded.textColor || "#333333",
            sectionOrder: loaded.sectionOrder || [...DEFAULT_SECTION_ORDER],
          }));
        }
      })
      .catch(() => {});
  }, [resumeId]);

  function update(partial: Partial<ResumeData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  async function generateThumbnail(): Promise<string | null> {
    if (!cvRef.current) return null;
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 0.4, useCORS: true, backgroundColor: "#ffffff" });
      return canvas.toDataURL("image/jpeg", 0.6);
    } catch {
      return null;
    }
  }

  async function saveResume() {
    setSaving(true);
    try {
      const thumbnail = await generateThumbnail();
      const title = data.name ? `${data.name} — ${data.title || template}` : "Untitled Resume";
      const body = { template, title, data, thumbnail };

      let res: Response;
      if (savedId) {
        res = await fetch(`/api/resume/${savedId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } else {
        res = await fetch("/api/resume", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      }

      if (!res.ok) throw new Error();
      const json = await res.json();
      const newId = json.resume?.id;
      if (newId && !savedId) {
        setSavedId(newId);
        router.replace(`/builder/${template}?id=${newId}`);
      }
      setToast({ open: true, message: "Resume saved successfully!", severity: "success" });
    } catch {
      setToast({ open: true, message: "Failed to save. Please try again.", severity: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function downloadPDF() {
    if (!cvRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${data.name || "resume"}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  const CVTemplate = CV_TEMPLATES[template] || CV_TEMPLATES.modern;

  const stepContent = [
    <ColorStep key="color" data={data} onChange={update} />,
    <FontStep key="font" data={data} onChange={update} />,
    <AboutStep key="about" data={data} onChange={update} />,
    <PhotoStep key="photo" data={data} onChange={update} />,
    <ExperienceStep key="exp" data={data} onChange={update} />,
    <EducationStep key="edu" data={data} onChange={update} />,
    <CertificationsStep key="cert" data={data} onChange={update} />,
    <SkillsStep key="skills" data={data} onChange={update} />,
    <LayoutStep key="layout" data={data} onChange={update} />,
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F5F7FA" }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: { xs: "100%", md: 520 },
          minWidth: { md: 420 },
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          borderRight: "1px solid",
          borderColor: "grey.200",
          overflow: "hidden",
        }}
      >
        {/* Stepper header */}
        <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: "1px solid", borderColor: "grey.100" }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Resume Builder
          </Typography>
          <Stepper activeStep={step} alternativeLabel nonLinear>
            {STEPS.map((s, i) => (
              <Step key={s.label} completed={i < step}>
                <StepButton onClick={() => setStep(i)} icon={s.icon}>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      fontWeight: step === i ? 700 : 400,
                      color: step === i ? "primary.main" : "text.secondary",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {s.label}
                  </Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step content */}
        <Box sx={{ flex: 1, overflow: "auto", px: 3, py: 3 }}>
          {stepContent[step]}
        </Box>

        {/* Navigation */}
        <Box sx={{ px: 3, py: 2, borderTop: "1px solid", borderColor: "grey.100", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          <Stack direction="row" spacing={1}>
            {step === STEPS.length - 1 && (
              <>
                <Button
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                  disabled={saving}
                  onClick={saveResume}
                >
                  {saving ? "Saving..." : savedId ? "Update" : "Save"}
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={downloading ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon />}
                  disabled={downloading}
                  onClick={downloadPDF}
                >
                  {downloading ? "Generating..." : "Download PDF"}
                </Button>
              </>
            )}
            {step < STEPS.length - 1 && (
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => setStep((s) => s + 1)}>
                Next
              </Button>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Right Panel: Live CV Preview */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "flex-start",
          justifyContent: "center",
          p: 4,
          overflow: "auto",
        }}
      >
        <Paper
          ref={cvRef}
          elevation={8}
          sx={{
            width: 595,
            minHeight: 842,
            bgcolor: "white",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <CVTemplate data={data} />
        </Paper>
      </Box>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast((t) => ({ ...t, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={toast.severity} variant="filled" onClose={() => setToast((t) => ({ ...t, open: false }))}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
