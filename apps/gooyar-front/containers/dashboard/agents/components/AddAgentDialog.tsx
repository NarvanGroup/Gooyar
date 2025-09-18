import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

export default function AddAgentDialog({
  showCreateAgent,
  setShowCreateAgent,
  newAgent,
  setNewAgent,
  handleCreateAgent,
}: {
  showCreateAgent: boolean;
  setShowCreateAgent: (show: boolean) => void;
  newAgent: any;
  setNewAgent: (agent: any) => void;
  handleCreateAgent: () => void;
}) {
  return (
    <Dialog
      open={showCreateAgent}
      onClose={() => setShowCreateAgent(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ color: "text.primary" }}>ایجاد عامل جدید</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="نام عامل"
            required
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="توضیحات"
            value={newAgent.description}
            onChange={(e) =>
              setNewAgent({ ...newAgent, description: e.target.value })
            }
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowCreateAgent(false)}>انصراف</Button>
        <Button variant="contained" onClick={handleCreateAgent}>
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
}
