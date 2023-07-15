function makeFriendsList(friends) {
  let list = document.createElement('ul');

  for(let i = 0; i < friends.length; i++) {
      let listElement = document.createElement('li');
      list.append(listElement);
      listElement.innerHTML = `${friends[i].firstName} ${friends[i].lastName}`;
  }
  
  return list;
}
