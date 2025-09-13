import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog({ open, onClose, onDelete }: any) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">حذف</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف این مورد مطمئنی؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>انصراف</Button>
          <Button
            color="secondary"
            onClick={() => {
              onClose();
              onDelete();
            }}
            autoFocus
          >
            حذف کن
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
