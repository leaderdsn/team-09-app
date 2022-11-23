class Color {
  letters = '0123456789ABCDEF'

  getRandomColor() {
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}

module.exports = Color
