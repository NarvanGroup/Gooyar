import {
  Box,
  Box,
  CardContent,
  Card,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";

export default function DataStatistics() {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={2.4}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              پایگاه دانش
            </Typography>
            <Typography variant="h6">1 از 1</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2.4}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              کاراکتر
            </Typography>
            <Typography variant="h6">% 0.0</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2.4}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              فایل ها
            </Typography>
            <Typography variant="h6">1 از 2</Typography>
            <LinearProgress variant="determinate" value={50} sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2.4}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              صفحه وب
            </Typography>
            <Typography variant="h6">0 از 10</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2.4}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              وردپرس
            </Typography>
            <Typography variant="h6">0 از 50</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
