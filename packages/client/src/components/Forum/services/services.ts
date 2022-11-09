import api from '@/server/api';

class Services {
  getTasksListAction() {
    return api
      .get('/questions')
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getAnswers(id: number) {
    return api
      .get(`/answers/${id}`)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addTopic(params: any) {
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
