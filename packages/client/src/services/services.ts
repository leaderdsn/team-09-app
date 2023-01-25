import api from '@/server/api';

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
  async getAnswers(id: number) {
    return api
      .get(`/forum/answers/${id}`)
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
  async getLeaders() {
    return api
      .get('/leaders')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new Services();
