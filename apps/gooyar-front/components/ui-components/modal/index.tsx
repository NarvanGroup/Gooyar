import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MUIModal, { ModalProps } from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import useResponsive from "@/shared/hooks/useResponsive";

interface CustomModalProps extends ModalProps {
  title: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  borderRadius: {
    xs: 0,
    sm: "10px",
  },
  height: {
    xs: "100%",
    sm: "auto",
  },
  overflow: "auto",
};

export const Modal = ({ open, onClose, children, title, ...rest }: any) => {
  const isSmDown = useResponsive("down", "sm");

  return (
    <MUIModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
    >
      <Box sx={style}>
        <Box
          mb={2}
          pb={1}
          id="form-dialog-title"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={500} color="primary">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <IconX />
          </IconButton>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={
            isSmDown
              ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "70vh",
                }
              : {}
          }
          mt={2}
        >
          {children}
        </Box>
      </Box>
    </MUIModal>
  );
};
