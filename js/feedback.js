/**
 * Лабораторна робота №3 — Варіант 1
 * Завдання 2: Об'єктно-орієнтований JS (Користувачі)
 */

console.log("Користувачі (Зворотній зв'язок):");

class User {
  constructor(lastName, firstName, age, education, purpose, requestDate, requestTime) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = Number(age);
    this.education = education;
    this.purpose = purpose;
    this.requestDate = new Date(requestDate);
    this.requestTime = requestTime;
  }

  getFullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  isWorkingHours() {
    const [hours] = this.requestTime.split(":").map(Number);
    return hours >= 9 && hours < 18;
  }
}

// 10 облікових записів користувачів
const users = [
  new User("Шевченко", "Марія", 22, "Вища", "Співпраця", "2026-03-15", "10:30"),
  new User("Коваленко", "Олександр", 35, "Повна", "Скарга на порушення права власності", "2026-03-20", "14:15"),
  new User("Бойко", "Анна", 28, "Вища", "Пропозиція", "2026-04-05", "11:00"),
  new User("Ткаченко", "Дмитро", 19, "Неповна", "Наявність помилки", "2026-03-10", "19:45"),
  new User("Петренко", "Олена", 45, "Професійна", "Скарга на порушення права власності", "2026-05-12", "09:15"),
  new User("Мельник", "Артем", 22, "Вища", "Співпраця", "2026-03-22", "16:00"),
  new User("Захарчук", "Ірина", 31, "Вища", "Пропозиція", "2026-04-18", "08:30"),
  new User("Кравченко", "Сергій", 50, "Повна", "Скарга на порушення права власності", "2026-03-15", "12:00"),
  new User("Лисенко", "Ольга", 25, "Професійна", "Наявність помилки", "2026-06-01", "20:10"),
  new User("Мороз", "Василь", 40, "Вища", "Пропозиція", "2026-03-15", "15:30")
];

// 2.1 Користувачі за місяцем та моментом часу
function filterUsersByMonthAndTime(userList, monthNumber, targetTime) {
  return userList.filter(u => {
    const isSameMonth = (u.requestDate.getMonth() + 1) === monthNumber;
    const isSameTime = u.requestTime === targetTime;
    return isSameMonth && isSameTime;
  });
}

// 2.2 Середній вік користувачів та вивід освіти при збігу
function analyzeUserAge(userList) {
  const sumAge = userList.reduce((acc, u) => acc + u.age, 0);
  const avgAge = Math.round(sumAge / userList.length);
  console.log(`Середній вік користувачів: ${avgAge} років`);

  const matchingUsers = userList.filter(u => u.age === avgAge);
  if (matchingUsers.length > 0) {
    matchingUsers.forEach(u => {
      console.log(`Користувач ${u.getFullName()} має вік рівний середньому (${avgAge}). Освіта: ${u.education}`);
    });
  } else {
    console.log(`Користувачів із віком рівно ${avgAge} років не знайдено.`);
  }
}

// 2.3 Поділ на 3 класи
function categorizeUsers(userList) {
  const classes = {
    complaintWorking: [],
    proposalWorking: [],
    others: []
  };

  userList.forEach(u => {
    const isWorking = u.isWorkingHours();
    const isComplaint = u.purpose.toLowerCase().includes("скарга") || u.purpose.toLowerCase().includes("претензія");
    const isProposal = u.purpose.toLowerCase().includes("пропозиція") || u.purpose.toLowerCase().includes("побажання");

    if (isComplaint && isWorking) {
      classes.complaintWorking.push(u);
    } else if (isProposal && isWorking) {
      classes.proposalWorking.push(u);
    } else {
      classes.others.push(u);
    }
  });

  console.log("Розподіл за класами:");
  console.log(`- Звернулись з претензією у робочий час: ${classes.complaintWorking.length} осіб`);
  console.log(`- Звернулись з побажанням у робочий час: ${classes.proposalWorking.length} осіб`);
  console.log(`- Інші: ${classes.others.length} осіб`);
}

// 2.4 Сортування (спадання віку та алфавіт)
function sortUsers(userList) {
  const sortedByAgeDesc = userList.slice().sort((a, b) => b.age - a.age);
  console.log("Спадання віку:", sortedByAgeDesc.map(u => `${u.getFullName()} (${u.age} р.)`));

  const sortedAlphabetically = userList.slice().sort((a, b) => 
    a.getFullName().localeCompare(b.getFullName(), "uk")
  );
  console.log("Алфавітний порядок:", sortedAlphabetically.map(u => u.getFullName()));
}

// Автоматичний запуск
console.log("2.1 Пошук (березень, 15:30):", filterUsersByMonthAndTime(users, 3, "15:30"));
console.log("2.2 Аналіз середнього віку:");
analyzeUserAge(users);
console.log("2.3 Класифікація користувачів:");
categorizeUsers(users);
console.log("2.4 Сортування:");
sortUsers(users);