export const deleteTodoIn_DB_byId = async (id: string) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
