import { api, apiLeaderboard } from '@/server/api';

class Services {
  async getTasksListAction() {
    return api
      .get('/forum/questions')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getAnswers(id: string) {
    return api
      .get(`/forum/answers/${id}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getAnswersAll() {
    return api
      .get('/forum/answers')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addTopic(params: any) {
    return api
      .post(`/forum/questions`, params)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async addComment(params: any) {
    return api
      .post(`/forum/answers`, params)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getLeaders() {
    return apiLeaderboard
      .get('/leaderboard')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async addUserToLeaderboard(params: any) {
    return apiLeaderboard
      .post(`/leaderboard/`, params, { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getAllLeaderboard(params: any) {
    return apiLeaderboard
      .post(`/leaderboard/19-T9`, params, { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async logout() {
    return apiLeaderboard
      .post(`/auth/logout/`, { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async login(params: any) {
    return apiLeaderboard
      .post(`/auth/signin/`, params, { withCredentials: true })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new Services();
