import React from "react";
import {
  Grid,
  TextField,
  Paper,
  Button,
  MenuItem,
  Box,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";
import { FilterAlt as FilterAltIcon } from "@mui/icons-material";

const INDUSTRIES = [
  "Manufacturing",
  "Software",
  "Agriculture",
  "Healthcare",
  "Finance",
  "Construction",
  "Education",
  "Energy",
  "Logistics",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-100", "101-200", "200+"];

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Name (A–Z)", value: "nameAZ" },
  { label: "Name (Z–A)", value: "nameZA" },
  { label: "Founded (Newest)", value: "foundedNew" },
  { label: "Founded (Oldest)", value: "foundedOld" },
  { label: "Rating (High → Low)", value: "ratingHigh" },
  { label: "Rating (Low → High)", value: "ratingLow" },
];

export default function FiltersBar({ filters, onFilterChange, onClear }) {
  const theme = useTheme(); 
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        mb: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper, 
        color: theme.palette.text.primary,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Search */}
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="e.g. Acme"
          />
        </Grid>

        {/*  Industry */}
        <Grid item xs={12} sm={4} md={2.5}>
          <TextField
            select
            label="Industry"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.industry}
            onChange={(e) => onFilterChange("industry", e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            {INDUSTRIES.map((ind) => (
              <MenuItem key={ind} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/*  Location */}
        <Grid item xs={12} sm={4} md={2.5}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            placeholder="e.g. USA"
          />
        </Grid>

        {/* Company Size */}
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            select
            label="Company Size"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.size}
            onChange={(e) => onFilterChange("size", e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {COMPANY_SIZES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Rating */}
        <Grid item xs={12} sm={4} md={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Min Rating:
            </Typography>
            <Rating
              name="filter-rating"
              value={filters.minRating || 0}
              onChange={(e, newValue) => onFilterChange("minRating", newValue)}
              size="small"
            />
          </Box>
        </Grid>

        {/* Sort By */}
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            select
            label="Sort By"
            variant="outlined"
            fullWidth
            size="small"
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            sx={{ minWidth: 160 }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Clear */}
        <Grid item xs={12} sm={6} md="auto">
          <Button
            variant="outlined"
            color="error"
            onClick={onClear}
            size="small"
            startIcon={<FilterAltIcon />}
            sx={{
              mt: { xs: 1, sm: 0 },
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.light,
                color: "#fff",
              },
            }}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
