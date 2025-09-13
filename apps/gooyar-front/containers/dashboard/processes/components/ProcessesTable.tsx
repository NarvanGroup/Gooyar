"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Tooltip,
  IconButton,
  Chip,
  Paper,
  FormControlLabel,
  Switch,
  alpha,
  useTheme,
  Typography,
  Alert,
  CardContent,
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  SmartToy as SmartToyIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
} from "@mui/icons-material";
import CustomCheckbox from "@/components/forms/theme-elements/CustomCheckbox";
import CustomSwitch from "@/components/forms/theme-elements/CustomSwitch";
import { Process } from "../types";

interface ProcessesTableProps {
  processes: Process[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "نام فرآیند",
  },
  {
    id: "agent",
    numeric: false,
    disablePadding: false,
    label: "عامل",
  },
  {
    id: "contactPoints",
    numeric: false,
    disablePadding: false,
    label: "نقاط تماس",
  },
  {
    id: "knowledgeBases",
    numeric: false,
    disablePadding: false,
    label: "پایگاه دانش",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "وضعیت",
  },
  {
    id: "lastActivity",
    numeric: false,
    disablePadding: false,
    label: "آخرین فعالیت",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "عملیات",
  },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "انتخاب همه",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleSearch, search } = props;
  const theme = useTheme();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected} مورد انتخاب شده
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="حذف">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const ProcessesTable: React.FC<ProcessesTableProps> = ({
  processes,
  onDelete,
  onToggleStatus,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "فعال":
        return <CheckCircleIcon sx={{ color: "green" }} />;
      case "غیرفعال":
        return <BlockIcon sx={{ color: "red" }} />;
      default:
        return <BlockIcon sx={{ color: "gray" }} />;
    }
  };

  const getStatusColor = (status: string): "success" | "error" | "default" => {
    switch (status) {
      case "فعال":
        return "success";
      case "غیرفعال":
        return "error";
      default:
        return "default";
    }
  };

  const filteredData = processes.filter((process) =>
    process.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  if (processes.length === 0) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            هیچ فرآیندی یافت نشد. برای شروع، یک فرآیند جدید ایجاد کنید.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <EnhancedTableToolbar
        numSelected={selected.length}
        search={search}
        handleSearch={handleSearch}
      />
      <Paper
        variant="outlined"
        sx={{ mt: 1, border: `1px solid ${borderColor}` }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((process, index) => {
                  const isItemSelected = isSelected(process.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, process.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={process.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box sx={{ ml: 2 }}>
                            <Typography
                              variant="h6"
                              fontWeight="600"
                              color="text.secondary"
                            >
                              {process.name}
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                              ایجاد شده در {process.createdAt}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <SmartToyIcon sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.primary">
                            {process.agent}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {process.contactPoints.map((cp, idx) => (
                            <Chip
                              key={idx}
                              label={cp}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {process.knowledgeBases.map((kb, idx) => (
                            <Chip
                              key={idx}
                              label={kb}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          {getStatusIcon(process.status)}
                          <Chip
                            label={process.status}
                            size="small"
                            color={getStatusColor(process.status)}
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <AccessTimeIcon sx={{ fontSize: 16, mr: 1 }} />
                          <Typography variant="caption" color="text.primary">
                            {process.lastActivity}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip
                            title={
                              process.status === "فعال"
                                ? "متوقف کردن"
                                : "شروع کردن"
                            }
                          >
                            <IconButton
                              size="small"
                              color={
                                process.status === "فعال"
                                  ? "warning"
                                  : "success"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleStatus(process.id);
                              }}
                            >
                              {process.status === "فعال" ? (
                                <PauseIcon />
                              ) : (
                                <PlayArrowIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="ویرایش">
                            <IconButton
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="حذف">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(process.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="ردیف در صفحه:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
          }
        />
      </Paper>
      <Box sx={{ mt: 1 }}>
        <FormControlLabel
          control={
            <CustomSwitch checked={dense} onChange={handleChangeDense} />
          }
          label="فشرده سازی"
        />
      </Box>
    </Box>
  );
};

export default ProcessesTable;
