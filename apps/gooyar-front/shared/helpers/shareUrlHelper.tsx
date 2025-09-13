export const shareUrlHelper = async (
  url: string,
  title: string,
  text: string,
  callBack?: () => void
) => {
  const shareData = {
    title: `${title}`,
    url,
    text: text,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      callBack && callBack();
    }
  } else {
    callBack && callBack();
  }
};
