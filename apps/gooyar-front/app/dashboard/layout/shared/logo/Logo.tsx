"use client";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
const Logo = () => {
  const LinkStyled = styled(Link)(() => ({
    height: defaultCustomizer.TopbarHeight,
    width: defaultCustomizer.isCollapse ? "40px" : "250px",
    overflow: "hidden",
    display: "block",
  }));

  return (
    <LinkStyled href="/">
      {defaultCustomizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/dark-rtl-logo.svg"
          alt="logo"
          height={defaultCustomizer.TopbarHeight}
          width={250}
          priority
        />
      ) : (
        <Image
          src="/images/logos/shenasbanLogo.png"
          alt="logo"
          // height={isMdUp ? 40 : 35}
          // width={isMdUp ? 150 : 100}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 150, height: "auto" }}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
