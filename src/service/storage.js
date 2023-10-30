export const loadState = (key, value, navigate) => {
  if (!value) {
    console.log("value is not present");
  } else {
    localStorage.setItem(key, value);
  }
};

export const getState = async (key) => {
  try {
    if (!key) {
      console.log("key is not present");
    } else {
      localStorage.getItem(key);
    }
  } catch (error) {
    console.log(error);
  }
};
