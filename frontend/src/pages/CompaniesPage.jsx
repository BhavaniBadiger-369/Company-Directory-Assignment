import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Box,
  Alert,
  Stack,
  Pagination,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FiltersBar from "../components/FiltersBar";
import { fetchCompanies } from "../redux/companiesSlice";
import debounce from "lodash.debounce";

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const { companies, total, totalPages, currentPage, loading, error } =
    useSelector((state) => state.companies);

  const [filters, setFilters] = useState({
    search: "",
    industry: "",
    location: "",
    size: "",
    minRating: 0,
    sortBy: "relevance",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  //  Convert company size to numeric employee range
  const formatSizeFilter = (sizeValue) => {
    switch (sizeValue) {
      case "1-10":
        return { minEmployees: 1, maxEmployees: 10 };
      case "11-50":
        return { minEmployees: 11, maxEmployees: 50 };
      case "51-100":
        return { minEmployees: 51, maxEmployees: 100 };
      case "101-200":
        return { minEmployees: 101, maxEmployees: 200 };
      case "200+":
        return { minEmployees: 201 };
      default:
        return {};
    }
  };

  //  Debounced fetch
  const doFetch = (params) => dispatch(fetchCompanies(params));
  const debouncedFetch = useMemo(() => debounce(doFetch, 300), [dispatch]);

  useEffect(() => {
    const sizeFilter = formatSizeFilter(filters.size);
    debouncedFetch({ ...filters, ...sizeFilter, page, limit });
    return () => debouncedFetch.cancel();
  }, [filters, page, debouncedFetch]);

  const handleFilterChange = (field, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setPage(1);
    setFilters({
      search: "",
      industry: "",
      location: "",
      size: "",
      minRating: 0,
      sortBy: "relevance",
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 3,
        px: { xs: 2, sm: 3, md: 6 }, 
      }}
    >
      <FiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Paper elevation={2}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#E3F2FD" }}>
                    {["Name", "Industry", "Headquarters", "Employees", "Founded", "Rating"].map(
                      (header) => (
                        <TableCell
                          key={header}
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          {header}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {companies?.length > 0 ? (
                    companies.map((c) => (
                      <TableRow
                        key={c._id}
                        hover
                        sx={{
                          "&:hover": { backgroundColor: "#f9fafc" },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{c.name}</TableCell>
                        <TableCell>{c.industry}</TableCell>
                        <TableCell>{c.headquarters}</TableCell>
                        <TableCell>{c.employees ?? "N/A"}</TableCell>
                        <TableCell>{c.founded ?? "—"}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Rating
                              name="company-rating"
                              value={c.rating || 0}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({c.rating ?? "N/A"})
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box sx={{ py: 4, textAlign: "center" }}>
                          <Typography variant="body1">
                            No companies match your filters.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Pagination */}
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Showing page {currentPage} of {totalPages} — {total} companies total
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </>
      )}
    </Container>
  );
}
