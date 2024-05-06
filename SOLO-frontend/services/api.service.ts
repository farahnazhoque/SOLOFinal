import axios from 'axios';


const BASE_URL = 'http://localhost:3000';

export class ApiService {

  constructor() {}

  static async createAffiliate(affiliateData: any) {
    let sentData = {
        "name": affiliateData,
      "type": "coach",
      "affiliation_id": "098"
    }
    return axios.post(`${BASE_URL}/affiliation/register-affiliation`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  }

