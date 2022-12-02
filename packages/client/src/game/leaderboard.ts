import escape from 'lodash/escape'

type Leaderboard = {
  name: string;
  score: number;
}[]

let leaderboard: HTMLElement | null = null
let rows: NodeListOf<HTMLElement> | null = null

export function initLeaderboardElement() {
  leaderboard = document.getElementById('leaderboard')
  rows = document.querySelectorAll('#leaderboard table tr')
}

export function updateLeaderboard(leaderboard: Leaderboard) {
  if (!rows) return
  for (let i = 0; i < leaderboard.length; i++) {
    rows[i + 1].innerHTML = `<td>${escape(leaderboard[i].name.slice(0, 15)) || 'Аноним'}</td><td>${
      leaderboard[i].score
    }</td>`
  }
  for (let i = leaderboard.length; i < 5; i++) {
    rows[i + 1].innerHTML = '<td>-</td><td>-</td>'
  }
}

export function setLeaderboardHidden(hidden: boolean) {
  if (!leaderboard) return
  if (hidden) {
    leaderboard.classList.add('hidden')
  } else {
    leaderboard.classList.remove('hidden')
  }
}
