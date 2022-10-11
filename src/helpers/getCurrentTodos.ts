export const getCurrentTodos = async () => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  return data;
};
