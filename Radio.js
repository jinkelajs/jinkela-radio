class Radio extends Jinkela { // eslint-disable-line no-unused-vars

  set readonly(value) { this.element.classList[value ? 'add' : 'remove']('readonly'); }
  get readonly() { return this.element.classList.contains('readonly'); }

  get checked() { return this.box.classList.contains('active'); }
  set checked(value) {
    if (!!value === this.checked) return;
    this.box.classList[value ? 'add' : 'remove']('active');
    this.element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  click() {
    if (this.readonly || this.checked) return;
    this.checked = true;
  }

  preventDoubleClickSelect() {
    let timer = null;
    this.element.addEventListener('click', () => {
      if (!getSelection().isCollapsed) return;
      this.element.style.userSelect = 'none';
      clearTimeout(timer);
      timer = setTimeout(() => this.element.style.removeProperty('user-select'), 500);
    }, true);
  }

  init() {
    this.preventDoubleClickSelect();
  }

  get template() {
    return `
      <span on-click="{click}">
        <span ref="box"></span>
        <span>{text}</span>
      </span>
    `;
  }

  get styleSheet() {
    return `
      :scope {
        margin-right: 1em;
        &:last-child { margin-right: 0; }
        cursor: pointer;
        font-size: 14px;
        > :first-child {
          --ease: cubic-bezier(.71,-.46,.29,1.46);
          font-size: 18px;
          display: inline-block;
          vertical-align: middle;
          color: #48576a;
          box-sizing: border-box;
          position: relative;
          width: 1em;
          height: 1em;
          border: 1px solid #bfcbd9;
          border-radius: 100%;
          &::after {
            box-sizing: content-box;
            content: "";
            border-radius: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 6px;
            height: 6px;
            margin: auto;
            transform: scale(0);
            transition: transform .15s var(--ease);
          }
          &:hover { border-color: #0190fe; }
          &.active {
            background-color: #20a0ff;
            border-color: #0190fe;
            &::after {
              transform: scale(1);
            }
            &.readonly {
              cursor: not-allowed;
              background-color: #d1dbe5;
              border-color: #d1dbe5;
            }
          }
        }
        > span {
          display: inline-block;
          vertical-align: middle;
        }
        &.readonly {
          > :first-child {
            background-color: #eef1f6;
            border-color: #d1dbe5;
            &.active {
              background-color: #d1dbe5;
            }
          }
          cursor: not-allowed;
          color: #bbb;
        }
      }
    `;
  }

}
