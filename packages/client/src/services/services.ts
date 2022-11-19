import api from '@/server/api';

class Services {
  async getTasksListAction() {
    return api
      .get('/questions')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getAnswers(id: number) {
    return api
      .get(`/answers/${id}`)
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
      .post(`/questions/`, params)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new Services();
