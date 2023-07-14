function showSalary(users, age) {
  return newArray = users
  .filter(user => user.age <= age)
  .map(user => `${user.name}, ${user.balance}`)
  .join('\n')
}
