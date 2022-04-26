const fetchAPI = (route: string, method: string, body?: Record<string, string>) => {
  const settings = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    ...(body && { body: JSON.stringify(body) }),
  };
  const port = route === 'login' ? '3000' : '3004';
  return fetch(
    `http://localhost:${port}/${route}`,
    settings,
  );
};

export default fetchAPI;
