let yo = require('yo-yo')
let csjs = require('csjs-inject')

var css = csjs`
  .text {
    cursor: pointer;
    font-weight: normal;
    max-width: 300px;
    user-select: none;
  }
  .text:hover {
    font-weight: bold;
  }
  .link {
    cursor: pointer;
    font-weight: normal;
    text-decoration : none;
    user-select: none;
  }
  .link:hover {
    font-weight: bold;
    text-decoration : none;
  }
`

class Section {
  constructor (title, actions) {
    this.title = title
    this.actions = actions
  }

  render () {
    let sectionLook = yo`
      <div class="card border-0 bg-light bd-light text-dark p-1" style="min-width: 300px; min-height: 210px;">
        <div class="card-header font-weight-bold" style="user-select: none;">${this.title}</div>
        <p></p>
      </div>
    `
    for (var i = 0; i < this.actions.length; i++) {
      if (this.actions[i].type === `callback`) {
        sectionLook.appendChild(yo`
          <div>
            <span class="${css.text} text-dark" onclick=${this.actions[i].payload} >
              ${this.actions[i].label}
            </span>
          </div>
        `)
      } else if (this.actions[i].type === `link`) {
        sectionLook.appendChild(yo`
          <div >
            <a class="${css.link} text-dark text-decoration-none" href=${this.actions[i].payload} target="_blank" >
              ${this.actions[i].label}
            </a>
          </div>
        `)
      }
    }

    if (!this._view) {
      this._view = sectionLook
    }

    return this._view
  }

}

module.exports = Section
