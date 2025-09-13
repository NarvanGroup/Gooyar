import { IconButton, Stack } from "@mui/material";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";

export const SocialMedia = ({ socials }: any) => {
  return (
    <Stack direction="row" sx={{ my: 2.5 }}>
      {socials?.map((social: any) => {
        const socialAtt = _socials.find((s) => s.value === social.name);
        return (
          <a
            key={`${social.name}-${social.username}`}
            aria-label={social.name}
            href={generateSocialHref(social)}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IconButton key={social.username}>{socialAtt?.icon}</IconButton>
          </a>
        );
      })}
    </Stack>
  );
};

export const generateSocialHref = (social: any) => {
  let href = "";

  switch (social.name) {
    case "FACEBOOK":
      href = `https://www.facebook.com/${social.username}`;
      break;
    case "INSTAGRAM":
      href = `https://www.instagram.com/${social.username}`;
      break;
    case "LINKEDIN":
      href = `https://www.linkedin.com/in/${social.username}`;
      break;
    case "X":
      href = `https://twitter.com/${social.username}`; // Assuming X refers to Twitter
      break;
    case "WHATSAPP":
      href = `https://wa.me/98${social.username}?text=`;
      break;
    case "TELEGRAM":
      href = `https://t.me/${social.username}`;
      break;
    case "SPOTIFY":
      href = `https://open.spotify.com/user/${social.username}`;
      break;
    case "PINTEREST":
      href = `https://www.pinterest.com/${social.username}`;
      break;
    case "WEBSITE":
      href = `https://www.${social.username}`; // Assuming the username is the website domain
      break;
    case "GITHUB":
      href = `https://github.com/${social.username}`;
      break;
    case "YOUTUBE":
      href = `https://www.youtube.com/c/${social.username}`;
      break;
    case "CASTBOX":
      href = `https://castbox.fm/channel/${social.username}`;
      break;
    default:
      href = social.href; // Fallback to the original href if no match is found
      break;
  }

  return href;
};

export const _socials = [
  {
    value: "FACEBOOK",
    label: "FaceBook",
    icon: <IconBrandFacebook />,
    color: "#1877F2",
  },
  {
    value: "INSTAGRAM",
    label: "Instagram",
    icon: <IconBrandInstagram />,
    color: "#E02D69",
  },
  {
    value: "LINKEDIN",
    label: "Linkedin",
    icon: <IconBrandLinkedin />,
    color: "#007EBB",
  },
  {
    value: "X",
    label: "X",
    icon: <IconBrandX />,
    color: "#000",
  },
  {
    value: "WHATSAPP",
    label: "Whatsapp",
    icon: <IconBrandWhatsapp />,
    color: "#075E54",
  },
  {
    value: "TELEGRAM",
    label: "Telegram",
    icon: <IconBrandTelegram />,
    color: "#24A1DE",
  },
  {
    value: "SPOTIFY",
    label: "Spotify",
    icon: "foundation:social-spotify",
    color: "#1DB954",
  },
  {
    value: "PINTEREST",
    label: "Pinterest",
    icon: "ion:social-pinterest",
    color: "#E60023",
  },
  {
    value: "WEBSITE",
    label: "Website",
    icon: "fluent-mdl2:web-environment",
    color: "#000",
  },
  {
    value: "GITHUB",
    label: "Github",
    icon: "ion:social-github",
    color: "#000",
  },
  {
    value: "YOUTUBE",
    label: "Youtube",
    icon: "logos:youtube-icon",
    color: "#f00",
  },
  {
    value: "CASTBOX",
    label: "Castbox",
    icon: "simple-icons:castbox",
    color: "#f68043",
  },
];
