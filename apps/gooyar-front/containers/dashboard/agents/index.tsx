import React, { useEffect, useState } from "react";
import { filter, orderBy } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IconBasket, IconMenu2 } from "@tabler/icons-react";
// import emptyCart from "/public/images/products/empty-shopping-cart.svg";

import Image from "next/image";
import BlankCard from "@/components/shared/BlankCard";
import { Edit } from "@mui/icons-material";
import AddAgentDialog from "./components/AddAgentDialog";
import AgentBoxSkeleton from "./components/AgentBoxSkeleton";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList = ({ onClick }: Props) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const router = useRouter();
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", description: "" });

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 100,
    },
  ];

  return (
    <Box sx={{ p: 3, minHeight: "100%", width: "100%" }}>
      {/* ------------------------------------------- */}

      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5" color="textPrimary">
            عامل ها
          </Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          {/* <ProductSearch /> */}
          <Button
            variant="contained"
            onClick={() => setShowCreateAgent(true)}
            sx={{ ml: 1 }}
          >
            افزودن
          </Button>
        </Box>
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {getProducts.length > 0 ? (
          <>
            {getProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%" },
                  p: 1,
                }}
              >
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <AgentBoxSkeleton />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #e0e0e0",
                      p: 2,
                      borderRadius: 1,
                      width: "100%",
                      minWidth: 300,
                    }}
                  >
                    <Typography color="textPrimary" variant="h6">
                      {product.title}
                    </Typography>
                    <Tooltip title="ویرایش">
                      <Fab
                        size="small"
                        color="primary"
                        onClick={() =>
                          router.push(`/dashboard/agents/${product.id}`)
                        }
                      >
                        <Edit />
                      </Fab>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            ))}
          </>
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", mt: 6 }}>
            <Typography variant="h2">There is no Product</Typography>
            <Typography variant="h6" mb={3}>
              The Product you are searching is no longer available.
            </Typography>
            <Button
              variant="contained"
              //   onClick={() => dispatch(filterReset())}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Box>

      <AddAgentDialog
        showCreateAgent={showCreateAgent}
        setShowCreateAgent={setShowCreateAgent}
        newAgent={newAgent}
        setNewAgent={setNewAgent}
        handleCreateAgent={() => {}}
      />
    </Box>
  );
};

export default ProductList;
