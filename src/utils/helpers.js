import { useEffect } from "react";

export const formatArray = (arr, type = "estesa") => {
  var outStr = "";
  if (type === "estesa") {
    if (arr.length === 1) {
      outStr = arr[0];
    } else if (arr.length === 2) {
      outStr = arr.join(" e ");
    } else if (arr.length > 2) {
      outStr = arr.slice(0, -1).join(", ") + ", e " + arr.slice(-1);
    }
  } else if (type === "compatta") {
    if (arr.length === 1) {
      outStr = arr[0];
    } else if (arr.length >= 2) {
      outStr = arr.join(", ");
    }
  }

  return outStr;
};

export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
