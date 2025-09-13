// @mui
import { Stack, Skeleton } from "@mui/material";

// ----------------------------------------------------------------------

export default function AgentBoxSkeleton() {
  return (
    <Skeleton
      variant="rounded"
      width={300}
      height={64}
      sx={{ flexShrink: 0, borderRadius: 2 }}
    />
  );
}
