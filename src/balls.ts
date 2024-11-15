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
          "
      ></div>
    `;
  }
}

function main() {
  const balls = [{ color: 'red' }, { color: 'green' }, { color: 'purple' }];

  balls
    .map(ball => new BallView(ball))
    .forEach(ballView => document.body.append(ballView.render()));
}

main();
