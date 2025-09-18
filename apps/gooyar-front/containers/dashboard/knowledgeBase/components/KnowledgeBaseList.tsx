"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Book as BookIcon,
  Description as DescriptionIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

interface KnowledgeBase {
  id: string;
  name: string;
  type: string;
  dataCount: number;
}

interface KnowledgeBaseListProps {
  knowledgeBases: KnowledgeBase[];
  selectedBase: KnowledgeBase | null;
  onSelectBase: any;
  onCreateNew: () => void;
}

const KnowledgeBaseList: React.FC<KnowledgeBaseListProps> = ({
  knowledgeBases,
  selectedBase,
  onSelectBase,
  onCreateNew,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 350,
        minWidth: 250,
        height: "100%",
        p: 3,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "text.primary" }}>
            پایگاه های دانش
          </Typography>
          <IconButton size="small">
            <InfoIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          sx={{ mb: 2 }}
          onClick={onCreateNew}
        >
          ایجاد پایگاه دانش جدید
        </Button>

        <List sx={{ flexGrow: 1, overflow: "auto" }}>
          {knowledgeBases.map((base) => (
            <ListItem
              component="button"
              key={base.id}
              // button
              // selected={selectedBase?.id === base.id}
              onClick={() => onSelectBase(base)}
              sx={{
                borderRadius: 1,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemText primary={base.name} />
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default KnowledgeBaseList;
