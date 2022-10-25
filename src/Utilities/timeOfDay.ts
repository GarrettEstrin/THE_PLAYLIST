const timeOfDay = () => {
  const time = new Date().getHours();
  if (time > 14) {
    return 'Good Evening';
  } else if (time > 11) {
    return 'Good Afternoon';
  }
  else {
    return 'Good Morning';
  }
}

export default timeOfDay;
