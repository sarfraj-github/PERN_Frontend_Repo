import { jwtDecode } from "jwt-decode";
import axios from "axios";

const authApi = {
  //============== User Sign-Up ===========
  async signup(userRec) {
    try {
        console.log(`userRec--authApi--> ${JSON.stringify(userRec)}`);
      let response = await axios.post(
        `http://localhost:5008/api/auth/signup`,
        userRec
      );
      console.log(`response--signup--api--> ${JSON.stringify(response)}`);

      if (response.data.success) {
        sessionStorage.setItem("token", response.data.authToken);
      }

      return response.data;
    } catch (error) {
      console.log(`Error-during-auth-signup--> ${error}`);
      return { error: error.message };
    }
  },

  // =========== User Log-In ============
  async login(userRec) {
      console.log(`userRec--authApi--> ${userRec}`);

      const {data} = await axios.post(`http://localhost:5008/api/auth/login`,userRec);
      // console.log(`response--auth--api--> ${data}`);

      if (data.success) {
        sessionStorage.setItem("token", data.authToken);
      }
      return data;
    // } catch (error) {
    //   console.log(`Error-during-auth-login--> ${error}`);
    //   return { error:  };
    // }
  },

  async userDetails() {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in session storage");
      }
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.log(`Error-during-auth-get--details--> ${error}`);
      return { error: error.message };
    }
  },
};

export default authApi;
