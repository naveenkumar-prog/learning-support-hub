export function fetchSupportProviders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch('/data/data.json')
          .then((res) => res.json())
          .then((data) => resolve(data));
      }, 1000);
    });
  }
  