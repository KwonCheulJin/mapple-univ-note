import { html } from './template';
import { View } from './view';

interface Ball {
  color: string;
}

class BallView extends View<Ball> {
  override template() {
    return html`
      <div
        class="ball"
        style="
          background-color: ${this.data.color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 10px;
          cursor: pointer;
          "
      ></div>
    `;
  }

  override onRender() {
    this.element().animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(300px)' },
        { transform: 'translateX(0)' },
      ],
      {
        duration: 4000,
        iterations: Infinity,
      }
    );
  }
}

class BallsView extends View<Ball[]> {
  override template() {
    return html`
      <div>
        <button>볼 추가</button>
        <div class="balls"></div>
      </div>
    `;
  }

  override onRender() {
    this.element()
      .querySelector('button')!
      .addEventListener('click', () => this._createBalls());

    this.delegate('click', '.balls .ball', e => e.currentTarget!.remove());
  }

  private _createBalls() {
    this.data
      .map(ball => new BallView(ball))
      .forEach(ball => {
        this.element().querySelector('.balls')!.append(ball.render());
      });
  }
}

function main() {
  const balls = [{ color: 'red' }, { color: 'green' }, { color: 'purple' }];

  document.body.append(new BallsView(balls).render());
}

main();
