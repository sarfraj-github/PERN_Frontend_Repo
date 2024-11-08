import axios from "axios";

const authApi = {
  //============== User Sign-Up ===========
  async getAllData() {
    let token = sessionStorage.getItem("token");
    // console.log(`token--in--people--> ${JSON.stringify(token)}`);

    try {
      let response = await axios.get(`http://localhost:5008/api/people/`, {
        headers: { Authorization: token },
      });
      console.log(`people--get--api--> ${JSON.stringify(response)}`);
      if (response.data.success) {
        return response.data;
      }
      return {
        message: "Bad request !",
      };
    } catch (error) {
      console.log(`Error-during-fetch-people--> ${JSON.stringify(error)}`);
      return { error: error.message };
    }
  },

  //   =========== User Log-In ============
  async addNewPeopel(peopelRec) {
    let token = sessionStorage.getItem("token");
    try {
      //   console.log(`peopelRec--authApi--> ${peopelRec}`);
      let response = await axios.post(
        `http://localhost:5008/api/people/create`,
        peopelRec,
        { headers: { Authorization: token } }
      );
      console.log(`response--addNewPeople--> ${JSON.stringify(response)}`);

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.log(`Error-during-auth-login--> ${error}`);
      return { error: error.message };
    }
  },

  //========== Delete a specific peopel By Id ===========
  async deletePeopelById(row) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5008/api/people/delete/${row.pid}`,
        { headers: { Authorization: token } }
      );
      console.log(`delete--response--> ${JSON.stringify(response)}`);

      if (response.data.success) {
        return response.data;
      }
      return { message: "something went wrong during delete process !" };
    } catch (error) {
      console.log(`Error-during-peolpe-data--delete--> ${error}`);
      return { error: error.message };
    }
  },

  //----------- Update existing particular record By Id ------------
  async updateExistingPeopel(row) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5008/api/people/update/${row.pid}`,
        row,
        { headers: { Authorization: token } }
      );
      console.log(`update--response--> ${JSON.stringify(response)}`);

      if (response.data.success) {
        return response.data;
      }
      return { message: "something went wrong during Update process !" };
    } catch (error) {
      console.log(`Error-during-peolpe-data--update--> ${error}`);
      return { error: error.message };
    }
  },
};

export default authApi;
