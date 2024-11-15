import { html } from './template';
import { View } from './view';

interface User {
  name: string;
  age: number;
}

const userHtml = ({ name, age }: User) => html` <li>${name} (${age})</li> `;

class UserView extends View<User> {
  override template() {
    return html` <li class="user">${this.data.name} (${this.data.age})</li> `;
  }
}

class UsersView extends View<User[]> {
  override template(users: User[]) {
    return html`
      <div>
        <button>추가</button>
        <ul class="users">
          ${users.map(user => new UserView(user).template())}
        </ul>
      </div>
    `;
  }

  override onRender() {
    const userEls = this.element().querySelectorAll('.user');
    const iterator = userEls[Symbol.iterator]();

    this.element()
      .querySelector('button')!
      .addEventListener('click', () => {
        const newUser = new UserView({ name: 'New User', age: 0 }).render();
        this.element().querySelector('.users')!.append(newUser);
      });
  }
}

function main() {
  const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Charles', age: 25 },
  ];

  const usersView = new UsersView(users).render();
  document.body.append(usersView);
}

main();
