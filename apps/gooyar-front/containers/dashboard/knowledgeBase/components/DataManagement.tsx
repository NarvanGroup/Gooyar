"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
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
  LinearProgress,
  Paper,
  FormControlLabel,
  Switch,
  alpha,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  AccessTime as AccessTimeIcon,
  Public as PublicIcon,
  Article as ArticleIcon,
  Block as BlockIcon,
  Sync as SyncIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import CustomCheckbox from "@/components/forms/theme-elements/CustomCheckbox";
import CustomSwitch from "@/components/forms/theme-elements/CustomSwitch";

interface KnowledgeBaseData {
  id: string;
  title: string;
  type: string;
  status: "completed" | "pending" | "failed";
  syncTime: string;
  characterCount: number;
  url?: string;
  notifications?: number;
}

interface KnowledgeBase {
  id: string;
  name: string;
  type: string;
  dataCount: number;
}

interface DataManagementProps {
  selectedBase: KnowledgeBase | null;
  knowledgeBaseData: KnowledgeBaseData[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddData: () => void;
  onEditData: (data: KnowledgeBaseData) => void;
  onDeleteData: (id: string) => void;
  onSyncData: (id: string) => void;
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
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "عنوان",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "وضعیت",
  },
  {
    id: "syncTime",
    numeric: false,
    disablePadding: false,
    label: "همگام سازی",
  },
  {
    id: "characterCount",
    numeric: true,
    disablePadding: false,
    label: "تعداد کاراکتر",
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
      ) : (
        <Box sx={{ flex: "1 1 100%" }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="جستجو در عناوین"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {numSelected > 0 ? (
        <Tooltip title="حذف">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="فیلتر">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const DataManagement: React.FC<DataManagementProps> = ({
  selectedBase,
  knowledgeBaseData,
  searchQuery,
  onSearchChange,
  onAddData,
  onEditData,
  onDeleteData,
  onSyncData,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("title");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState(searchQuery);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "green" }} />;
      case "pending":
        return <ScheduleIcon sx={{ color: "orange" }} />;
      case "failed":
        return <BlockIcon sx={{ color: "red" }} />;
      default:
        return <ScheduleIcon sx={{ color: "gray" }} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "آموزش تکمیل شده";
      case "pending":
        return "در حال پردازش";
      case "failed":
        return "خطا در پردازش";
      default:
        return "نامشخص";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <PublicIcon />;
      case "content":
        return <ArticleIcon />;
      default:
        return <ArticleIcon />;
    }
  };

  const filteredData = knowledgeBaseData.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
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
    onSearchChange(event.target.value);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    rowId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleMenuAction = (action: string) => {
    if (selectedRowId) {
      switch (action) {
        case "edit":
          const data = filteredData.find((item) => item.id === selectedRowId);
          if (data) onEditData(data);
          break;
        case "delete":
          onDeleteData(selectedRowId);
          break;
        case "sync":
          onSyncData(selectedRowId);
          break;
        case "disable":
          // Handle disable action
          console.log("Disable item:", selectedRowId);
          break;
        case "duplicate":
          // Handle duplicate action
          console.log("Duplicate item:", selectedRowId);
          break;
      }
    }
    handleMenuClose();
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  if (!selectedBase) {
    return (
      <Card
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" color="textSecondary" textAlign="center">
            لطفاً یک پایگاه دانش انتخاب کنید
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        p: 3,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        ({knowledgeBaseData.length}) {selectedBase.name}
      </Typography>

      {/* Add Data Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2, alignSelf: "flex-start" }}
        onClick={onAddData}
      >
        افزودن داده به پایگاه دانش انتخابی
      </Button>

      {/* Enhanced Table */}
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
                  .map((data, index) => {
                    const isItemSelected = isSelected(data.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, data.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={data.id}
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
                            {getTypeIcon(data.type)}
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                variant="h6"
                                fontWeight="600"
                                color="text.primary"
                              >
                                {data.title}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                {data.type}
                              </Typography>
                            </Box>
                            {/* {data.notifications && (
                              <Chip
                                label={data.notifications}
                                size="small"
                                color="error"
                                sx={{ ml: 1, minWidth: 20, height: 20 }}
                              />
                            )} */}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {getStatusIcon(data.status)}
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              sx={{ ml: 1 }}
                            >
                              {getStatusText(data.status)}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <AccessTimeIcon sx={{ fontSize: 16, mr: 1 }} />
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {data.syncTime}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          <Typography
                            fontWeight={600}
                            variant="h6"
                            color="text.primary"
                          >
                            {data.characterCount.toLocaleString()}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="عملیات بیشتر">
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, data.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
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
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* More Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleMenuAction("edit")}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>ویرایش</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("sync")}>
          <ListItemIcon>
            <SyncIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>همگام‌سازی مجدد</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("duplicate")}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>تکرار</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("disable")}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>غیرفعال</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction("delete")}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>حذف</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DataManagement;
