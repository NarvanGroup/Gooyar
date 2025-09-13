import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import ProcessBuilderWizard from "../processBuilderWizard";

export default function CreateProcessDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: "text.primary" }}>
        ایجاد فرآیند جدید
      </DialogTitle>
      <DialogContent>
        <ProcessBuilderWizard
          agents={[{ id: "1", name: "عامل 1", description: "عامل 1" }]}
          contactPoints={[
            { id: "1", type: "phone", value: "09123456789" },
            { id: "2", type: "email", value: "test@test.com" },
          ]}
          knowledgeBases={[
            { id: "1", name: "پایگاه دانش 1", size: "100MB" },
            { id: "2", name: "پایگاه دانش 2", size: "200MB" },
          ]}
          calendars={[{ id: "1", provider: "Google", connected: true }]}
          onComplete={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
