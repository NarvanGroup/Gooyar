"use client";
import React from "react";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import NextLink from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";

export const NavLinks = [
  {
    title: "داشبورد",
    href: "/dashboard",
    isAuthNeeded: true,
  },
  {
    title: "درباره ما",
    href: "/about",
  },
  // {
  //   title: "بلاگ",
  //   href: "/blog",
  // },
  // {
  //   title: "Portfolio",
  //   new: true,
  //   href: "/frontend-pages/portfolio",
  // },

  {
    title: "قیمت ها",
    href: "/pricing",
  },
  {
    title: "تماس با ما",
    href: "/contact",
  },
  {
    title: "شرایط و ضوابط",
    href: "/terms",
  },
];

const Navigations = () => {
  const router = usePathname();
  const { user } = useUserStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const StyledButton = styled(Button)(({ theme }) => ({
    a: {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: "15px",
    },

    "&.active": {
      backgroundColor: "rgba(93, 135, 255, 0.15)",
      a: {
        color: theme.palette.primary.main,
      },
    },
  }));

  return (
    <>
      {NavLinks.map(
        (navlink: any, i) =>
          (!navlink.isAuthNeeded ||
            (user?.isLoggedIn && navlink.isAuthNeeded)) && (
            <StyledButton
              color="inherit"
              className={router === navlink.href ? "active" : "not-active"}
              variant={navlink.isAuthNeeded ? "contained" : "text"}
              key={i}
              sx={{
                backgroundColor: navlink.isAuthNeeded
                  ? "rgba(93, 135, 255, 0.15)"
                  : "unset",
              }}
            >
              <NextLink href={navlink.href}>
                {navlink.title}{" "}
                {navlink.new ? (
                  <Chip
                    label="New"
                    size="small"
                    sx={{
                      ml: "6px",
                      borderRadius: "8px",
                      color: "primary.main",
                      backgroundColor: "rgba(93, 135, 255, 0.15)",
                    }}
                  />
                ) : null}
              </NextLink>
            </StyledButton>
          )
      )}
    </>
  );
};

export default Navigations;
