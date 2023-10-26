export const requestNotification = () => {
  Notification.requestPermission().then((result) => {
    console.log(result);
  });
};
