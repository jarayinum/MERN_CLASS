export const conceptDeck = [
  {
    id: 'foundations',
    title: 'JavaScript Foundations',
    summary:
      'Covers scope, hoisting, closures, and the difference between var/let/const.',
    snippet: `function counter(start = 0) {
  let current = start;
  return function increment() {
    current += 1;
    return current;
  };
}
const clickCounter = counter();`,
  },
  {
    id: 'functional',
    title: 'Functional Patterns',
    summary:
      'Highlights map/filter/reduce, rest/spread operators, and immutability.',
    snippet: `const totals = cartItems
  .filter((item) => item.inStock)
  .map(({ price, quantity }) => price * quantity)
  .reduce((acc, value) => acc + value, 0);`,
  },
  {
    id: 'async',
    title: 'Async & Await',
    summary:
      'Demonstrates Promise.all, async/await, and graceful error handling with try/catch.',
    snippet: `export const fetchDashboard = async () => {
  try {
    const [profile, notifications] = await Promise.all([
      api.get('/me'),
      api.get('/notifications'),
    ]);
    return { profile, notifications };
  } catch (error) {
    console.error('Loading failed', error);
    throw error;
  }
};`,
  },
  {
    id: 'classes',
    title: 'Classes & Prototypes',
    summary:
      'Uses class syntax, inheritance, and static methods to model domain objects.',
    snippet: `class Cohort {
  #students = [];
  constructor(topic) {
    this.topic = topic;
  }
  addStudent(student) {
    this.#students.push(student);
    return this;
  }
  static fromArray(topic, names = []) {
    const cohort = new Cohort(topic);
    names.forEach((name) => cohort.addStudent({ name }));
    return cohort;
  }
}`,
  },
];

