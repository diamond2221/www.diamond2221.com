class LoveStar {
  public wrapEl: HTMLElement | null = null
  public likeEl: HTMLElement | null = null

  constructor(public root: HTMLElement, public event: any = null) {
    this.init()
  }

  private init() {
    const { event, root } = this
    let wrapEl = document.createElement('div')
    wrapEl.classList.add('like-wrap')
    let likeEl = document.createElement('span')
    likeEl.classList.add('like-state')
    if (event) {
      const info = root.getBoundingClientRect()
      const clientX: number = event.clientX
      const clientY: number = event.clientY
      const distX = clientX - info.left
      const distY = clientY - info.top
      likeEl.style.left = `${distX}px`
      likeEl.style.top = `${distY}px`
    }
    wrapEl.appendChild(likeEl)
    root.appendChild(wrapEl)
    this.wrapEl = wrapEl
    this.likeEl = likeEl
  }

  public show() {
    this.likeEl?.classList.add('like-ing')
    setTimeout(() => {
      this.wrapEl && this.root.removeChild(this.wrapEl)
    }, 2000)
  }
}

export default LoveStar
