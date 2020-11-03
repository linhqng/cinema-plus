import { postData } from "../../services/base_services";

// Register user
export const registerUser = ({
  name,
  username,
  email,
  phone,
  image,
  password,
}) => async (dispatch) => {
  try {
    const url = "users";
    const body = { name, username, email, phone, password };
    await postData(url, body).then((response) => console.log(response));
  } catch (error) {
    console.log(error);
  }
};
