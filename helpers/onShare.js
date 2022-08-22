import { Share } from "react-native";

const onShare = async (msg, url) => {
  try {
    await Share.share({
      message: `${msg} \n\n ${url} \n\n From Harsh Mistry, All News.`,
    });
  } catch (error) {
    alert(error.message);
  }
};

export default onShare;
