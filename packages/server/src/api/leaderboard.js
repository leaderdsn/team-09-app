const { request } = require('./utils')

class LeaderboardAPI {
  getLeaders(req, res) {
    request(req, res, 'POST', '/leaderboard/19-T9')
  }
}

const leaderboardAPI = new LeaderboardAPI()

module.exports = { leaderboardAPI }
