export function addServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration =
          await navigator.serviceWorker.register("/service-wk.js");
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope,
        );
      } catch (err) {
        console.log("Service Worker registration failed: ", err);
      }
    });
  }
}
